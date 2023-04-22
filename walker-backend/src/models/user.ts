import { pbkdf2Sync, randomBytes } from 'crypto';
import { Model, Schema, model } from 'mongoose'

//password hashing following this guide: https://www.loginradius.com/blog/engineering/password-hashing-with-nodejs/
interface IUser {
  person_name: string,
  pet_name: string,
  email: string,
  hash : string, 
  salt : string 
}

const userSchema = new Schema<IUser>({
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
  hash : String, 
  salt : String 
});

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function(password : string) { 
     this.salt = randomBytes(16).toString('hex'); 
     this.hash = pbkdf2Sync(password, this.salt,  
     200, 64, `sha512`).toString(`hex`); 
 }; 

 userSchema.methods.validPassword = function(password : string) { 
     const hash = pbkdf2Sync(password,  
     this.salt, 1000, 64, `sha512`).toString(`hex`); 
     return this.hash === hash; 
 }; 

const User = model<IUser>('User', userSchema)

export { User }
export type { IUser }