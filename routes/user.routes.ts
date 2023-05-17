import { Router } from "express";

import UserController from "../controller/user.controller";

const router = Router();

router.post("/user", UserController.createUser);
router.put("/user", UserController.updateUser);
router.get("/users", UserController.getUsers);

export default router;
