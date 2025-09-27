import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))  //for form data
app.use(express.static("public")) 
app.use(cookieparser());


//routes import
import authRoutes from './routes/authRoutes.js';

//routes declaration 

app.use('/api/auth', authRoutes);


export default app;