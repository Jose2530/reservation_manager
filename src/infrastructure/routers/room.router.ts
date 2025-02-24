import express from 'express';
import CONFIG from '../../config';
import { RoomController } from '../controllers/rooms.Controller';

const RoomRoute = express.Router();

RoomRoute.post(
	`${CONFIG.PATHS.OPERATIONS.RoomsCreate}`,
	RoomController.createRoom
);

RoomRoute.get(
	`${CONFIG.PATHS.OPERATIONS.RoomsList}`,
	RoomController.listRoom
);
export { RoomRoute };
