import { CoOp } from '../models/coop.js';
import { User, IUser } from '../models/user.js'
import { Invitation } from '../models/invitation.js'
import { Request, Response } from 'express'

class UserController {
  public createUserAndCoop = async (req: Request, res: Response) => {
    const body = req.body
    const unique = await User.findOne({ email: body.email }) //check uniqueness
    if (unique) {
      return res.status(400).json(`Account with email ${body.email} already exists.`)
    }

    const newCoop = new CoOp({ name: body.group });
    const user = new User({
      person_name: body.person_name,
      pet_name: body.pet_name,
      email: body.email,
      coop_id: newCoop._id
    })

    user.setPassword(body.password)
    newCoop.users.push(user)
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
    const { body } = req
    const invitations = await Invitation.find({ email: body.email })
    if (!invitations || invitations.length <= 0) return res.status(500).json(`No invitations found for user with email ${body.email}`)
    const coop_id = invitations[0].coop._id
    const coop = await CoOp.findById(coop_id)

    if (!coop) return res.status(500).json(`No co-op found with id ${coop_id}`)

    const user = new User({
      person_name: body.person_name,
      pet_name: body.pet_name,
      email: body.email,
      coop_id
    })
    user.setPassword(body.password)

    coop.users.push(user)
    coop.save().then(() => {
      user.save()
        .then(() => {
          return res.status(200).json(coop);
        })
        .catch((err: Error) => {
          return res.status(500).json(err)
        });
    })
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