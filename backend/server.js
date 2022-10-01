import express from "express";
import cors from "cors";
import users from './api/routers/routers.js'
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors({
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", users);

export default app