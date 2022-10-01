import express from "express";
import cors from "cors";
import users from './api/routers/routers.js'
import cookieParser from 'cookie-parser';

const app = express();

const whitelist = ['https://cerulean-seahorse-e3d88d.netlify.app', 'http://localhost:3000'];

// Middleware
app.use(cors({
    credentials: true,
    origin: whitelist
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", users);

export default app