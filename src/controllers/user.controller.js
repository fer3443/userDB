import userScheme from '../models/user';

async function GetAllUsers(req, res){
    try{
        const users = await userScheme.find();
        return res.status(200).json({
            ok: true,
            data: users,
        });
    }catch(error){
        return res.status(500).json({
            ok: false,
            error: error,
        });
    }
}
async function AddUser(req, res){
    try{
        const addedUser = await userScheme.create(req.body);
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
async function UpdateUser(req, res){
    const { id } = req.params;
    try{
        const updatedUser = await userScheme.findByIdAndUpdate(id, req.body);
        return res.status(200).json({
            ok:true,
            updateData: updatedUser,
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
async function GetUserById(req, res){
    const { id }= req.params;
    try {
        const user = await userScheme.findById(id);
        if(user){
            return res.status(200).json({
                ok:true,
                data: user,
            })
        }
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
export { GetAllUsers, AddUser, UpdateUser, DeleteUser, GetUserById, VirtualDelete };