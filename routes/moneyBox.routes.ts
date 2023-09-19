import { Router } from "express";

import MoneyBoxController from "../controller/moneyBox.controller";

const router = Router();

router.get("/money_box", MoneyBoxController.getInfoOfMoneyBox);
router.put("/money_box/put", MoneyBoxController.putMoneyToMoneyBox);
router.put("/money_box/take", MoneyBoxController.takeMoneyFromMoneyBox);

export default router;
