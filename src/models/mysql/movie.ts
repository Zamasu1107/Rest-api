import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3307, 
    password: 'Zamasu1107',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config);

interface Movie {
    id?: string | number;
    title: string;
    year: number;
    director: string;
    duration: number;
    poster:  string;
    genre:  string[];
    rate?: number;
}

interface UUIDRow extends RowDataPacket {
  uuid: string;
}

export class MovieModel {
    static async getAll ({ genre }: { genre: any }) {
        
        if(genre) {
           const lowerCaseGenre = genre.toLowerCase() 

        const [genres] = await connection.query<RowDataPacket[]>(
            `SELECT title, year, director, duration, poster, rate, genre.name AS genre
             FROM movie JOIN movie_genre ON id = movie_genre.movie_id INNER JOIN genre ON movie_genre.genre_id = genre.id 
             WHERE genre.name = LOWER(?);`, [lowerCaseGenre]
        )

        if(genres.length === 0) return[]

        return genres;
    }
        
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie;'
        )

        return movies;
    }

    static async getById ({ id }: { id: string }) {
        const [movies] = await connection.query<Movie[] & RowDataPacket[]>(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie WHERE id = UUID_TO_BIN(?);', [id]
        )

        if(movies.length === 0) return null;

        return movies[0];
    }

    static async create ({ input }: { input: Movie }) {
       const {
        genre: genreInput,
        title,
        year,
        duration,
        director,
        poster,
        rate
       } = input

        const [uuidResult] = await connection.query<UUIDRow[]>(
            'SELECT UUID() AS uuid;'
        );

        const { uuid } = uuidResult[0]!;

       try {
        await connection.query(`INSERT INTO movie (id, title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`, [uuid, title, year, director, duration, poster, rate])
       } catch (error) {
        console.log(error)
       }
      
       const [movies] = await connection.query<RowDataPacket[]>(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`, [uuid])

        return movies[0];
    }

    static async delete ({ id }: { id: string}) {
        const [deleteMovie] = await connection.query<ResultSetHeader>(`DELETE FROM movie WHERE id = UUID_TO_BIN(?);`, [id])
        
        if (deleteMovie.affectedRows === 0) return false

        return deleteMovie.affectedRows > 0;
    }

    static async update ({ id, input }: { id: string, input?:any }) {
       const [movies] = await connection.query<ResultSetHeader>(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie WHERE id = UUID_TO_BIN(?);', [id]
        )

        
    }
}