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
<<<<<<< HEAD
    const userObj = body.user;

    const newCoop = new CoOp({ name: body.group });

    const user = new User({ ...userObj, coop_id: newCoop._id });
    console.log(user)
    newCoop.users.push(user)

    newCoop.save().then(() => {
      user.save()
      user.setPassword(userObj.password)
        .then((resp) => {
          res.status(200).json(resp);
        })
        .catch((err: Error) => {
          console.log('user error', err)
          return res.status(500).json(err)
        });
    })
=======
    const user = new User({person_name: body.person_name,
      pet_name: body.pet_name,
      email: body.email})

    user.schema.methods.setPassword(body.password)
    const newCoop = new CoOp({ users: [user], name: body.group })
    newCoop.save()
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
    user.save()
      .then((resp) => {
        res.status(200).json(resp);
      })
>>>>>>> cleanup
      .catch((err: Error) => {
        console.log('newcoop error', err)
        return res.status(500).json(err)
      });

  };

  public createUserJoinCoOp = async (req: Request, res: Response) => {
    const body = req.body
    const coop = await CoOp.findById(req.body.coop)
    if (coop) {
      const user = new User({person_name: body.person_name,
        pet_name: body.pet_name,
        email: body.email})
      user.setPassword(body.password)
      coop.users.push(user)
      await coop.save()
      user.save()
        .then(() => {
          res.status(200).json(`User with email ${body.email} joined co-op successfully.`);
        })
        .catch((err: Error) => {
          return res.status(500).json(err)
        });
    }
  };

  public getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email
    User.findOne({ email: email })
      .then((user: IUser | null) => {
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
    User.find({})
      .then((users: IUser[]) => {
        return res.status(200).json(users)
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };
}
export { UserController }