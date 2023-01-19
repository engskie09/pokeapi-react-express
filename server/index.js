const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const routes = require('./routes');

mongoose.connect(process.env.DATABASE_URL);

const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})