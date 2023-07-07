import taskScheme from "../models/task";
import userScheme from "../models/user";

//paginacion
const maxElements = 4;

async function GetAllTask(req, res){
	
	try {
		const { page }= req.query; //page se agrega a la url localhost..?page=
		const { payload: { _id }} = req;//el payload en este caso trae el _id
		const tasks = await taskScheme.find({//le digo que el user_id tiene que ser igual al recuperado del payload _id
			user_id: _id,
		})//de esta manera el usuario solo puede ver las tareas que el creó.
		.populate("user_id")//puedo agregar las propiedades que quiero traer mediante una coma y en una string
		.skip(page * maxElements)
		.limit(maxElements);
		return res.status(200).json({
			ok: true,
			data: tasks,
		});
	} catch (error) {
		return res.status(500).json({
			ok: true,
			error: error
		})
	}
}
async function GetTaskById(req, res){
	const { id }=req.params;
	try {
		const task = await taskScheme.findById(id);
		if(task){
			return res.status(200).json({
				ok: true,
				data: task
			})
		}
	} catch (error) {
		return res.status(500).json({
			ok: true,
			error: error
		})
	}
}
async function UpdateTask(req, res){
	const { id } = req.params;
	try {
		const updatedTask = await taskScheme.findByIdAndUpdate(id, req.body);
		return res.status(200).json({
			ok: true,
			updated: updatedTask,
		})
	} catch (error) {
		return res.status(500).json({
			ok: true,
			error: error
		})
	}
}
async function AddTask(req, res){
	try {
		// const {user_id} = req.body; //traigo el usuario de la base
		const { payload: {_id}} = req;//ahora traigo el usuario a traves del payload del token
		// const user = await userScheme.findById(user_id); //leo ese usuario
		const user = await userScheme.findById(_id);//ahora leo el usuario que traje a traves del payload
		// const addTask = await taskScheme.create(req.body);//creo la tarea
		const addTask = await taskScheme.create({
			...req.body, //a traves del spredoperator mantengo todas las propiedades anteriores
			user_id: _id,//y aqui envio la propiedad user_id
		});
		user.task.push({_id: addTask._id});//task es la propiedad que agregue en el modelo user
		user.save();
		return res.status(200).json({
			ok: true,
			addedTask: addTask,
		})
	} catch (error) {
		return res.status(500).json({
			ok: true,
			error: error
		}) 
	}
}
async function DeleteTask(req, res){
	const { id } = req.prams;
	try {
		const deletedTask = await taskScheme.findByIdAndDelete(id);
		return res.status(201).json({
			ok: true,
			deleted: deletedTask,
		})
	} catch (error) {
		return res.status(500).json({
			ok: true,
			error: error
		})
	}
}
async function VirtualDeletedTask(req, res){
	const { id } =req.params;
	try {
		const virtualDeleted = await taskScheme.findByIdAndUpdate(id, {eliminado: true})
		return res.status(201).json({
			ok: true,
			virtual_deleted: virtualDeleted,
		})
	} catch (error) {
		return res.status(500).json({
			ok: true,
			error: error
		})
	}
}
export  { GetAllTask, GetTaskById, UpdateTask, AddTask, DeleteTask, VirtualDeletedTask };