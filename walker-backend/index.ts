// Import the express in typescript file
import express from 'express';

// Initialize the express engine
const app: express.Application = express();

// Take a port 8080 for running server.
const port = 8080;

// Handling '/' Request
app.get('/', (_req, _res) => {
  _res.send("Hello World");
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});