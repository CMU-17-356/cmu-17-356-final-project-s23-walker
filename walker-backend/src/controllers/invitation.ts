import { CoOp } from '../models/coop.js';
import { Request, Response } from 'express'
import { Invitation } from '../models/invitation.js';
import { NotUser } from '../models/user.js';

class InvitationController {
  public getInvitations = async (req: Request, res: Response) => {
    Invitation.find({})
      .then(invitations => {
        return res.status(200).json(invitations)
      })
      .catch(err => {
        return res.status(500).json(err)
      });
  }
  
  public createInvitation = async (req: Request, res: Response) => {
    const body = req.body
    const inviterUser = await NotUser.findById(body.inviter)
    body.inviter = inviterUser
    const invitation = new Invitation(body)
    invitation.save()
    .then(invitation => {
      return res.status(200).json(invitation)
    })
    .catch(err => {
      return res.status(500).json(err)
    });
  };
}
export { InvitationController }