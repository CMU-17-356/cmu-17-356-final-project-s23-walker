import { Schema, model } from 'mongoose';
import { User, IUser } from './user.js';

interface ICoOp {
  users: IUser[]
}

const coopSchema = new Schema({
  users: {
    type: [User.schema]
  },

});

const CoOp = model<ICoOp>('CoOp', coopSchema)

export { CoOp }
export type { ICoOp }