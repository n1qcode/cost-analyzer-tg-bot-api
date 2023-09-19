import { Router } from "express";

import PocketMoneyController from "../controller/pocketMoney.controller";

const router = Router();

router.get("/pocket_money", PocketMoneyController.getInfoOfPocketMoney);
router.put("/pocket_money/put", PocketMoneyController.putMoneyToPocketMoney);
router.put(
  "/pocket_money/take",
  PocketMoneyController.takeMoneyFromPocketMoney
);

export default router;
