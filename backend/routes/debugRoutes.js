import express from 'express';
import debugController from '../controllers/debugController.js';

// restrictions
import requireAuth from '../middleware/restriction/requireAuth.js';
import requireRole from "../middleware/restriction/requireRole.js";

const router = express.Router()

// permission
router.use(requireAuth) // be sure user is login to use this controller
router.use(requireRole.requireRoleAdmin) // be sure the user is at least an admin to use this controller

router.get('/db', debugController.debugdb)

export default router;