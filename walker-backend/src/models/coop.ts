import { Schema, model } from 'mongoose';
import { User, IUser } from './user.js';
import { Call, ICall } from './call.js';

interface ICoOp {
  users: IUser[],
  calls: ICall[],
  name: string,
}

const coopSchema = new Schema({
  users: {
    type: [User.schema]
  },
  name: {
    type: String
  },
  calls: {
    type: [Call.schema],
    default: []
  }
}, { autoIndex: false });

const CoOp = model<ICoOp>('CoOp', coopSchema)

export { CoOp }
export type { ICoOp }