import { Router } from "express";

import CostController from "../controller/cost.controller";

const router = Router();

router.post("/user", CostController.createUser);
router.post("/cost", CostController.createCost);

router.put("/user", CostController.updateUser);

router.put("/user/cost/amount", CostController.addToCost);

router.get("/users", CostController.getUsers);

router.get("/user/:id/cost/current", CostController.getCurrentDayCostOfUser);
router.get("/cost/current", CostController.getCurrentDayCost);

router.get("/user/:id/cost", CostController.getAllCostOfUser);
router.get("/cost", CostController.getAllCost);

router.get("/user/:id/cost/:year", CostController.getYearCostOfUser);
router.get("/cost/:year", CostController.getYearCost);

router.get("/user/:id/cost/:season", CostController.getSeasonCostOfUser);
router.get("/cost/:season", CostController.getSeasonCost);

router.get("/user/:id/cost/:month", CostController.getMonthCostOfUser);
router.get("/cost/:month", CostController.getMonthCost);

router.get("/user/:id/cost/:start/:end", CostController.getPeriodCostOfUser);
router.get("/cost/:start/:end", CostController.getPeriodCost);

export default router;
