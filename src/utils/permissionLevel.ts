import { Role } from "@prisma/client";
import { ROLES } from "@globals/constants";

function permissionLevel(level: Role) {
  return ROLES.indexOf(level);
}

export { permissionLevel };
