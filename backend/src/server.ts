import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from "cors";

import { Paths } from "@src/libs/constants";
import BaseRouter from '@src/libs/modules/route/api-router';

import { errorHandlerMiddleware } from './middlewares';
import { ENV } from './libs/modules/config/env/env';

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default frontend
    credentials: true,
  })
);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (ENV.NODE_ENV === "development") {
  app.use(morgan('dev'));
}

// Security
if (ENV.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths._, BaseRouter);

// Add error handler
app.use(errorHandlerMiddleware);


export default app;
