import {prisma} from './client.js'
async function main() {
  /* =========================
     DAYS
  ========================= */
  const days = await prisma.days.createMany({
    data: [
      { name: "Monday" },
      { name: "Tuesday" },
      { name: "Wednesday" },
      { name: "Thursday" },
      { name: "Friday" },
      { name: "Saturday" },
      { name: "Sunday" },
    ],
  });

  /* =========================
     CATEGORIES
  ========================= */
  const action = await prisma.category.create({
    data: { category: "Action" },
  });

  const drama = await prisma.category.create({
    data: { category: "Drama" },
  });

  const sciFi = await prisma.category.create({
    data: { category: "Sci-Fi" },
  });

  /* =========================
     MOVIES
  ========================= */
  const dune = await prisma.movie.create({
    data: {
      title: "Dune Part One",
      lenguage: "English",
      description: "Epic sci-fi movie",
      duration: 155,
      published_date: "2021-10-22",
      distributor: "Warner Bros",
      director: "Denis Villeneuve",
      posterUrl: "https://example.com/dune.jpg",
      trailerUrl: "https://youtube.com/dune",
    },
  });

  const bladeRunner = await prisma.movie.create({
    data: {
      title: "Blade Runner 2049",
      lenguage: "English",
      description: "Cyberpunk sci-fi noir",
      duration: 164,
      published_date: "2017-10-06",
      distributor: "Sony",
      director: "Denis Villeneuve",
      posterUrl: "https://example.com/br2049.jpg",
      trailerUrl: "https://youtube.com/br2049",
    },
  });

  /* =========================
     MOVIES ↔ CATEGORIES
  ========================= */
  await prisma.moviesCategories.createMany({
    data: [
      { movieId: dune.id, categoryId: sciFi.id },
      { movieId: dune.id, categoryId: action.id },
      { movieId: bladeRunner.id, categoryId: sciFi.id },
      { movieId: bladeRunner.id, categoryId: drama.id },
    ],
  });

  /* =========================
     CINEMAS
  ========================= */
  const cinema = await prisma.cinema.create({
    data: {
      name: "Hoyts Abasto",
      address: "Av Corrientes 3247",
    },
  });

  /* =========================
     MOVIE THEATER TYPES
  ========================= */
  const type2D = await prisma.movieTheaterType.create({
    data: {
      name: "2D",
      number_of_seats: 120,
      price: 3000,
    },
  });

  const type3D = await prisma.movieTheaterType.create({
    data: {
      name: "3D",
      number_of_seats: 100,
      price: 4200,
    },
  });

  /* =========================
     MOVIE THEATERS
  ========================= */
  const theater1 = await prisma.movieTheater.create({
    data: {
      cinemaId: cinema.id,
      movie_theater_typeId: type2D.id,
    },
  });

  const theater2 = await prisma.movieTheater.create({
    data: {
      cinemaId: cinema.id,
      movie_theater_typeId: type3D.id,
    },
  });

  /* =========================
     SCREENINGS
  ========================= */
  const screening1 = await prisma.screening.create({
    data: {
      movieId: dune.id,
      movie_theaterId: theater1.id,
      hour: new Date("2026-01-15T20:00:00"),
    },
  });

  const screening2 = await prisma.screening.create({
    data: {
      movieId: bladeRunner.id,
      movie_theaterId: theater2.id,
      hour: new Date("2026-01-16T22:30:00"),
    },
  });

  /* =========================
     PROMOTIONS (CINE)
  ========================= */
  const promoFriday = await prisma.promotions.create({
    data: {
      discount: 40,
    },
  });

  const friday = await prisma.days.findFirst({
    where: { name: "Friday" },
  });

  if (friday) {
    await prisma.discountDays.create({
      data: {
        promotionId: promoFriday.id,
        dayId: friday.id,
      },
    });
  }

  /* =========================
     TICKETS
  ========================= */
  await prisma.ticket.create({
    data: {
      screeningId: screening1.id,
      buyers_name: "Juan Perez",
      base_price: 3000,
      movie_discount: 1200,
      parcial_price: 1800,
      final_price: 1800,
    },
  });

  await prisma.ticket.create({
    data: {
      screeningId: screening2.id,
      buyers_name: "Maria Gomez",
      base_price: 4200,
      movie_discount: 0,
      parcial_price: 4200,
      final_price: 4200,
    },
  });

  console.log("🌱 Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
