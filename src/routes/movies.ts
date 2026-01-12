import { Router } from "express";
import {asyncHandler } from "../middleware/asyncHandler.js";
import movieController from '../controllers/movieController.js'

const router = Router();

router.get("/", asyncHandler(movieController.getMovieBillboard));

export default router