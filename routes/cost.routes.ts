import { Router } from "express";

import CostController from "../controller/cost.controller";

const router = Router();

router.put("/cost", CostController.createCostCategory);

router.put("/user/cost/amount", CostController.addToCostCategory);

router.get("/user/:id/cost", CostController.getAllCostOfUser);
router.get("/cost", CostController.getAllCost);

router.get("/user/:id/cost/year/:year", CostController.getYearCostOfUser);
router.get("/cost/year/:year", CostController.getYearCost);

router.get("/user/:id/cost/season/:season", CostController.getSeasonCostOfUser);
router.get("/cost/season/:season", CostController.getSeasonCost);

router.get(
  "/user/:id/cost/year/:year/month/:month",
  CostController.getMonthCostOfUser
);
router.get("/cost/year/:year/month/:month", CostController.getMonthCost);

router.get("/user/:id/cost/day/:date", CostController.getDayCostOfUser);
router.get("/cost/day/:date", CostController.getDayCost);

router.get("/user/:id/cost/:start/:end", CostController.getPeriodCostOfUser);
router.get("/cost/:start/:end", CostController.getPeriodCost);

export default router;
