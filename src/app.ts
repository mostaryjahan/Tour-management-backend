import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport";
import { envVars } from "./app/config/env";

const app = express();

app.use(cookieParser());
app.use(express.json());
const hour = 3600000;

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    cookie: {
      expires: new Date(Date.now() + hour),
      secure: app.get("env") === "production",
      sameSite: "lax",
    },
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management",
  });
});

app.use(globalErrorHandler);

app.use(notFound);
export default app;
