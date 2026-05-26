import { Router } from 'express';
import { changePassword, getMe, getUserById } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/me', auth, getMe);
router.patch('/me/password', auth, changePassword);
router.get('/:id', auth, getUserById);

export default router;
