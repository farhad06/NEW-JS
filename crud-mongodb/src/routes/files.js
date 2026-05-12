import { Router } from "express";
import fileController from "../controllers/fileSystemController.js";

const router = Router();

router.get('/write-file', fileController.writeFile);
router.get('/read-file', fileController.readFile);
router.get('/append-file', fileController.appendFile);
router.get('/delete-file', fileController.deleteFile);
router.get('/rename-file', fileController.renameFile);

router.get('/stream-text', fileController.streamText);

router.get('/create-folder', fileController.createFolder);
router.get('/rename-folder', fileController.renameFolder);
router.get('/delete-folder', fileController.deleteFolder);


router.get('/path-module', fileController.fileModule);
router.get('/all-path-functions', fileController.allPathFunctions);






export default router;