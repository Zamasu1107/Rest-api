import { validarMovie, cambiarMovie } from "../esquemas/esquema.js";
import type { Request, Response } from 'express';

export class MovieController {
    private movieModel:any
    constructor ({ movieModel }: { movieModel: any }) {
        this.movieModel = movieModel
    }
    getAll = async (req:Request, res:Response) => {
        const { genre } = req.query;
            const movies = await this.movieModel.getAll({ genre })
            res.json(movies);
    }

    getById = async (req:Request, res:Response) => {
        const { id } = req.params;
            if(typeof id === 'string') {
            const movie:any = await this.movieModel.getById({ id })
            if (movie) return res.json(movie)

            res.status(404).json({ message: 'Movie not found' })
        }
    }

    create = async (req:Request, res:Response) => {
        const result = validarMovie(req.body);
        if(result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }
        
        const newMovie = await this.movieModel.create({input: result.data})
        res.status(201).json(newMovie);
    }

    delete = async (req:Request, res:Response) => {
        const { id } = req.params;

        if(typeof id === 'string') {
        const result:boolean = await this.movieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'OK' }); 
    }

    }

    update = async (req:Request, res:Response) => {
        
        const result = cambiarMovie(req.body)
    
        if(result.error) return res.status(400).json({ error: JSON.parse(result.error.message)})
        
        const { id } = req.params

        if(typeof id === 'string') {
    
        const updatedMovie = await this.movieModel.update({id, input: result.data})
    
        return res.json(updatedMovie);
        }
    }
}