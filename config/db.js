// MongoDB Configuration :-
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Read the connection string from an enviornment variable :-
        const dbURI = process.env.MONGODB_URI;
        
        // Connect to MongoDB
        await mongoose.connect(dbURI, {
            useNewUrlParser :  true,
            useUnifiedTopology : true,
        });
        
        console.log('MongoDB Connected Successfully.');
    } catch (error) {
        console.error('Mongo Connection Failed :-', error.message);
        // Exit with failure code :-
        process.exit(1);
    }
};

module.exports = connectDB;