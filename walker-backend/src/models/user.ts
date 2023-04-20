import { Schema, model } from 'mongoose'
import { CoOp, ICoOp } from './coop.js';

interface IUser {
  person_name: string,
  password: string,
  pet_name: string,
  email: string,
  coop: ICoOp
}

const userSchema: Schema = new Schema({
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
  // coop: {
  //   type: CoOp.schema,
  // },
});

const User = model<IUser>('User', userSchema)

export { User }
export type { IUser }