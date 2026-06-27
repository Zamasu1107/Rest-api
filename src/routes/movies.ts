import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
import { MovieModel } from "../models/mysql/movie.js";

export const createMovieRouter = ({ movieModel }: {movieModel:MovieModel}) => {
    const moviesRouter = Router();

    const movieController = new MovieController({ movieModel })

    moviesRouter.get('/', movieController.getAll);

    moviesRouter.get('/:id', movieController.getById);

    moviesRouter.post('/', movieController.create)

    moviesRouter.patch('/:id', movieController.update)

    moviesRouter.delete('/:id', movieController.delete)

    return moviesRouter
}


