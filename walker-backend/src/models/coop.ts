import { Schema, model } from 'mongoose';
import { NotUser } from './user.js';

interface ICoOp {
  users: string[]
}

const coopSchema = new Schema({
  users: {
    type: [NotUser.schema] //array of user IDs to avoid circular dependency
  },

});

const CoOp = model<ICoOp>('CoOp', coopSchema)

export { CoOp }
export type { ICoOp }