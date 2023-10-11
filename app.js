const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes');
const packageRoutes = require('./routes/packageRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
require('dotenv').config();

// Initialise the app.
const app = express();

// Enable CORS middlewares :-
app.use(cors());

// Connect to MongoDB :-
connectDB();

// Middleware :-
app.use(express.json());
const port = process.env.PORT;

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/package', packageRoutes);
app.use('/checkout', checkoutRoutes)

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})