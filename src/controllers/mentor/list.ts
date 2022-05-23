import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { serverError } from "@errors/system";
import { successWithData } from "@success/success";
import { isBranch } from "@typeguards/mentor";
import { invalidBranchError } from "@errors/mentor";

async function listAllMentors(req: Request, res: Response) {
  try {
    const { branch } = req.query;

    if (isBranch(branch) || typeof branch === "undefined") {
      // If branch query is added, then will filter our the MENTORS with given branch
      const mentors = await prisma.user.findMany({
        where: { role: "MENTOR", ...(branch && { branch }) },
      });
      return res.json(successWithData(mentors));
    } else {
      // If branch query is not of BranchEnum
      return res.json(invalidBranchError);
    }
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { listAllMentors };
