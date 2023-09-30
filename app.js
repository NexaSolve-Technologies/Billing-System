const express = require('express');
const connectDB = require('./config/db')
const authRoutes = require('./routes/adminRoutes')
require('dotenv').config();

// Initialise the app.
const app = express();

// Connect to MongoDB :-
connectDB();

// Middleware :-
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/auth', authRoutes);

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})