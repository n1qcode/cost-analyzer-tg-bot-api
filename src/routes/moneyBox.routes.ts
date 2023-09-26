import { Router } from "express";

import MoneyBoxController from "../controller/moneyBox.controller";

const router = Router();

router.get("/finance/money_box", MoneyBoxController.getInfoOfMoneyBox);
router.get(
  "/finance/money_box_transactions/:year/:month",
  MoneyBoxController.getTransactionsFromPeriod
);
router.put("/finance/money_box/put", MoneyBoxController.putMoneyToMoneyBox);
router.put("/finance/money_box/take", MoneyBoxController.takeMoneyFromMoneyBox);

export default router;
