import { Request, Response } from 'express';
import db from '../../application/config/dynamoDB';
import { Reservation } from '../../domain/models/reservation.Model';
import sendEmail from '../../application/services/emailService';

export class ReservationController {

    private static async handleEmailNotification(emailAddres: string, movie: string, room: string, schedule: string, selectedSeats:[]): Promise<{ success: boolean, message: string }> {
        return await sendEmail(
            emailAddres,
            'Nueva Reserva Creada',
            `Se ha creado una nueva reserva para la película ${movie} en la sala ${room} a las ${schedule}.
             tus Asientos Son ${selectedSeats}`
        );
    }

    private static handleResponse(res: Response, result: any, emailResult: any): void {
        if (!result.success) {
            res.status(500).json({ error: result.message });
            return;
        }

        const message = emailResult.success
            ? 'Reserva creada y notificación enviada correctamente'
            : 'Reserva creada, pero hubo un error al enviar la notificación';

        const response = emailResult.success
            ? { message }
            : { message, emailError: emailResult.message };

        res.status(201).json(response);
    }

    public static async createReservation(req: Request, res: Response): Promise<void> {
        const { movie, room, emailAddres, schedule, selectedSeats} = req.body;
        const tableReservation = "reservation";
        const reservation: Reservation = {
            idReservation: new Date().getTime(),
            movie,
            room,
            schedule,
            emailAddres,
            selectedSeats,

        };

        try {
            const result = await db.createItem(reservation, tableReservation);
            const emailResult = await ReservationController.handleEmailNotification(emailAddres, movie, room, schedule, selectedSeats);
            ReservationController.handleResponse(res, result, emailResult);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al registrar la reserva', details: error.message });
        }
    }
    public static async listReservation(req: Request, res: Response): Promise<void> {
        const tableReservation = "reservation"
        try {
            const result = await db.getAllItems(tableReservation);
            res.status(200).json({ reservations: result.data });
        } catch (error: any) {
            res.status(500).json({ error: 'Error al listar reservas', details: error.message });
        }
    }
}
