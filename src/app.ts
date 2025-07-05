import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes/router';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import { errorMiddleware } from './middleware/error.middleware';

const app: Express = express();
const port = process.env.PORT || 5000;

config();

app.use(cors());
app.use(express.json());
app.use(morgan('short'));
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome');
});

app.use(errorMiddleware);

export default app;
