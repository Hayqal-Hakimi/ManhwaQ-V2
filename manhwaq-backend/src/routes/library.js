import { Router } from 'express';
import {
  addToLibrary,
  getLibrary,
  removeFromLibrary,
  updateLibrary,
} from '../controllers/libraryController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', getLibrary);
router.post('/', addToLibrary);
router.patch('/:manhwa_id', updateLibrary);
router.delete('/:manhwa_id', removeFromLibrary);

export default router;
