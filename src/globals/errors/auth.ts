import { error } from "@errors/error";

const userExists = error("User already exists.");
const improperEmail = error("Please enter a valid Email ID.");
const insecurePassword = error(
  "Please enter a secure password with atleast 1 number, 1 capital character and 1 special character. "
);
const userNotLoggedIn = error("User not logged in.");
const userAlreadyLoggedIn = error("User already logged in.");

export {
  userExists,
  improperEmail,
  insecurePassword,
  userNotLoggedIn,
  userAlreadyLoggedIn,
};
