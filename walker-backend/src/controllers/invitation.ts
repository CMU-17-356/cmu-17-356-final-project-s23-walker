import { Request, Response } from 'express'
import { Invitation, IInvitation } from '../models/invitation.js';
import { User } from '../models/user.js';
import nodemailer from 'nodemailer';
class InvitationController {
  public getInvitations = async (req: Request, res: Response) => {
    Invitation.find({})
      .then((invitations: IInvitation[]) => {
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
      const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
          user: "walkerapp123@yahoo.com",
          pass: "key123!!!"
        }
      });
      const mailOptions = {
        from: "walkerapp123@yahoo.com",
        to: invitation.email,
        subject: 'You have been invited to join a Co-Op!',
        text: `You have been invited to join a Co-Op! Click the link to join: ${invitation.link}`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.status(500).json(error)
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


      return res.status(200).json(invitation)
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(500).json(err)
    });
  };
}
export { InvitationController }