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
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, //email regex,
    unique: true
  },
  inviter: {
    type: User.schema,
    required: true
  }
}, { autoIndex: false });

const Invitation = model<IInvitation>('Invitation', invitationSchema)

export { Invitation }
export type { IInvitation }