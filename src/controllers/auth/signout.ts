import { Request, Response } from "express";
import { serverError } from "@errors/system";
import { userLoggedOut } from "@success/auth";

/**
 * @description Logs Out a user
 */
async function signout(req: Request, res: Response) {
  try {
    req.logout();
    res.json(userLoggedOut);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { signout };
