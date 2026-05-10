import { Router } from "express";
import userController from "../controllers/userController.js";
import sessionController from "../controllers/sessionController.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);

router.post('/login', sessionController.login);
router.get('/dashboard', sessionController.dashboard);
router.post('/logout', sessionController.logout);


export default router;