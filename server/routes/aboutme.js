import express from 'express';
import {
  getAboutMe,
  getAboutPublic,
  updateAboutMe
} from '../controllers/aboutcontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/public', getAboutPublic);
router.get('/', protect, getAboutMe);
router.put('/', protect, updateAboutMe);

export default router;
