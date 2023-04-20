import { Schema, model } from 'mongoose';
import { CoOp } from './coop.js';
var userSchema = new Schema({
    person_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pet_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/, //email regex
    },
    coop: {
        type: CoOp.schema,
    },
});
var User = model('User', userSchema);
export { User };
