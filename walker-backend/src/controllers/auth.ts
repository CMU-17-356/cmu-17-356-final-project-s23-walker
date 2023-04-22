import { User } from '../models/user.js'
import { Request, Response } from 'express'
import { sign, verify, VerifyErrors, JwtPayload, Jwt } from 'jsonwebtoken'

class AuthController {
  public login = async (req: Request, res: Response) => { 
    User.findOne({ email : req.body.email })
      .then((user) => { 
        if (user) { 
          if (user.schema.methods.validPassword(req.body.password)) { 
              const secret_key = process.env.HASH_SECRET_KEY
              if (secret_key !== undefined) {
                const newToken = sign({ public: 'pomeranian' }, secret_key, { expiresIn: 60 * 60 });
                return res.status(200).send({ 
                    token : newToken, 
                }) 
              }
              else {
                return res.status(400).send({ 
                  message : "Invalid secret key"
              }); 
              }
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

public validateToken = async (req: Request, res: Response) => {
  const token = req.body.token
  const secret_key = process.env.HASH_SECRET_KEY
  if (secret_key !== undefined) {
    verify(token, secret_key, function(err : VerifyErrors | null) {
      if (err) {
        return res.status(400).send({ 
          message : err.message
      }); 
      }
      else {
        return res.status(200)
      }
    });
  }
  else {
    return res.status(400).send({ 
      message : "Invalid secret key"
  }); 
  }

}
}
export { AuthController }