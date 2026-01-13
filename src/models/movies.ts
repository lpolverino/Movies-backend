import {prisma} from '../db/client.js'

async function getMoviesBillboard(){
    const movies = await prisma.movie.findMany({
        select:{
            id:true,
            title:true
        }
    });

    return movies
}

async function getMovie(id:number){
    const movie = await prisma.movie.findFirst({
        where:{
            id
        }
    })
    return movie
}

async function getMovieScreening(movieId:number, cinemaId:number) {

    const movieTheaters = await prisma.movieTheater.findMany({
        select:{
            id:true,
            movie_theater_type:{
                select:{
                    number_of_seats:true
                }
            }
        },
        where:{
            cinemaId
        }
    })

    const moviesTHeatersIds = movieTheaters.map(movieTheater => movieTheater.id)

    const screenings = await prisma.screening.findMany({
            where:{
                movieId:movieId,
                movie_theaterId:{
                    in:moviesTHeatersIds
                }
            }
    });

    const screeningTickets:any = []

    await Promise.all(screenings.map(async (screening) => {
        const ticketsForScreening = await prisma.ticket.findMany({
            where:{
                screeningId:screening.id
            }
        })

        const movieTheateForScreening = movieTheaters.filter(movieTheater => movieTheater.id = screening.movie_theaterId)[0]

        screeningTickets.push({
            ...screening, 
            available_tickets: movieTheateForScreening.movie_theater_type.number_of_seats - ticketsForScreening.length
        })
    }))

    return screeningTickets
}

export default {
    getMoviesBillboard,
    getMovie,
    getMovieScreening
}