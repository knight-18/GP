import { Request, Response } from "express";
import { serverError } from "@errors/system";
import { success } from "@success/success";

async function login(_: Request, res: Response) {
  try {
    res.json(success("Log In Successful"));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { login };
