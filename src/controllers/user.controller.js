import userScheme from '../models/user';
import  { Compare, Encrypt } from '../helpers/password.helper'

const ERROR_MSG = 'el usuario o la contraseña no coinciden.';

async function LoginUser(req, res){
    try{
        const { email, password } = req.body;
        const userLogged = await userScheme.findOne({email})
				.populate("task", "titulo descripcion");
        if(!userLogged){ //condicion para verificar usuario
            return res.status(400).json({
                ok:false,
                error_msg: ERROR_MSG,
            })
        }
        const passwordCheck = await Compare(password, userLogged.passwordHash);
        if(!passwordCheck){ //condicion para verificar contraseña
            console.log("no se encontraron coincidencias");
                return res.status(400).json({
                    ok: false,
                    error_msg: ERROR_MSG,
                });
        }
				console.log(userLogged);
				console.log("usuario logueado con éxito.");

                const token = userLogged.generateAccesToken();//invoco a la funcion creada en user.js

				return res.status(201).json({
						ok: true,
						user: userLogged,
                        token: token,
				})
    }catch(error){
        return res.status(500).json({
            ok: false,
            error: ERROR_MSG,
        });
    }
}
async function AddUser(req, res){
    try{
        const { nombre, apellido, email, password, urlPhoto} = req.body;
        const passwordHash = await Encrypt(password);
        
        const addedUser = await userScheme.create({
            nombre,
            apellido,
            email,
            passwordHash,
            urlPhoto,
        });
        return res.status(200).json({
            ok: true,
            addedData: addedUser,
        })
    }catch(err){
        return res.status(500).json({
            ok: false,
            error: err,
        })
    }
}
async function DeleteUser(req, res){
    const { id }= req.params;
    try {
        const deletedUser = await userScheme.findByIdAndDelete(id);
        return res.status(200).json({
            ok: true,
            deletedData: deletedUser,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: error,
        })
    }
}
async function VirtualDelete(req, res){
    const { id } = req.params;
    try {
        const virtualDeleted = await userScheme.findByIdAndUpdate(id, { eliminado: true});
        return res.status(200).json({
            ok: true,
            data: virtualDeleted, 
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: error,
        })
    }
}
export { LoginUser, AddUser, DeleteUser, VirtualDelete };