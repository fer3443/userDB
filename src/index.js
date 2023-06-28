import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './database/database';
import routerUser from './routes/user.routes';
import routerTask from './routes/task.routes';

dotenv.config();

const app = express();

app.set('PORT', process.env.PORT || 5000);

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use('/api', routerUser);
app.use('/api', routerTask);

ConnectDB();

app.listen(app.get('PORT'), () => {
    console.log(`Servidor ejecutandose en puerto ${app.get('PORT')}`)
})