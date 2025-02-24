import express from 'express';
import CONFIG from '../../config';
import { MoviesController } from '../controllers/movies.Controller';

const MoviesRoute = express.Router();

MoviesRoute.post(
	`${CONFIG.PATHS.OPERATIONS.MovieCreate}`,
	MoviesController.createMovie
);
MoviesRoute.get(
	`${CONFIG.PATHS.OPERATIONS.MovieList}`,
	MoviesController.listMovie
);

export { MoviesRoute };
