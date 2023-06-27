import mongoose from "mongoose";

export function ConnectDB(){
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://FERNANDO:lqAIOaMBYto0acBU@cluster0.izuodaw.mongodb.net/usuariosDB')
    .then(res => console.log('Conexión con la base de exitosa'))
    .catch(error => console.log(error));
}