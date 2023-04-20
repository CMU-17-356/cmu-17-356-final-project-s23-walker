// Import the express in typescript file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes/routes.js';
// Initialize the express engine
var app = express();
var port = 8000;
var dbUrl = ''; //should be 'mongodb+srv://pkaufhol:<9oFW9kKmDwsz6Fff>@walker.63wphpg.mongodb.net/test'
mongoose
    .connect(dbUrl)
    .catch(function (e) {
    console.error('Connection error', e.message);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Handling '/' Request
app.get('/', function (_req, _res) {
    _res.send("TypeScript with Express");
});
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
var allowedOrigins = ['http://localhost:8000', 'https://cmu-17-356.github.io/cmu-17-356-final-project-s23-walker/'];
var options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use('/api', router);
// Server setup
app.listen(port, function () {
    console.log("TypeScript with Express\n         http://localhost:".concat(port, "/"));
});
