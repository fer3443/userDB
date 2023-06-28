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
    }
});

export default mongoose.model('task', taskScheme);