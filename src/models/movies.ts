import {prisma} from '../db/client.js'

async function getMoviesBillboard(){
    const movies = await prisma.movie.findMany({
        select:{
            title:true
        }
    });

    return movies
}

export default {
    getMoviesBillboard
}