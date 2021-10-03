
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { taskRoute } from './routes/task';
import { scopeRoute } from './routes/scope';
import { fileRouter } from './routes/file';
import { commentRoute } from './routes/comment';

mongoose.connect('mongodb+srv://dbUser:dbUserPassword@vladislav.vmod9.mongodb.net/disertationDatabase?retryWrites=true&w=majority')
.then(() => console.log('DB Connected!'))
.catch((err) => console.log(`DB Connection Error: ${err.message}`));

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', taskRoute);
app.use('/', scopeRoute);
app.use('/', fileRouter);
app.use('/', commentRoute);

app.listen(8080);