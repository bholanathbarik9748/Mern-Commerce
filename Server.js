import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authroutes.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/v1/auth", authRoute);



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(process.env.PORT, (req, res) => {
        console.log(`Server Start PORT http://localhost:${process.env.PORT}/`);
    }))
    .catch((err) => console.log(err))
