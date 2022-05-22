import { Router } from "express";
import { isLoggedIn } from "@middlewares/auth";
import { listAllMentors } from "@controllers/mentor";

const router = Router({ mergeParams: true });

router.get("/all", isLoggedIn, listAllMentors);

export default router;
