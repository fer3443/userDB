import mongoose from "mongoose";

export function ConnectDB(){
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB_CONECTION)
    .then(res => console.log('Conexión con la base de exitosa'))
    .catch(error => console.log(error));
}