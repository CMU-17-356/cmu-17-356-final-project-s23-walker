import { CoOp } from '../models/coop.js';
import { User, IUser } from '../models/user.js'
import { Request, Response } from 'express'

class UserController {
  public createUserAndCoop = async (req: Request, res: Response) => {
    const body = req.body
    const unique = await User.findOne({ email: body.email }) //check uniqueness
    if (unique) {
      return res.status(400).json(`Account with email ${body.email} already exists.`)
    }
    const userObj = body.user;

    const newCoop = new CoOp({ name: body.group });

    const user = new User({ ...userObj, coop_id: newCoop._id });
    newCoop.users.push(user)
    user.setPassword(userObj.password)
    newCoop.save().then(() => {
      user.save()
        .then((resp) => {
          res.status(200).json(resp);
        })
        .catch((err: Error) => {
          console.log('user error', err)
          return res.status(500).json(err)
        });
    })
      .catch((err: Error) => {
        console.log('newcoop error', err)
        return res.status(500).json(err)
      });

  };

  public createUserJoinCoOp = async (req: Request, res: Response) => {
    const body = req.body
    const coop = await CoOp.findById(req.body.coop)
    const userObj = body.user
    if (coop) {
      console.log(userObj)
      const user = new User({person_name: userObj.person_name,
        pet_name: userObj.pet_name,
        email: userObj.email,
        coop_id: req.body.coop})
      user.setPassword(userObj.password)
      coop.users.push(user)
      await coop.save()
      user.save()
        .then(() => {
          return res.status(200).json(`User with email ${body.email} joined co-op successfully.`);
        })
        .catch((err: Error) => {
          return res.status(500).json(err)
        });
    }
  };

  public getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email
    User.findOne({ email: email }).select('-hash -salt')
      .then((user) => {
        if (user) {
          return res.status(200).json(user)
        }
        return res.status(404).json(`User with email ${email} not found`)
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };

  public getAllUsers = async (req: Request, res: Response) => {
    User.find({}).select('-hash -salt')
      .then((users: IUser[]) => {
        return res.status(200).json(users)
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };
}
export { UserController }