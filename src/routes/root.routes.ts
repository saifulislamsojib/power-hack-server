import express, { Request, Response } from 'express';

const rootRoute = express.Router();

rootRoute.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Power Hack Server Boss!');
});

export default rootRoute;
