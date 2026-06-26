import cors from 'cors';

const ACCEPTED_ORIGINS = [
            'http://localhost:2712',
            'http://localhost:1107'
        ]

export const corsMiddelware = ({ acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin:any, callback:any) => {
        
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
})