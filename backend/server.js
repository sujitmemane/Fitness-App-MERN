import express from "express"
import dotenv from "dotenv"
import workoutRoutes from "./routes/workouts.js"
import userRoutes from "./routes/users.js"
import caloriesRoutes from "./routes/calories.js"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

dotenv.config()
const app = express()


mongoose.connect(process.env.MONGODB_URL, {
  dbName: "Fitness",
  socketTimeoutMS: 30000, 
  useUnifiedTopology: true,
}).then(() => console.log("DB Connected")).catch((err) => console.error("Error connecting to the database:", err));



// Middlewares
const corsOpts = {
  origin: ['https://fitness-app-mern.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type']
};

app.use(cors(corsOpts))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/workouts", workoutRoutes)
app.use("/api/users",userRoutes)
app.use("/api/calories",caloriesRoutes)


app.get('/', (req, res) => {
  res.send('Hello Wor ld!')
})

app.listen(process.env.PORT || 4000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})