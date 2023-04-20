import { Schema, model } from 'mongoose'
import { CoOp, ICoOp } from './coop.js';
import { IUser, User } from './user.js';

interface IInvitation {
  link: string,
  email: string,
  coop: ICoOp,
  inviter: IUser
}

const invitationSchema: Schema = new Schema({
  link: {
    type: String,
    required: true
  },
  coop: {
    type: CoOp.schema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/, //email regex
  },
  inviter: {
    type: User.schema,
    required: true
  }
});

const Invitation = model<IInvitation>('Invitation', invitationSchema)

export { Invitation }
export type { IInvitation }