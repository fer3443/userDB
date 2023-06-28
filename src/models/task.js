import { Schema } from "mongoose";
import mongoose from 'mongoose';

const taskScheme = new Schema({
    titulo: String,
    descripcion: {
        type: String,
        require: true,
    },
    creado: {
        type: Date,
        default: Date.now
    },
    urgente: {
        type: Boolean,
        default: false,
    },
    eliminado: {
        type: Boolean,
        default: false
    },
    user_id:{ //referencia para el document users
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

export default mongoose.model('task', taskScheme);