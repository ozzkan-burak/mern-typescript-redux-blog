import  express from 'express';
import authCtrl from '../controllers/authConrollers';
import { validRegister } from '../middleware/valid';

const router = express.Router();

router. post('/register', validRegister, authCtrl.register);

export default router;