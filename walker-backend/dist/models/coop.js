import { Schema, model } from 'mongoose';
var schema = new Schema({
    users: {
        type: [String],
        default: []
    },
});
var CoOp = model('CoOp', schema);
export { CoOp };
