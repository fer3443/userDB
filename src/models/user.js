import { Schema } from "mongoose";
import mongoose from "mongoose";

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
export default mongoose.model('users', userScheme);