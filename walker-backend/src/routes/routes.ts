import { Router } from 'express';
import { CallController } from '../controllers/call.js';
import { UserController } from '../controllers/users.js';
import { InvitationController } from '../controllers/invitation.js';
import { CoOpController } from '../controllers/coop.js';
import { AuthController } from '../controllers/auth.js';
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();

const Calls = new CallController();
const Users = new UserController();
const Invitations = new InvitationController();
const Coops = new CoOpController();
const Auth = new AuthController();

// Call routes
router.post('/calls', Calls.createCall);
router.patch('/calls/accept', Calls.acceptCall);
router.get('/calls', Calls.getAllCalls);

// User routes
router.post('/users/createandjoin', Users.createUserAndCoop);
router.post('/users/joincoop', Users.createUserJoinCoOp);
router.post('/auth/login', Auth.login);
router.get('/users', Users.getAllUsers);
router.get('/users/:email', Users.getUserByEmail);

// Invitation routes
router.get('/invitations', Invitations.getInvitations);
router.post('/invitations', Invitations.createInvitation);

// CoOp routes
router.get('/coops/:id', Coops.getCoopById);
router.post('/coops/join', Coops.joinCoop);

// Auth/login routes
router.post('/auth/login', Auth.login);
router.post('/auth/validate', Auth.validateToken);
export { router };