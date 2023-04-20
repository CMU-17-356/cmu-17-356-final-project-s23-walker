import { Model, Schema, model } from 'mongoose'

interface IUser {
  person_name: string,
  password: string,
  pet_name: string,
  email: string
}

type UserModel = Model<IUser, {}, {}>

const userSchema: Schema = new Schema<IUser, UserModel, {}>({
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
});

const NotUser = model<IUser>('User', userSchema)

export { NotUser }
export type { IUser }