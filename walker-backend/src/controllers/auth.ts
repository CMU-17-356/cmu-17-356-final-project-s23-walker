import { User } from '../models/user.js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const EXPIRATION_IN_SECONDS = 60 * 60 //set time user can be logged in until expiration

class AuthController {
  public login = async (req: Request, res: Response) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          if (user.validPassword(req.body.password)) {
            const secret_key = process.env.JWT_SECRET_KEY
            console.log(secret_key)
            if (secret_key !== undefined) {
              const newToken = jwt.sign({ public: 'pomeranian' }, secret_key, { expiresIn: EXPIRATION_IN_SECONDS });
              return res.status(200).send({
                token: newToken,
              })
            }
            else {
              return res.status(400).send({
                message: "Invalid secret key"
              });
            }
          }
          else {
            return res.status(400).send({
              message: "Incorrect password"
            });
          }
        }
        else {
          return res.status(400).send({
            message: "User not found"
          });
        }
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  }

  public validateToken = async (req: Request, res: Response) => {
    const token = req.body.token
    const secret_key = process.env.JWT_SECRET_KEY
    if (secret_key !== undefined) {
      jwt.verify(token, secret_key, function (err: jwt.VerifyErrors | null) {
        if (err) {
          return res.status(400).send({
            message: err.message
          });
        }
        else {
          return res.status(200).send()
        }
      });
    }
    else {
      return res.status(400).send({
        message: "Invalid secret key"
      });
    }

  }
}
export { AuthController }