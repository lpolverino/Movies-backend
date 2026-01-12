-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "lenguage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "published_date" TEXT NOT NULL,
    "distributor" TEXT NOT NULL,
    "director" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoviesCategories" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MoviesCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTheaterType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number_of_seats" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "MovieTheaterType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTheater" (
    "id" SERIAL NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "movie_theater_typeId" INTEGER NOT NULL,

    CONSTRAINT "MovieTheater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screening" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "movie_theaterId" INTEGER NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "screeningId" INTEGER NOT NULL,
    "buyers_name" TEXT NOT NULL,
    "base_price" INTEGER NOT NULL,
    "movie_discount" INTEGER NOT NULL,
    "parcial_price" INTEGER NOT NULL,
    "final_price" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotions" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountDays" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "DiscountDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Days" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Days_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoviesCategories" ADD CONSTRAINT "MoviesCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesCategories" ADD CONSTRAINT "MoviesCategories_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTheater" ADD CONSTRAINT "MovieTheater_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTheater" ADD CONSTRAINT "MovieTheater_movie_theater_typeId_fkey" FOREIGN KEY ("movie_theater_typeId") REFERENCES "MovieTheaterType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_movie_theaterId_fkey" FOREIGN KEY ("movie_theaterId") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountDays" ADD CONSTRAINT "DiscountDays_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountDays" ADD CONSTRAINT "DiscountDays_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
