import console from "node:console";
import type { Request, Response } from 'express';
import express from 'express';
import { moviesRouter } from "./routes/movies.js";
import { corsMiddelware } from "./middlewares/cors.js";

const app = express();
app.use(express.json());
app.use(corsMiddelware());
app.disable('x-powered-by');

app.get('/', (req:Request, res:Response) => {
    res.send('<h1>Hola Amo Andrik como van sus practicas?</h1>');
})

app.use('/movies', moviesRouter)

const PORT = Number(process.env.PORT) || 2712; //https://rest-api-xi33.onrender.com/

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});