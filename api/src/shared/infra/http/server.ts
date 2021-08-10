import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import uploadConfig from '@config/upload';

import '../typeorm';
import '../../container/';
import routes from './routes';
import { resolveError } from './middlewares/resolverErrors';
import rateLimite from './middlewares/rateLimiter';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(rateLimite);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(resolveError);

app.listen(3333, () => {
  console.log('Server online on port 3333!');
});
