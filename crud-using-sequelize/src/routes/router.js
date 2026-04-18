import { Router } from 'express';
const router = Router();
import userController from '../controllers/usersController.js';
import userValidation from '../middlewares/userValidateMiddlewar.js';

//console.log('✅ userController loaded:', Object.keys(userController));

router.get('/', userController.getAllUser);
router.post('/create', userValidation, userController.store);
//router.get('/edit/:id', userController.edit);
router.put('/update/:id', userValidation, userController.update);
router.delete('/delete/:id', userController.destroy);
router.get('/show/:id', userController.show);


export default router;