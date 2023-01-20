import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const database = mongoose.connection

mongoose.connect(process.env.DATABASE_URL);

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
