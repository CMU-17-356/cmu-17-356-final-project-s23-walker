import { Call, ICall } from '../models/call.js';
import { CoOp } from '../models/coop.js'
import { User } from '../models/user.js'
import { Request, Response } from 'express'

class CallController {
  public createCall = async (req: Request, res: Response) => {
    const body = req.body
    const requester = await User.findById(body.requester) //check uniqueness
    body.requester = requester
    const coop = await CoOp.findById(body.coop)
    const call = new Call(body)
    call.save()
      .then(() => {
        coop?.calls.push(call)
        coop?.save().then(() => {
          return res.status(200).json(`Call with requester ${requester?.person_name} and pet ${requester?.pet_name} created successfully.`);
        })
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };

  public acceptCall = async (req: Request, res: Response) => {
    const body = req.body
    const currAccepter = await User.findById(body.accepter)
    const currCall = await Call.findById(body.call)
    const update = { accepter: currAccepter }
    if (currCall) {
      currCall.updateOne(update)
        .then((currCall: ICall | null) => {
          return res.status(200).json(currCall)
        })
    }
    else {
      return res.status(500).json(`Cannot find call with ID ${body.call}`)
    }

  }

  public getAllCalls = async (req: Request, res: Response) => {
    Call.find({})
      .then((calls: ICall[]) => {
        return res.status(200).json(calls)
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };
}
export { CallController }