import { ErrorRequestHandler } from "express";
import { error } from "@errors/error";

/**
 * @description Catch the errors of passport
 * on login and send them as JSON
 */
const loginErrors: ErrorRequestHandler = async (err, _, res, next) => {
  if (err) {
    res.json(error(err));
  } else {
    next();
  }
};

export { loginErrors };
