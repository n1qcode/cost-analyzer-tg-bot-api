import { Router } from "express";

import UsersController from "../controller/users.controller";

const router = Router();

router.get("/users/places", UsersController.getLastUsersPlaces);
router.get("/users/currencies", UsersController.getUsersCurrencies);
router.put("/users/finance", UsersController.setUserFinanceInfo);
router.put("/users/place", UsersController.setLastUserPlace);
router.put("/users/currency", UsersController.setUserCurrency);

export default router;
