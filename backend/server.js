import express from "express";
import cors from "cors";
import users from './api/routers.js'
const app = express();
import cookieParser from 'cookie-parser';

// Middleware
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", users);

export default app