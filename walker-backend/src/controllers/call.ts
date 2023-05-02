import { Call, ICall } from '../models/call.js';
import { CoOp } from '../models/coop.js'
import { User } from '../models/user.js'
import { Request, Response } from 'express'

class CallController {
  public createCall = async (req: Request, res: Response) => {
    const { body } = req
    const requester = await User.findById(body.requester) //check uniqueness
    body.requester = requester

    const coop = await CoOp.findById(requester?.coop_id)
    const call = new Call(body)

    call.save()
      .then(() => {
        coop?.updateOne({ calls: [...(coop?.calls ?? []), call] }).then(() => {
          return res.status(200).json(`Call with requester ${requester?.person_name} and pet ${requester?.pet_name} created successfully.`);
        }).catch((err: Error) => {
          return res.status(500).json(err)
        });
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };

  public acceptCall = async (req: Request, res: Response) => {
    const body = req.body
    const currAccepter = await User.findById(body.accepter)
    const update = { accepter: currAccepter, status: true }
    Call.findByIdAndUpdate(body.call, update).then((currCall: ICall | null) => {
      console.log(currCall)
      CoOp.findOneAndUpdate(
        {
          'calls._id': body.call,
        },
        {
          $set: {
            'calls.$.status': true,
            'calls.$.accepter': currAccepter,
          },
        }, {
        new: true,
      }).then((data) => {
        console.log(data);
        return res.status(200).json(data)
      })
    }).catch((err: Error) => {
      return res.status(500).json(err)
    });
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