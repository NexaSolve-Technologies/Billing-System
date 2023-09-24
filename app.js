const express = require('express');
const connectDB = require('./config/db')
require('dotenv').config();

// Initialise the app.
const app = express();

// Connect to MongoDB :-
connectDB();

// Middleware :-
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})