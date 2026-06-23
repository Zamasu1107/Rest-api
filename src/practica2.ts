import console = require("node:console");
import type { Request, Response } from 'express';
const express = require('express');
const crypto = require('node:crypto');
const movies = require('../movies.json');
const { validarMovie, cambiarMovie } = require('./esquemas/esquema')

const app = express();
app.use(express.json());
app.disable('x-powered-by');

interface Movie {
    id: string | number;
    title: string;
    year: number;
    director: string;
    duration: number;
    poster:  string;
    genre:  string[];
    rate?: number
}

app.get('/', (req:Request, res:Response) => {
    res.send('<h1>Hola Amo Andrik como van sus practicas?</h1>');
})

app.get('/movies', (req:Request, res:Response) => {
    const { genre } = req.query;
    
    if(genre && typeof genre === 'string') {
        const filterMovie = movies.filter( (movie:Movie) => movie.genre.some((g:string) => g.toLowerCase() === genre.toLowerCase()))
        return res.json(filterMovie);
    }
    res.json(movies);
})

app.get('/movies/:id', (req:Request, res:Response) => {
    const { id } = req.params;
    const movie = movies.find((movie:Movie) => movie.id === id)
    if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
});

app.post('/movies', (req:Request, res:Response) => {

    const result = validarMovie(req.body);

    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req:Request, res:Response) => {
    
    const result = cambiarMovie(req.body)

    if(result.error) return res.status(400).json({ error: JSON.parse(result.error.message)})
    const { id } = req.params
    const movieIndex = movies.findIndex((movie:Movie) => movie.id === id)

    if(movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

    const actualizarMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = actualizarMovie;

    return res.json(actualizarMovie)
})

const PORT = Number(process.env.PORT) || 2712;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});


