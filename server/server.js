import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config' 
import connectDB from './configs/db.js';
import caregiverRouter from './routes/caregiverRoute.js';
import userRouter from './routes/userRoute.js';
import resultRouter from './routes/resultRoute.js';
import gameSessionRouter from './routes/gamesessionRoute.js';
import questionnaireRoute from './routes/questionnaireRoute.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();


const allowedOrigins = [
    'http://localhost:5174',
    'https://cogni-well-daoamalfv-cw-bb8a.vercel.app'
];


app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.get('/', (req, res) => res.send("API is Working"));

app.use('/api/user', userRouter);
app.use('/api/caregiver', caregiverRouter);
app.use("/api/game-session", gameSessionRouter);
app.use("/api/caregiver", resultRouter);
app.use("/api/questionnaire", questionnaireRoute);


app.listen(port, ()=> {console.log(`Server is running on http://localhost:${port}`)})


