import express from 'express';
import cors from 'cors';

import './utilities/database.js';

import { router } from './router/index.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})