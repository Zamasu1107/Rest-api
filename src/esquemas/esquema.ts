const zod = require('zod');

const blueprintMovie = zod.object({
        title: zod.string({
            required_error: 'Es requerido un titulo'
        }),
        year: zod.number().int().positive().min(1900).max(2026), 
        director: zod.string(), 
        duration: zod.number().int().positive(), 
        poster: zod.string().url(), 
        genre: zod.array(zod.enum(['Action', 'Horror', 'Sci-fi','Comedy', 'Drama', 'Romance', 'Adventure', 'Thriller', 'Fantasy', 'Animation'])),
        rate: zod.number().positive().min(0).max(10).optional()
    })

    function validarMovie(object:any) {
    return blueprintMovie.safeParse(object);
}

function cambiarMovie(object:any) {
    return blueprintMovie.partial().safeParse(object)
}

module.exports = {
    validarMovie,
    cambiarMovie
}