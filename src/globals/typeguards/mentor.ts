import { BRANCHES } from "@globals/constants";
import { Branch } from "@prisma/client";

/**
 *
 * @param branch The value you want to check if is of type `Branch`
 * @returns `true` if the given `branch` is of type `Branch` else `false`
 */
const isBranch = (branch: any): branch is Branch => {
  return BRANCHES.some((br) => br === branch);
};

export { isBranch };
