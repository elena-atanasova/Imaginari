// starting point of the application

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// setting up the body parser, sending images
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30nm", extended: true }));
app.use(cors());

// use middleware to connect the postRoutes with our application
app.use('/posts', postRoutes);  // every route inside that will start with posts: check in http://localhost:5000/posts
app.use('/user', userRoutes);

// connect the server application with a database - MongoDB Atlas
// meaning hosting the database on their cloud
// https://www.mongodb.com/cloud/atlas

//const CONNECTION_URL = 'mongodb+srv://imaginari:imaginari123@cluster0.mm7zfs4.mongodb.net/?retryWrites=true&w=majority'; 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false); 