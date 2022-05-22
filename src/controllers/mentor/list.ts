import { Request, Response } from "express";
import { prisma } from "@utils/prisma";

async function listAllMentors(_: Request, res: Response) {
  //! NOT COMPLETED
  const mentors = await prisma.user.findMany({ where: { role: "MENTOR" } });
  res.json(mentors);
}

export { listAllMentors };
