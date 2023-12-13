import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const WorkoutForm = ({ onFormSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting ,isSubmitted},
    handleSubmit,
    reset
  } = useForm({
    defaultValues:{
     title:"",
     load:"",
     reps:""
    },
    mode:"onChange"
  });
  const token = localStorage.getItem("token")
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch("https://fitnessapp-oexf.onrender.com/api/workouts/api/workouts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      toast.success(result?.message);
      onFormSubmit()
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Error Submitting form");
    }
  };

  console.log(errors);

  useEffect(()=>{
reset()
  },[isSubmitted])

  return (
    <main className="w-full  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-normal text-green-500">Add Workout</h1>
      <div className=" px-8 w-full text-gray-600 space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-medium">Title</label>
            <input
              type="text"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("title", {
                required: {
                  value: true,
                  message: "Please Enter A Title",
                },
              })}
            />
            <p className="text-red-400">{errors?.title?.message}</p>
          </div>
          <div>
            <label className="font-medium">Load</label>
            <input
              type="number"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("load", {
                required: {
                  value: true,
                  message: "Please Enter A Load",
                },
                valueAsNumber: true,
              })}
            />
            <p className="text-red-400">{errors?.load?.message}</p>
          </div>
          <div>
            <label className="font-medium">Reps</label>
            <input
              type="number"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("reps", {
                required: {
                  value: true,
                  message: "Please Enter A Reps",
                },
                valueAsNumber: true,
              })}
            />
            <p className="text-red-400">{errors?.reps?.message}</p>
          </div>

          <button
            disabled={isSubmitting}
            class="inline-flex  w-full items-center justify-center h-12 px-6 font-bold tracking-wide text-white transition duration-200  shadow-md bg-green-400  focus:shadow-outline focus:outline-none"
          >
            CREATE
          </button>
        </form>
      </div>
    </main>
  );
};

export default WorkoutForm;
