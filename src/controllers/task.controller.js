import taskScheme from "../models/task";

//paginacion
const maxElements = 2;

async function GetAllTask(req, res){
	const { page }= req.query; //page se agrega a la url localhost..?page=
	try {
		const tasks = await taskScheme.find()
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
		const addTask = await taskScheme.create(req.body);
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