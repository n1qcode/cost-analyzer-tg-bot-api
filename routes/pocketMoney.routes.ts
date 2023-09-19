import { Router } from "express";

import PocketMoneyController from "../controller/pocketMoney.controller";

const router = Router();

router.get("/finance/pocket_money", PocketMoneyController.getInfoOfPocketMoney);
router.put(
  "/finance/pocket_money/put",
  PocketMoneyController.putMoneyToPocketMoney
);
router.put(
  "/finance/pocket_money/take",
  PocketMoneyController.takeMoneyFromPocketMoney
);

export default router;
