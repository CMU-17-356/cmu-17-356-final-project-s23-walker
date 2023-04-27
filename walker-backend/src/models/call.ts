import { Schema, model } from 'mongoose';
import { User, IUser } from './user.js';

const MAX_MONTH = 3 //number of months in advance users can set a walker call

interface ICall {
  activity: string,
  details: string,
  date: Date,
  requester: IUser,
  accepter: IUser,
  status: boolean,
}

const today = new Date(Date.now())

const maxDate = new Date(today)
maxDate.setMonth(maxDate.getMonth() + MAX_MONTH);

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
    min: [today, 'Date is in the past'],
    max: [maxDate, `Date is more than ${MAX_MONTH} months in the future`]
  },
  status: {
    type: Boolean,
    default: false
  },
  requester: {
    type: User.schema,
    unique: false
  },
  accepter: {
    type: User.schema,
    unique: false
  },
}, { autoIndex: false });

const Call = model<ICall>('Call', callSchema)

export { Call }
export type { ICall }