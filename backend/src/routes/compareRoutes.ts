import { Router } from "express";
import { compareColleges } from "../controllers/compareController";

const router = Router();

router.post("/", compareColleges);

export { router as compareRoutes };
