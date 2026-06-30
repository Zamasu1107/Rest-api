import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const movies = require('../../movies.json')

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

export class MovieModel {
    static async getAll ({ genre }: { genre:string }) {
        if(genre && typeof genre === 'string') {
        return movies.filter( (movie:Movie) => movie.genre.some((g:string) => g.toLowerCase() === genre.toLowerCase()))
    }
    return movies;
    }

    static async getById ({ id }: { id: string }) {
        const movie = movies.find((movie:Movie) => movie.id === id)
        return movie
    }

    static async create (input:any) {
       const newMovie = {
        id: crypto.randomUUID(),
        ...input
    }

    movies.push(newMovie); 
    return newMovie
    }

    static async delete ({ id }: { id: string }) {
        const movieIndex = movies.findIndex((movie:Movie) => movie.id === id)

        if (movieIndex === -1) return false 

        movies.splice(movieIndex, 1)
        return true
    }

    static async update ({ id, input }: { id: string, input?:any }) {
        const movieIndex = movies.findIndex((movie:Movie) => movie.id === id)

        if(movieIndex === -1) return false

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }

        return movies[movieIndex];
    }
}

