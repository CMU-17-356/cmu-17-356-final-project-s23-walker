import { Request, Response } from 'express'
import { Invitation, IInvitation } from '../models/invitation.js';
import { User } from '../models/user.js';

class InvitationController {
  public getInvitations = async (req: Request, res: Response) => {
    Invitation.find({})
      .then((invitations: IInvitation) => {
        return res.status(200).json(invitations)
      })
      .catch((err: Error) => {
        return res.status(500).json(err)
      });
  }
  
  public createInvitation = async (req: Request, res: Response) => {
    const body = req.body
    const inviterUser = await User.findById(body.inviter)
    body.inviter = inviterUser
    const invitation = new Invitation(body)
    invitation.save()
    .then((invitation: IInvitation) => {
      // to-do: send email to invitee
      return res.status(200).json(invitation)
    })
    .catch((err: Error) => {
      return res.status(500).json(err)
    });
  };
}
export { InvitationController }