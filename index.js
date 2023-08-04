import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 8000;
const app = express(); // calling the express funtion

// creating middleware

app.use(cors()); // cors will help with the sharing of resources
app.use(morgan('tiny')); // logging in of routes and request in the console
app.use(express.json()); // helps with parsing json request body data
app.use(cookieParser()); // helps with parsing cookies

// importing routes
app.use('/api', allRoutes);

// connecting to the database
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING);
		console.log('DB Connected');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running on port ${PORT}`);
});
