import {prisma} from '../db/client.js'

async function getCinamas() {
    const cinemas = await prisma.cinema.findMany({});
    return cinemas;
}

export default {
    getCinamas
}