import { validarMovie, cambiarMovie } from "../esquemas/esquema.js";
import { MovieModel } from "../models/mysql/movie.js";
import type { Request, Response } from 'express';

export class MovieController {
    static async getAll (req:Request, res:Response) {
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre })
        res.json(movies);
    }

    static async getById (req:Request, res:Response) {
        const { id } = req.params;
        const movie:any = await MovieModel.getById({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
    }

    static async create (req:Request, res:Response) {
        const result = validarMovie(req.body);
        if(result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }
        
        const newMovie = await MovieModel.create({input: result.data})
        res.status(201).json(newMovie);
    }

    static async delete (req:Request, res:Response) {
        const { id } = req.params;

        const result:any = await MovieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.json({ message: 'Movie deleted' });
    }

    static async update (req:Request, res:Response) {
        
        const result = cambiarMovie(req.body)
    
        if(result.error) return res.status(400).json({ error: JSON.parse(result.error.message)})
        
        const { id } = req.params
    
        const updatedMovie = await MovieModel.update({id, input: result.data})
    
        return res.json(updatedMovie);
    }

}