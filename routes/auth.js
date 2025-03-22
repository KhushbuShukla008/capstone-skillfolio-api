import express from 'express';
import { check } from 'express-validator';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty()
], (req, res, next) => {
  console.log('Login Request Body:', req.body);
  next();
}, loginUser);

router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], (req, res, next) => {
  console.log('Register Request Body:', req.body);
  next();
}, registerUser);

export default router;
