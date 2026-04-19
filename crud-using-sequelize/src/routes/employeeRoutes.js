import { Router } from "express";
import employeeController from "../controllers/employeeController.js";

const router = Router();

router.get("/", employeeController.getAllEmployee);
router.post("/create", employeeController.store);
router.put("/update/:id", employeeController.update);
router.delete("/delete/:id", employeeController.destroy);
router.get("/show/:id", employeeController.show);

export default router;