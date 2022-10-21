import express, { Request, Response, Router, Express } from 'express';
import path from 'path';
import cors from 'cors';
import router from './route';
import db from "./mongoDb";
import 'dotenv';
import { RequestHandler } from 'express-serve-static-core';
import { terminal } from './services/terminal';
import { User } from './models';

const app: Express = express();

db.connect();

app.use(cors());
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);

const port: number = Number(process.env.EXPRESS_PORT) || 3020;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req: Request, res: Response) => {
  terminal('sending index.html');
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.post('/api/check', (req, res) => {
  const { username } = req.body;
  User.find({ username: username})
  .then(response => {
    console.log(response);
    if (response[0]) res.status(200).json(true);
    else res.status(200).json(false);
  });
});

const routes: Router[] = Object.values(router);
app.use('/api', routes);



app.listen(port);
console.log(`VaaS is awake on port: ${port}`);
