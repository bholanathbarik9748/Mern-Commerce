import express from 'express';
import { Register, Login} from '../controller/authController.js';
import { requiredSignIn } from '../middleware/authMiddleware.js';

const routes = express.Router();

// Route for Auth  
routes.post('/register', Register)
routes.post('/login', Login);

export default routes