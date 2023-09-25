import { Router } from "express";

import CostController from "../controller/cost.controller";

const router = Router();

router.post("/cost", CostController.createCostCategory);

router.put("/cost/amount", CostController.addToCostCategory);

router.get("/cost", CostController.getAllCost);
router.get("/cost/year/:year", CostController.getYearCost);
router.get("/cost/season/:season", CostController.getSeasonCost);
router.get("/cost/year/:year/month/:month", CostController.getMonthCost);
router.get("/cost/day/:date", CostController.getDayCost);
router.get("/cost/:start/:end", CostController.getPeriodCost);
router.get("/cost/categories", CostController.getCostCategories);

export default router;
