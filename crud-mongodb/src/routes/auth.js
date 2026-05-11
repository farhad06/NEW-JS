import { Router } from "express";
import authController from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();


router.post('/login', authController.login);
router.get('/show', protect, authController.showUser);
router.post('/logout', protect, authController.logout);


export default router;
