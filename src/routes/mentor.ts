import { Router } from "express";
import { isLoggedIn } from "@middlewares/auth";
import { listAllMentors } from "@controllers/mentor";
import { isMentee } from "@middlewares/role";

const router = Router({ mergeParams: true });

router.get("/all", isLoggedIn, isMentee, listAllMentors);

export default router;
