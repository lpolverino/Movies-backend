import { Request, Response, NextFunction } from "express";
import moviesDB from '../models/movies.js';

async function getMovieBillboard(req:Request, res:Response, next:NextFunction) {
    const movies = await moviesDB.getMoviesBillboard();
    return res.json(movies)    
}

export default {
    getMovieBillboard
}