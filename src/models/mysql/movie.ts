import mysql, { RowDataPacket } from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3307, 
    password: 'Zamasu1107',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config);

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
    static async getAll ({ genre }: { genre?: any }) {
        
        if(genre) {
           const lowerCaseGenre = genre.toLowerCase() 

        const [genres] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, genre.name AS genre
             FROM movie JOIN movie_genre ON id = movie_genre.movie_id INNER JOIN genre ON movie_genre.genre_id = genre.id 
             WHERE genre.name = LOWER(?);`, [lowerCaseGenre]
        )

        return genres;
    }
        
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie;'
        )

        return movies;
    }

    static async getById ({ id }: { id?: any }) {
        const [movies] = await connection.query<Movie[] & RowDataPacket[]>(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie WHERE id = UUID_TO_BIN(?);', [id]
        )

        if(movies.length === 0) return null;

        return movies[0];
    }

    static async create (input:any) {
       
    }

    static async delete ({ id }: { id?: any }) {
       
    }

    static async update ({ id, input }: { id?: any, input?:any }) {
       
    }
}