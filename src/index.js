const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const upload = require('./controllers/imageUpload');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const loginRoutes = require('./routes/loginRoutes');
const authorized = require('./midelware/authorized')
const examRoutes = require('./routes/examRoutes');
const degreeRoutes = require('./routes/degreeRoutes'); 


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload);

app.use(cors({
    origin:  ['http://localhost:3000', 'http://localhost:3001'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));


//routes 
app.use("/api",loginRoutes);
app.use(authorized)
app.use("/api",studentRoutes);
app.use("/api",subjectRoutes);
app.use("/api",examRoutes);
app.use("/api",degreeRoutes);

app.use((request, response) => {
    response.status(404).json({ data: "Not Found" });
});

app.use((error, request, response, next) => {
    response.status(500).json({ data: `Error MW ${error}` });
});

const PORT = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URI ;
mongoose.connect(dbUrl, {})
    .then(() => {
        console.log('Connected to MongoDB');
        // connect to the database
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ', err);
    });