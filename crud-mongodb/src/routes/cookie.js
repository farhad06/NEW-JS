import { Router } from "express";
import cookieController from "../controllers/cookieController.js";

const router = Router();

router.get('/set-cookie', cookieController.setCookie);
router.get('/get-cookie', cookieController.getCookie);
router.get('/delete-cookie', cookieController.deleteCookie);







export default router;