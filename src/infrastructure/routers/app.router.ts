import CONFIG from '../../config';
import { Router } from 'express';
import { MoviesRoute } from './movies.router';
import { RoomRoute } from './room.router';
import { ReservationRoute } from './reservation.router';

const AppRouter = Router();

[MoviesRoute, RoomRoute, ReservationRoute].forEach((route: Router) => AppRouter.use(CONFIG.CONTEXT, route));

export { AppRouter };
