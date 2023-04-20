import { Call } from '../models/call.js';
import { NotUser } from '../models/user.js'
import { Request, Response } from 'express'

class CallController {
  public createCall = async (req: Request, res: Response) => {
    const body = req.body
    const requester = await NotUser.findById(body.requester) //check uniqueness
    body.requester = requester
    const call = new Call(body)
    call.save()
      .then(() => {
        res.status(200).json(`Call with requester ${requester?.person_name} and pet ${requester?.pet_name} created successfully.`);
      })
      .catch((err: any) => {
        return res.status(500).json(err)
      });
  };
  
  public acceptCall = async (req: Request, res: Response) => {
    const body = req.body    
    const currAccepter = await NotUser.findById(body.accepter)
    const currCall = await Call.findById(body.call)
    const update = {accepter: currAccepter}
    currCall?.updateOne(update)
    .then((currCall: any) => {
      return res.status(200).json(currCall)
    })
  }

  public getAllCalls = async (req: Request, res: Response) => {
    Call.find({})
      .then((calls: any) => {
        return res.status(200).json(calls)
      })
      .catch((err: any) => {
        return res.status(500).json(err)
      });
  };
}
export { CallController }