import { Request, Response } from 'express';
import { CoOp, ICoOp } from '../models/coop.js';
import { User } from '../models/user.js';

class CoOpController {
    // public createCoOp = async (req: Request, res: Response) => {
    //   const { email, password, person_name, pet_name, coop_name } = req.body;
  
    //   // Check if a User with the same email already exists
    //   const existingUser = await User.findOne({ email });
    //   if (existingUser) {
    //     return res.status(400).json({ message: `Account with email ${email} already exists.` });
    //   }
  
    //   // Create a new CoOp
    //   const newCoOp = new CoOp({ name: coop_name });
    //   try {
    //     const savedCoOp = await newCoOp.save();
  
    //     // Create a new User associated with the CoOp

    //     // er idrk whats this
    //     const newUser = new IUser({
    //       person_name,
    //       password, // Consider hashing the password before saving
    //       pet_name,
    //       email,
    //       coop: savedCoOp,
    //     });
  
    //     const savedUser = await newUser.save();
  
    //     return res.status(200).json({ message: 'CoOp and user created successfully.', savedCoOp, savedUser });
    //   } catch (error) {
    //     console.error('Error creating CoOp and user:', error);
    //     return res.status(500).json({ message: 'Error creating CoOp and user.', error });
    //   }
    // };

    public getCoopById = async (req: Request, res: Response) => {
        const coopId = req.params.id;
        CoOp.findById(coopId)
          .then((coop: ICoOp |null) => {
            if (coop) {
              return res.status(200).json(coop);
            }
            return res.status(404).json(`Co-op with ID ${coopId} not found.`);
          })
          .catch((err: Error) => {
            return res.status(500).json(err);
          });
      };
    
    public joinCoop = async (req: Request, res: Response) => {
      const body = req.body;
      const coop = await CoOp.findById(body.coopId);
      const user = await User.findById(body.userId);
  
      if (coop && user) {
        coop.users.push(user);
        await coop.save();
  
        return res.status(200).json(`User with email ${user.email} joined co-op successfully.`);
      } else {
        return res.status(500).json(`Co-op or User not found.`);
      }
    };
  }
  
  export { CoOpController };
  