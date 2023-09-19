import { Router } from "express";

import moneyRotationController from "../controller/moneyRotation.controller";

const router = Router();

router.put(
  "/money_rotation/from_money_box_to_pocket_money",
  moneyRotationController.fromMoneyBoxToPocketMoney
);
router.put(
  "/money_rotation/from_pocket_money_to_money_box",
  moneyRotationController.fromPocketMoneyToMoneyBox
);

export default router;
