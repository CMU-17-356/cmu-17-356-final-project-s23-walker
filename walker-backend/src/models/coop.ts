import { Schema, model } from 'mongoose'
import { User, IUser } from './user.js'

interface ICoOp {
  users: IUser[]
}

const schema = new Schema({
  users: {
    type: [String], //should be [User.schema],
    default: []
  },

});

const CoOp = model<ICoOp>('CoOp', schema)

export { CoOp }
export type { ICoOp }