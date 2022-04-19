import { serverError } from "@errors/system";
import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { signUpBody } from "@interfaces/auth";
import { defaultProfilePic } from "@utils/img";
import { generateOtp } from "@utils/otp";
import { userCreated } from "@success/auth";
import { improperEmail, insecurePassword, userExists } from "@errors/auth";

async function signup(req: Request, res: Response) {
  try {
    const { name, scholarId, email, password, dob, branch } =
      req.body as signUpBody;

    if ((await prisma.user.count({ where: { email } })) !== 0) {
      return res.json(userExists);
    }

    // For emails of the form abcde@fgh.ij.kl
    const emailValidation = /[0-9A-Za-z._]+@[A-Za-z]{2,}(\.[0-9A-Za-z]{2,})+/;

    if (!emailValidation.test(email)) {
      return res.json(improperEmail);
    }

    //Lookahead for 1 digit, 1 special character and 1 capital character.
    const passwordValidation =
      /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=[\]\\|<>,.?/:;"'])[A-Za-z0-9!@#$%^&*()_+\-=[\]\\|<>,.?/:;"']{8,20}/;

    if (!passwordValidation.test(password)) {
      return res.json(insecurePassword);
    }

    const { expiry, value } = await generateOtp(req);
    await prisma.user.create({
      data: {
        name,
        scholarId,
        email,
        password,
        dob,
        img: defaultProfilePic(name),
        branch,
        otpValue: value!,
        otpExpiry: expiry,
        role: "MENTEE",
      },
    });

    return res.json(userCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { signup };
