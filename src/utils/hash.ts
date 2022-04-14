import bcrypt from "bcrypt";

/**
 *
 * @description Hashes the given text
 * using bcrypt

 * @returns The hashed text
 */
async function hash(text: string) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedText = await bcrypt.hash(text, salt);

    return hashedText;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { hash };
