import { CoOp } from '../models/coop.js';
import { NotUser } from '../models/user.js'
import { Request, Response } from 'express'

class UserController {
  public createUserAndCoop = async (req: Request, res: Response) => {
    const body = req.body
    const unique = await NotUser.findOne({email: body.email}) //check uniqueness
    if (unique) {
      return res.status(400).json(`Account with email ${body.email} already exists.`)
    }
    const user = new NotUser(body)
    const newCoop = new CoOp({users: [user]})
    newCoop.save()
    .catch(err => {
      return res.status(500).json(err)
    });
    user.save()
      .then(() => {
        res.status(200).json(`User with email ${body.email} created successfully.`);
      })
      .catch(err => {
        return res.status(500).json(err)
      });
  };

  public createUserJoinCoOp = async (req: Request, res: Response) => {
    const body = req.body
    const coop = await CoOp.findById(req.body.coop)
    const coopArray = coop?.users
    coopArray?.push(req.body.coop)
    coop?.updateOne({users: coopArray})
    const user = new NotUser(body)
    user.save()
      .then(() => {
        res.status(200).json(`User with email ${body.email} joined co-op successfully.`);
      })
      .catch(err => {
        return res.status(500).json(err)
      });
  };
  
  public getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email
    NotUser.findOne({email: email})
      .then(user => {
        if (user) {
          return res.status(200).json(user)
        }
        return res.status(404).json(`User with email ${email} not found`)
      })
      .catch(err => {
        return res.status(500).json(err)
      });
  };

  public getAllUsers = async (req: Request, res: Response) => {
    NotUser.find({})
      .then(users => {
        return res.status(200).json(users)
      })
      .catch(err => {
        return res.status(500).json(err)
      });
  };
}
export { UserController }