import { Branch } from "@prisma/client";

interface signUpBody {
  name: string;
  scholarId: number;
  email: string;
  password: string;
  dob: string;
  branch: Branch;
}

export { signUpBody };
