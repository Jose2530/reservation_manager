import { Request, Response } from 'express';
import { Room } from "../../domain/models/room.Model";
import db from '../../application/config/dynamoDB';



export class RoomController{

    public static async createRoom(req: Request, res: Response): Promise<void> {
        const { name, capacity } = req.body;
        const tableRoom = "room"
        const room: Room = {
            name,
            capacity
        };
        
        try {
            const result = await db.createItem(room, tableRoom);

            if (result.success) {
                res.status(200).json({ message: 'Sala registrada correctamente' });
            } else {
                res.status(500).json({ error: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ error: 'Error al registrar la sala', details: error.message });
        }
    }

    public static async listRoom(req: Request, res: Response): Promise<void> {
        const tableRoom = "room"
        try {
            const result = await db.getAllItems(tableRoom);
                res.status(200).json({ room: result.data });
        } catch (error: any) {
            res.status(500).json({ error: 'Error al listar reservas', details: error.message });
        }
    }
}