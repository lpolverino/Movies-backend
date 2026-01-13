import { Request, Response, NextFunction } from "express";
import moviesDB from '../models/movies.js';

async function getMovieBillboard(req:Request, res:Response, next:NextFunction) {
    const movies = await moviesDB.getMoviesBillboard();
    return res.json(movies)    
}

async function getMovie(req:Request, res:Response, next:NextFunction){
    const id = req.params.id as string;
    const movie = await moviesDB.getMovie(parseInt(id,10));
    if(movie == null){
        res.status(404)
    }
    return res.json(movie);
}

async function getMovieFunctions(req:Request, res:Response, next:NextFunction) {

    console.log("here");
    
    const movieId = parseInt(req.params.movieId as string, 10);
    const cinemaId = parseInt(req.params.cinemaId as string, 10);

    const screenings = await moviesDB.getMovieScreening(movieId, cinemaId);

    if(screenings == null)
        return res.status(404);
    
    return res.json(screenings);
}

export default {
    getMovieBillboard,
    getMovie,
    getMovieFunctions
}