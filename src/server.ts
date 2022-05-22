//------------------------- ENV VARS -------------------------

import dotenv from "dotenv";
dotenv.config();

//------------------------- IMPORTS -------------------------

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import passport from "passport";

import { COOKIE_MAX_AGE, ROOT } from "@globals/constants";
import { initializePassport } from "@utils/passport";

//------------------------- ROUTERS -------------------------

import authRouter from "@routes/auth";
import otpRouter from "@routes/otp";
import mentorRouter from "@routes/mentor";

//------------------------- MIDDLEWARES -------------------------

initializePassport();

const app = express();

app
  .use(
    cors({
      origin: process.env.CLIENT,
      credentials: true,
    })
  )
  .use(
    cookieSession({
      maxAge: COOKIE_MAX_AGE,
      keys: [process.env.SECRET!],
    })
  )
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(passport.initialize())
  .use(passport.session());

//------------------------- ROUTES -------------------------

app.use(`${ROOT}/auth`, authRouter);
app.use(`${ROOT}/otp`, otpRouter);
app.use(`${ROOT}/mentor`, mentorRouter);

//------------------------- APP -------------------------

app.listen(process.env.PORT, () => {
  console.log(
    `Server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
