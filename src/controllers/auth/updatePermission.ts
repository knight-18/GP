import {
  incorrectPermissionLevel,
  unauthorized,
  userNotFound,
} from "@errors/auth";
import { serverError } from "@errors/system";
import { User } from "@prisma/client";
import { prisma } from "@utils/prisma";
import { permissionLevel } from "@utils/permissionLevel";
import { Request, Response } from "express";
import { permissionLevelUpdated } from "@success/auth";
import { ROLES } from "@globals/constants";
import { elevatePermissions } from "@interfaces/auth";

async function updatePermission(req: Request, res: Response) {
  try {
    const { email, newLevel } = req.body as elevatePermissions;

    const { role: granterRole } = req.user as User;

    // Check new permission level
    if (permissionLevel(newLevel) === -1) {
      return res.json(incorrectPermissionLevel);
    }

    // Check if such level is high enough
    if (
      permissionLevel(granterRole) !== ROLES.length - 1 &&
      permissionLevel(newLevel) >= permissionLevel(granterRole)
    ) {
      return res.json(unauthorized);
    }

    // Check user
    if ((await prisma.user.count({ where: { email } })) === 0) {
      return res.json(userNotFound);
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: newLevel,
      },
    });

    return res.json(permissionLevelUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updatePermission };
