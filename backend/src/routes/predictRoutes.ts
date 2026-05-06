import { Router } from "express";
import { predictColleges } from "../controllers/predictController";

const router = Router();

router.post("/", predictColleges);

export { router as predictRoutes };
