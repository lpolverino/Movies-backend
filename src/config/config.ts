import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port:number;
    nodeEnv: string;
    db:string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    db: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5332/movies?schema=public"
}

export default config;