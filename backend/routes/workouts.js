import express from "express"
const router = express.Router()
import Workout  from "../models/workout.js"
import { createWorkout, deleteSingleWorkout, getAllWorkouts, getSingleWorkout, updateSingleWorkout } from "../controllers/workout.js"
import { authMiddleware } from "../middlewares/auth.js"

router.use(authMiddleware)
router.get("/",getAllWorkouts)

router.post("/",createWorkout)
router.get("/:id",getSingleWorkout)
router.delete("/:id",deleteSingleWorkout)
router.patch("/:id",updateSingleWorkout)




export default router