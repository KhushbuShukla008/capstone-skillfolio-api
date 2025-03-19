import express from 'express';
import { check } from 'express-validator';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty()
], loginUser);

router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], registerUser);

export default router;
