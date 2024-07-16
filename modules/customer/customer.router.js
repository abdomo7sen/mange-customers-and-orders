import {Router} from 'express';
import { signUp ,signIn } from './customer.controller.js';
import { emailExist, emailLogin } from '../../middleWare/checkEmailExist.js';

const customerRouter=Router()

customerRouter.post('/signup',emailExist,signUp)
customerRouter.post('/signin',emailLogin,signIn)



export default customerRouter;