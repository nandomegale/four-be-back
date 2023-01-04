import { Router } from "express";
import SenderController from "../controllers/SenderController";
const router = Router();

router.get("/status", SenderController.status);
router.post("/sendmessage", SenderController.sendMessage);
router.post("/sendmessagewithdelay", SenderController.sendMessageWithDelay);
router.post("/sendimage", SenderController.sendImage);
router.post("/sendimagewithdelay", SenderController.sendImageWithDelay);
router.post("/testdelay", SenderController.testDelay);

router.get("/getallcontacts", SenderController.getAllContacts)

router.get("/getcontactsbyname", SenderController.getContactsByName)

//router.get("/startconnection", SenderController.startConnection)



export default router;
