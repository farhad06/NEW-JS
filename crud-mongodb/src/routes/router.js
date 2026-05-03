import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);

export default router;