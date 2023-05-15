import express from 'express';
import userController from '../controllers/userController.js';
import requireAuth from '../middleware/restriction/requireAuth.js';


const router = express.Router()

router.post('/login', userController.loginUser)
router.post('/signup', userController.signupUser)

router.use(requireAuth) // be sure user is login to use this controller
router.patch('/edit', userController.editUser)

export default router;