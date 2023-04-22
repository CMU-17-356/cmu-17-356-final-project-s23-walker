import { Router } from 'express';
import { CallController } from '../controllers/call.js';
import { UserController } from '../controllers/users.js';
import { InvitationController } from '../controllers/invitation.js';
import { CoOpController } from '../controllers/coop.js';

const router = Router();

const Calls = new CallController();
const Users = new UserController();
const Invitations = new InvitationController();
const Coops = new CoOpController();

// Call routes
router.post('/calls', Calls.createCall);
router.patch('/calls/accept', Calls.acceptCall);
router.get('/calls', Calls.getAllCalls);

// User routes
router.post('/users/createandjoin', Users.createUserAndCoop);
router.post('/users/joincoop', Users.createUserJoinCoOp);
router.post('/users/login', Users.login);
router.get('/users', Users.getAllUsers);
router.get('/users/:email', Users.getUserByEmail);

// Invitation routes
router.get('/invitations', Invitations.getInvitations);
router.post('/invitations', Invitations.createInvitation);

router.get('/coops/:id', Coops.getCoopById);
router.post('/coops/join', Coops.joinCoop);

export { router };