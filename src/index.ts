import 'module-alias/register';

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/mongodb";
import cookieParser from 'cookie-parser';
import authRoutes from '@/routes/auth.routes';
import elevateRoutes from "@/routes/elevate.routes";
import utilityRouter from '@/routes/utility.routes';

import cors from "cors"
import { hostname } from 'os';
// import './types/express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('base', '/api');

app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use('/auth', authRoutes);
app.use('/elevate', elevateRoutes)
app.use('/utility', utilityRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

dbConnection()

app.listen({port, hostname: "http://0.0.0.0"}, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;