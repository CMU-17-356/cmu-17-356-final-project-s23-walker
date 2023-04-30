import { Schema, model } from 'mongoose'
import { CoOp, ICoOp } from './coop.js';
import { IUser, User } from './user.js';

interface IInvitation {
  link: string,
  email: string,
  coop: ICoOp,
  inviter: IUser
}

const invitationSchema = new Schema({
  coop: {
    type: CoOp.schema,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: false,
    match: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, //email regex
  },
  inviter: {
    type: User.schema,
    unique: false,
    required: true
  }
});

const Invitation = model<IInvitation>('Invitation', invitationSchema)

export { Invitation }
export type { IInvitation }