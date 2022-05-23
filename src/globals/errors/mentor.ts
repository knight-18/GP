import { error } from "@errors/error";

const invalidBranchError = error("Branch query is invalid");
const notMentorError = error("You must be a MENTOR for this.");
const notMenteeError = error("You must be a MENTEE for this.");

export { invalidBranchError, notMenteeError, notMentorError };
