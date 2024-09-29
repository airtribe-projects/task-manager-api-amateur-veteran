import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import tasksRouter from './routes/tasks_router'; // is there a better way instead of relative path?

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // is this to parse query params?
app.use('/tasks', tasksRouter);

app.listen(port, (err?: Error) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app; // test is a js module. supporting that.
