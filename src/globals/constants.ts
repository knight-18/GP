import { Role } from "@prisma/client";

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; //30 Days
const OTP_AGE = 1000 * 60 * 5; // 5 mins
const ROOT = "/api/v1";
const FILE_UPLOAD_LIMIT = 1024 * 1024 * 5; // 5 MB

const ROLES: Role[] = ["MENTEE", "MENTOR", "MODERATOR", "OWNER"];

export { COOKIE_MAX_AGE, OTP_AGE, ROOT, FILE_UPLOAD_LIMIT, ROLES };
