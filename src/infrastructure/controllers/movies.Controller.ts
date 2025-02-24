import { Request, Response } from 'express';
import db from '../../application/config/dynamoDB';
import { Movie } from '../../domain/models/movies.Model';

export class MoviesController {

    public static async createMovie(req: Request, res: Response): Promise<void> {
        const {title, gender, duration, clasification, description } = req.body;
		const tableMovie = "movie"
        const movie: Movie = {
            id:  new Date().getTime(),
			title,
			gender,
			duration,
			clasification,
            description
		};

        try {
            const result = await db.createItem( movie, tableMovie);

            if (result.success) {
                res.status(200).json({ message: 'Película registrada correctamente' });
            } else {
                res.status(500).json({ error: result.message });
            }
        } catch (error: any) {
            res.status(500).json({ error: 'Error al registrar la película', details: error.message });
        }
    }

	public static async listMovie(req: Request, res: Response): Promise<void> {
        const tableMovie = "movie";
        try {
            const result = await db.getAllItems(tableMovie);
                res.status(200).json({ movies: result.data });
        } catch (error: any) {
            res.status(500).json({ error: 'Error al listar las películas', details: error.message });
        }
    }
}