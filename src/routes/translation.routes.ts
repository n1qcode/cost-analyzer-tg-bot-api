import { Router } from "express";

import TranslationController from "../controller/translation.controller";

const router = Router();

router.post(
  "/cost/translation",
  TranslationController.createTranslationCostCategory
);
router.put(
  "/cost/translation",
  TranslationController.updateTranslationCostCategory
);
router.get(
  "/cost/translation",
  TranslationController.getTranslationCostCategory
);

export default router;
