import { Router } from "express";
import {asyncHandler } from "../middleware/asyncHandler.js";
import movieController from '../controllers/movieController.js'

const router = Router();

router.get("/", asyncHandler(movieController.getMovieBillboard));
router.get("/:id", asyncHandler(movieController.getMovie))
router.get("/:movieId/cinemas/:cinemaId/functions", asyncHandler(movieController.getMovieFunctions))

export default router