import mongoose from "mongoose"
import Workout from "../models/workout.js"

export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    const user_id = req?.user?._id
    console.log(user_id)
    try {
        const workout = await Workout.create({ title, reps, load,user_id })

        res.status(200).json({success:true,message:"Successfully Created A Workout"})
    } catch (error) {
        res.status(400)
    }

}

export const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({user_id:req?.user?._id}).sort({ createdAt: -1 });
        console.log(workouts);

        res.status(200).json({ success: true, data: workouts });
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


export const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ mssg: "Workout not found" })
        }
        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(200).json({ mssg: "Workout not found" })
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ mssg: "Error in getting in Workout" })
    }
}


export const deleteSingleWorkout = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ mssg: "Workout not found" })
        }
        const workout = await Workout.findByIdAndDelete(id)
        if (!workout) {
            return res.status(404).json({ mssg: "No Such Workout" })
        }
        res.status(200).json({mssg:"Deleted Workout Successfully",data:workout})
    } catch (error) {
        res.status(400).json({ mssg: "Error Deleting A Workout" })
    }
}


export const updateSingleWorkout = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ mssg: "Workout not found" })
        }
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ mssg: "Error Updating  A Workout" })
    }
}