import express from 'express';
import contactController from '../controllers/contactController.js';
import tryAddAuth from '../middleware/restriction/tryAddAuth.js';

const router = express.Router();

router.use(tryAddAuth);
router.post("/", contactController.contact)

export default router;