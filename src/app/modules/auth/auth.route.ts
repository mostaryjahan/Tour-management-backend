import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";
import { envVars } from "../../config/env";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/logout", AuthControllers.logout);
router.post(
  "/forgot-password",
  // checkAuth(...Object.values(Role)),
  AuthControllers.forgotPassword
);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.resetPassword
);
router.post(
  "/set-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.setPassword
);
router.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.changePassword
);

//  /booking -> /login -> success ful google login -> /booking frontend
// /login -> successful google login -> / frontend

router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})
 

// api/v1/auth/google/callback?state=/booking
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${envVars.FRONTEND_URL}?error=There are some issues with your account.Please contact with our support team` }),
  AuthControllers.googleCallBackController
);

export const AuthRoutes = router;
