import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv'
import { router } from './router/index.js'

const database = mongoose.connection
const app = express();
const port = 3000;

dotenv.config()
mongoose.connect(process.env.DATABASE_URL);

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(express.json());
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})