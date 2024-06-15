const mongoose = require('mongoose');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URI ;
module.exports = mongoose.connect(dbUrl, {})
    .then(() => {
        console.log('Connected to MongoDB');
        // connect to the database
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ', err);
    });

