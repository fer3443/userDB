import { Schema } from "mongoose";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userScheme = new Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: String,
    passwordHash: String,
    urlPhoto: String,
    creado: {
        type: Date,
        default: Date.now
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    eliminado: {
        type: Boolean,
        default: false
    }
});
userScheme.methods.generateAccesToken = function(){ //mongoose me permite agregar un metodo en tiempo de ejecucion
    const token = jwt.sign({_id: this._id}, "Mi secreto")
    return token;
}
/*
jwt.sign recibe como parametros el payload o un objeto o un buffer, y la secretOrPrivateKey, en este caso coloque un objeto y una string como SOPK
*/
export default mongoose.model('users', userScheme);