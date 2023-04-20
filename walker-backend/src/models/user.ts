import { Model, Schema, model } from 'mongoose'

interface IUser {
  person_name: string,
  password: string,
  pet_name: string,
  email: string
}

type UserModel = Model<IUser, Record<string, never>, Record<string, never>>

const userSchema: Schema = new Schema<IUser, UserModel,  Record<string, never>>({
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

const User = model<IUser>('User', userSchema)

export { User }
export type { IUser }