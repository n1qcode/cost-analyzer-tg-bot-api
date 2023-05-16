import { Router } from "express";

import CostController from "../controller/cost.controller";

const router = Router();

router.post("/cost", CostController.createCost);
router.post("/cost/:year/:season/:month/:day", CostController.addToCost);
router.get("/cost/:year/:season/:month/:day", CostController.getCurrentCost);
router.get("/cost/:year", CostController.getYearCost);
router.get("/cost/:year/:season", CostController.getSeasonCost);
router.get("/cost/:year/:season/:month", CostController.getMonthCost);
router.get("/cost/:year/:season/:month/:day", CostController.getDayCost);
router.get("/cost", CostController.getAllCost);
router.get("/cost/period", CostController.getPeriodCost);

export default router;
