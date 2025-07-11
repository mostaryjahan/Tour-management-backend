import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.post("/register", UserController.createUser);

router.get("/all-user", UserController.getAllUser);

export const UserRoutes = router

