import { pbkdf2Sync, randomBytes } from 'crypto';
import { Model, Schema, model } from 'mongoose'

//password hashing following this guide: https://www.loginradius.com/blog/engineering/password-hashing-with-nodejs/
interface IUser {
  person_name: string,
  pet_name: string,
  email: string,
  coop_id: Schema.Types.ObjectId
  hash : string, 
  salt : string 
}

interface IUserMethods {
  setPassword: (password : string) => void,
  validPassword: (password : string) => boolean
}

type UserModel = Model<IUser, unknown, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  person_name: {
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
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, //email regex
    unique: true
  },
  coop_id: {
    type: Schema.Types.ObjectId,
    ref: 'CoOp',
  },
  hash : String, 
  salt : String 
});

// Method to set salt and hash the password for a user 
userSchema.method('setPassword', function setPassword(password : string) { 
     this.salt = randomBytes(16).toString('hex'); 
     this.hash = pbkdf2Sync(password, this.salt,  
     200, 64, `sha512`).toString(`hex`); 
 })

 userSchema.method('validPassword', function validPassword(password : string) { 
     const hash : string = pbkdf2Sync(password,  
     this.salt, 200, 64, `sha512`).toString(`hex`);

     return this.hash === hash; 
 })

const User = model<IUser, UserModel>('User', userSchema)

export { User }
export type { IUser }