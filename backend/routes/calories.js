import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import Calories from "../models/calories.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
 
 try {
  const data = await Calories.find({user_id:req?.user?._id})
  console.log(data)
  res.json({success:true,data,message:"Data Fetching Successfull"})
 } catch (error) {
  res.status(500).json({success:false, error: 'Internal Server Error' });
 }
});

router.post("/", async (req, res) => {
  const { date, count } = req.body
  console.log(req?.user?.id)
  try {

    const data = await Calories.find()
    const exist = data?.find(info => info?.date === date)
    if (exist) {
      await Calories.findByIdAndUpdate({ _id: exist?._id }, { count })
    } else {
      await Calories.create({ date, user_id:req?.user?._id, count })
    }

    res.status(200).json({success:true,message:"Data Saved"})
  } catch (error) {
    res.status(500).json({ success:false, error: 'Internal Server Error' });
  }
 
});

export default router;
