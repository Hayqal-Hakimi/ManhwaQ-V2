import { Router } from 'express';
import {
  addChapter,
  createManhwa,
  getManhwa,
  listManhwa,
  listRecentChapters,
  updateManhwa,
} from '../controllers/manhwaController.js';
import { adminOnly, auth } from '../middleware/auth.js';

const router = Router();

router.get('/chapters/recent', listRecentChapters);
router.get('/', listManhwa);
router.get('/:id', getManhwa);

router.post('/', auth, adminOnly, createManhwa);
router.patch('/:id', auth, adminOnly, updateManhwa);
router.post('/:id/chapters', auth, adminOnly, addChapter);

export default router;
