import express from 'express';
import { errorHandler } from './middleware/errorHandler.js'
import moviesRouter from './routes/movies.js'

const app = express();

app.use(express.json());       
app.use(express.urlencoded({ extended: true })); 

app.use("/api/movies/", moviesRouter);

app.use(errorHandler);

export default app;