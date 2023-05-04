// Import the express in typescript file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes/routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize the express engine
const app: express.Application = express();

const port = 8000;

const dbUrl = 'mongodb+srv://pkaufhol:10002000@walker.63wphpg.mongodb.net/test' //should be 'mongodb+srv://pkaufhol:<9oFW9kKmDwsz6Fff>@walker.63wphpg.mongodb.net/test'

mongoose
  .connect(dbUrl, { autoIndex: false })
  .catch(e => {
    console.error('Connection error', e.message)
  });
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// Handling '/' Request
app.get('/', (_req, _res) => {
  _res.send("TypeScript with Express");
});


// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000', 'https://cmu-17-356.github.io'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json())
app.use('/api', router)

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});