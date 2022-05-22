import { Branch, Role } from "@prisma/client";

interface signUpBody {
  name: string;
  scholarId: number;
  email: string;
  password: string;
  dob: string;
  branch: Branch;
}

interface elevatePermissions {
  email: string;
  newLevel: Role;
}

export { signUpBody, elevatePermissions };
