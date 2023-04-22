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
    const user = new User({person_name: userObj.person_name,
      pet_name: userObj.pet_name,
      email: userObj.email})
    user.schema.methods.setPassword(userObj.password)
    const newCoop = new CoOp({ users: [user], name: body.group })
    newCoop.save()
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
    user.save()
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  };

  public createUserJoinCoOp = async (req: Request, res: Response) => {
    const body = req.body
    const coop = await CoOp.findById(req.body.coop)
    const userObj = body.user;
    if (coop) {
      const user = new User({person_name: userObj.person_name,
        pet_name: userObj.pet_name,
        email: userObj.email})
      user.schema.methods.setPassword(userObj.password)
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

  public login = async (req: Request, res: Response) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.email })
      .then((user) => { 
        if (user) { 
          if (user.schema.methods.validPassword(req.body.password)) { 
              const newToken = "bleh" // TODO: implement JWTs
              return res.status(200).send({ 
                  token : newToken, 
              }) 
          } 
          else { 
              return res.status(400).send({ 
                  message : "Incorrect password"
              }); 
          } 
      }
        else { 
          return res.status(400).send({ 
              message : "User not found"
          }); 
      }
    })
    .catch((err: Error) => {
      return res.status(500).json(err)
    });
}
}
export { UserController }