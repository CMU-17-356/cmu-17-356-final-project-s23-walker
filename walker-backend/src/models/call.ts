import { Schema, model } from 'mongoose';
import { User, IUser } from './user.js';
import { CoOp, ICoOp } from './coop.js';

const MAX_MONTH = 3 //number of months in advance users can set a walker call

interface ICall {
  activity: string,
  details: string,
  date : Date,
  requester : IUser,
  accepter : IUser,
  status: boolean,
  coop: ICoOp,
}

const today = new Date()
const todayYear = today.getFullYear()
const todayMonth = today.getMonth() + 1
const todayDay = today.getDate()

const maxDate = new Date(today)
maxDate.setMonth(maxDate.getMonth() + MAX_MONTH);

const maxYear = today.getFullYear()
const maxMonth = today.getMonth() + 1
const maxDay = today.getDate()

const callSchema = new Schema({
  activity: {
    type: String,
    required: true,
    enum: ['Walk', 'Petsitting']
  },
  details: {
    type: String
  },
  date: {
    type: Date,
    default: () => new Date(Date.now()),
    min: [`${todayYear}-${todayMonth}-${todayDay}`, 'Date is in the past'],
    max: [`${maxYear}-${maxMonth}-${maxDay}`, `Date is more than ${MAX_MONTH} months in the future`]
  },
  requester: {
    type: User.schema
  },
  coop: {
    type: CoOp.schema
  }
});

const Call = model<ICall>('Call', callSchema)

export { Call }
export type { ICall }