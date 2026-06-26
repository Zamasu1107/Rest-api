import zod from 'zod';

const blueprintMovie = zod.object({
        title: zod.string(),
        year: zod.number().int().positive().min(1900).max(2026), 
        director: zod.string(), 
        duration: zod.number().int().positive(), 
        poster: zod.string().url(), 
        genre: zod.array(zod.enum(['Action', 'Horror', 'Sci-fi','Comedy', 'Drama', 'Romance', 'Adventure', 'Thriller', 'Fantasy', 'Animation'])),
        rate: zod.number().positive().min(0).max(10).optional()
    })

    export function validarMovie(object:any) {
    return blueprintMovie.safeParse(object);
}

export function cambiarMovie(object:any) {
    return blueprintMovie.partial().safeParse(object)
}