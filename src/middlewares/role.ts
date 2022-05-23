import { notMenteeError, notMentorError } from "@errors/mentor";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

function isMentor(req: Request, res: Response, next: NextFunction) {
  if ((req.user as User).role === "MENTOR") {
    next();
  } else {
    res.json(notMentorError);
  }
}

function isMentee(req: Request, res: Response, next: NextFunction) {
  if ((req.user as User).role === "MENTEE") {
    next();
  } else {
    res.json(notMenteeError);
  }
}

export { isMentor, isMentee };
