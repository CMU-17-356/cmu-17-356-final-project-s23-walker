import { Schema, model } from 'mongoose';
import { CoOp } from './coop.js';
import { User } from './user.js';
var invitationSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    coop: {
        type: CoOp.schema,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/, //email regex
    },
    inviter: {
        type: User.schema,
        required: true
    }
});
var Invitation = model('Invitation', invitationSchema);
export { Invitation };
