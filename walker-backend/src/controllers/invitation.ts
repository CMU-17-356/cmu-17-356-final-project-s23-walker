import { CoOp } from '../models/coop.js';
import { Request, Response } from 'express'
import { Invitation } from '../models/invitation.js';
import { User } from '../models/user.js';

class InvitationController {
  public getInvitations = async (req: Request, res: Response) => {
    Invitation.find({})
      .then((invitations: any) => {
        return res.status(200).json(invitations)
      })
      .catch((err: any) => {
        return res.status(500).json(err)
      });
  }
  
  public createInvitation = async (req: Request, res: Response) => {
    const body = req.body
    const inviterUser = await User.findById(body.inviter)
    body.inviter = inviterUser
    const invitation = new Invitation(body)
    invitation.save()
    .then((invitation: any) => {
      // to-do: send email to invitee
      return res.status(200).json(invitation)
    })
    .catch((err: any) => {
      return res.status(500).json(err)
    });
  };
}
export { InvitationController }