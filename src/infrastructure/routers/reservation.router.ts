import express from 'express';
import CONFIG from '../../config';
import { ReservationController } from '../controllers/reservations.Controller';

const ReservationRoute = express.Router();

ReservationRoute.post(
	`${CONFIG.PATHS.OPERATIONS.ReservationsCreate
	}`,
	ReservationController.createReservation
);

ReservationRoute.get(
	`${CONFIG.PATHS.OPERATIONS.ReservationsList}`,
	ReservationController.listReservation
);

export { ReservationRoute };
