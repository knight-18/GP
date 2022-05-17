import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "@utils/prisma";
import { User } from "@prisma/client";

/**
 * @description Initializes passport for
 * authentication.
 */
function initializePassport() {
  // User sign-in
  passport.use(
    new LocalStrategy(
      {
        // Changing default username-password form field
        // values of passport
        usernameField: "identifier",
        passwordField: "password",
        session: true,
      },
      async (identifier, password, done) => {
        const scholarId = parseInt(identifier);

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: identifier,
              },
              {
                scholarId: scholarId ? scholarId : 0,
              },
            ],
          },
        });

        // User Not Found
        if (!user) {
          return done("User not found", false);
        }

        // Wrong Password
        if (!(await bcrypt.compare(password, user.password))) {
          console.log(user.password);
          return done("Wrong Password", false);
        }

        // User Not Verified
        if (!user.verified) {
          return done("User not verified", false);
        }

        // Successful Login
        return done(null, user);
      }
    )
  );

  // Sets the cookie
  passport.serializeUser((user, done) => {
    done(null, (user as User).email);
  });

  // Reads the cookie and sets `req.user`
  passport.deserializeUser(async (data, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: { email: data as string },
      });

      done(null, user);
    } catch (err) {
      done("User Not Found", false);
    }
  });
}

export { initializePassport };
