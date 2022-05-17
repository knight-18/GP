import { serverError } from "@errors/system";
import { userNotFound } from "@errors/auth";
import { userVerified } from "@errors/otp";
import { otpBody } from "@interfaces/otp";
import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { generateOtp } from "@utils/otp";
import { otpGenerated } from "@success/otp";

async function newOtp(req: Request, res: Response) {
  try {
    const { email } = req.body as otpBody;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // Check For User
    if (!user) {
      return res.json(userNotFound);
    }

    // Check For User Verification Status
    if (user.verified) {
      return res.json(userVerified);
    }

    // New OTP
    const { expiry, value } = await generateOtp(req);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        otpValue: value,
        otpExpiry: expiry,
      },
    });

    return res.json(otpGenerated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { newOtp };
