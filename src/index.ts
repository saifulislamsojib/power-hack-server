import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongoConnect from './db/db';
import apiRoutes from './routes/api.routes';
import rootRoute from './routes/root.routes';
import { app, server } from './utils/createServer';

// env config
env.config();

// server port
const port = process.env.PORT || 5000;

// app middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// database connection with mongoose
mongoConnect();

// all routes
app.use('/', rootRoute);
app.use('/api', apiRoutes);

// listen server
server.listen(port, () => {
    console.log(`Hello Boss! I am listening at http://localhost:${port}`);
});
