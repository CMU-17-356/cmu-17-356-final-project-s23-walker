import { Schema, model } from 'mongoose';
import { User, IUser } from './user.js';

interface ICoOp {
  users: IUser[],
  name: string,
}

const coopSchema = new Schema({
  users: {
    type: [User.schema]
  },
  name: {
    type: String
  }
});

const CoOp = model<ICoOp>('CoOp', coopSchema)

export { CoOp }
export type { ICoOp }