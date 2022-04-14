import { loginErrors } from "@middlewares/auth";
import { login } from "@controllers/auth";
import express from "express";
import passport from "passport";

const router = express.Router({ mergeParams: true });

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  loginErrors,
  login
);

export default router;
