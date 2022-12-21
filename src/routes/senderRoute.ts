import { Router } from "express";
import SenderController from "../controllers/SenderController";
const router = Router();

router.get("/status", SenderController.status);
router.post("/sendmessage", SenderController.sendMessage);
router.post("/sendmessagewithdelay", SenderController.sendMessageWithDelay);
router.post("/sendimage", SenderController.sendImage);
router.post("/sendimagewithdelay", SenderController.sendImageWithDelay);
router.post("/testdelay", SenderController.testDelay);

export default router;
