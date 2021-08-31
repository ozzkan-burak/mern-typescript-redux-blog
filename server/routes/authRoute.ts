import  express from 'express';
import authCtrl from '../controllers/authConrollers';

const router = express.Router();

router. post('/register', authCtrl.register);

export default router;