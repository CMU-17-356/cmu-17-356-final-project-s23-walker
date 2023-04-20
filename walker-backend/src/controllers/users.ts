import { User } from '../models/user.js'
import { Request, Response } from 'express'

class UsersController {
  public getUsers = async (req: Request, res: Response) => {
    User.find({})
      .then(users => {
        return res.status(200).json(users)
      })
      .catch(err => {
        console.log("getUsers: " + err)
        return res.status(500).json(err)
      });
  }
  
  public createUser = async (req: Request, res: Response) => {
    const body = req.body
    // validate username uniqueness
    const u = await User.findOne({email: body.email})
    if (u) return res.status(400).json(`Account with email ${body.email} already exists.`)
    const user = new User(body)
    user.save()
      .then(() => {
        res.status(200).json(`User with email ${body.email} created successfully.`);
      })
      .catch(err => {
        return res.status(500).json(err)
      });
  };
  
  public getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email
    User.findOne({email: email})
      .then(user => {
        if (user) {
          return res.status(200).json(user)
        }
        return res.status(404).json(`User with email ${email} not found`)
      })
      .catch(err => {
        console.log("getUser: " + err)
        return res.status(500).json(err)
      });
  };
}
export { UsersController }