import express from 'express';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/users.js';
import caloriesRoutes from './routes/calories.js';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'Fitness',
  socketTimeoutMS: 30000,
  useUnifiedTopology: true,
}).then(() => console.log('DB Connected')).catch((err) => console.error('Error connecting to the database:', err));

// Middlewares
const corsOpts = {
  origin: ['https://fitness-app-mern.vercel.app', 'http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/calories', caloriesRoutes);

// Handle CORS preflight requests
app.options('/api/workouts', cors());
app.options('/api/users', cors());
app.options('/api/calories', cors());

// Handle CORS error
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token or missing credentials' });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
