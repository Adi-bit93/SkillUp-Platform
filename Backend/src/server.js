import express from 'express';
import connectDB from "./config/index.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
    path:'./env'
})
const app = express();

app.use(cors)
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));
connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000)
    console.log(`Server is running at port : ${process.env.PORT}`);
})
.catch((err) => {
    console.log("MongoDB connection failed!!", err);
})