import "@libs/models";

import process from "node:process";
import mongoose from 'mongoose';
import env from '@config/environment';

export const connect = async () => 
    new Promise((resolve) => {
        mongoose.connect(env.mongoUrl, {connectTimeoutMS: 10000})
        .then(() => {
            console.log('Connected to MongoDB');
            resolve(true)
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
            process.exit(1);
        });

        process.once('exit', () => {
            console.log('Closing MongoDB connection')
            mongoose.disconnect();
        })
    })
