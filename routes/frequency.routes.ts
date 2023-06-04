import { Router } from "express";

import FrequencyController from "../controller/frequency.controller";

const router = Router();

router.get("/frequency", FrequencyController.getCategoriesByFrequency);

export default router;
