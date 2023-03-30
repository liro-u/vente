import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

// routes
import wallpaperRoutes from './routes/wallpaperRoutes.js'
import userRoutes from './routes/userRoutes.js'
import debugRoutes from './routes/debugRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import marketRoutes from './routes/marketRoutes.js'

// express app
const app = express();

// middleware
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/wallpapers', wallpaperRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes)
app.use('/api/debug', debugRoutes);
app.use('/api/market/', marketRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port ', process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });