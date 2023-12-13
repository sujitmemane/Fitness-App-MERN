import mongoose from "mongoose";

const calorieSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    count:{
      type:Number,
      required:true,
    },
    user_id:{
        type:String,
        required:true
    }
})

export default mongoose.model("calorie",calorieSchema)