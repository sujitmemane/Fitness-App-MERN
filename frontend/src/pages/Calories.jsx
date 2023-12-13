import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useForm, useFieldArray } from "react-hook-form";

function formatDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateObject = new Date(inputDate);

  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;

  return formattedDate || "No Date";
}

const Calories = () => {
  const [caloriesData, setCaloriesData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const  [show,setShow]=useState(false)

  const token = localStorage.getItem("token");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0], // Today's date
      calories: [{ number: 0 }, { number: 0 }],
    },
  });

  const { fields, remove, append } = useFieldArray({
    name: "calories",
    control,
  });

  const onSubmit = async (data) => {
    console.log(data);

    const totalCalories = data?.calories?.reduce(
      (acc, curr) => acc + curr.number,
      0
    );

    const calorieRanges = [
      { min: 0, max: 500, count: 1 },
      { min: 501, max: 1000, count: 2 },
      { min: 1001, max: 1500, count: 3 },
      { min: 1501, max: 2000, count: 4 },
      { min: 2001, max: Infinity, count: 5 },
    ];

    const count =
      calorieRanges.find(
        (range) => totalCalories >= range.min && totalCalories <= range.max
      )?.count || 1;

    const sdata = {
      date: data?.date,
      count,
    };

    try {
      const response = await fetch("https://fitnessapp-oexf.onrender.com/api/workouts/api/calories", {
        method: "POST",
        body: JSON.stringify(sdata),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      getCaloriesData()
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Error Submitting form");
    }
    console.log(count);
  };
   


  const getCaloriesData =async()=>{
    try {
      const response = await fetch(`https://fitnessapp-oexf.onrender.com/api/workouts/api/calories/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)
      setCaloriesData(result?.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCaloriesData()
  },[])



  const handleDayClick = (value) => {
    if(value===null){
      setShow(false)
      return
    }
  setShow(true)
    setSelectedDate(value);
  };

  return (
    <div className="max-w-6xl mx-auto my-224 px-24 h-full flex flex-col items-center">
      <div className="max-w-lg px-8 w-full text-gray-600 space-y-5 my-8  py-2">
        <h1 className="text-3xl font-normal text-green-500 text-center">
          Add Calories
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="font-medium">Date</label>
            <input
              type="date"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("date", {
                required: {
                  value: true,
                  message: "Please Enter A Date",
                },
              })}
            />
            <p className="text-red-400">{errors.date?.message}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label className="font-medium">Meal {index + 1}</label>
                <input
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
                  {...register(`calories.${index}.number`, {
                    required: {
                      value: true,
                      message: "Please Enter A Calorie",
                    },
                    valueAsNumber: true,
                  })}
                />
                <p
                  className="py-2 bg-red-400 flex items-center justify-center text-white cursor-pointer"
                  onClick={() => remove(index)}
                >
                  REMOVE
                </p>
                <p className="text-red-400">
                  {errors.calories?.[index]?.message}
                </p>
              </div>
            ))}
            <button
              onClick={() => append({ number: 0 })}
              className="inline-flex w-full items-center justify-center my-4 h-12 px-6 font-bold tracking-wide text-white transition duration-200 shadow-md bg-green-400 focus:shadow-outline focus:outline-none"
            >
              ADD CALORIES
            </button>
          </div>
          <button className="inline-flex w-full items-center justify-center h-12 px-6 font-bold tracking-wide text-white transition duration-200 shadow-md bg-green-400 focus:shadow-outline focus:outline-none">
            ADD
          </button>
        </form>
      </div>
      <CalendarHeatmap
        startDate={new Date("2023-01-01")}
        endDate={new Date("2023-12-31")}
        values={caloriesData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.count}`;
        }}
        onClick={(value) => handleDayClick(value)}
      />
    {show &&   <h1 className="text-2xl font-thin my-2">Calorie Count (Out Of 5) On {formatDate(selectedDate?.date )} - {selectedDate?.count ||0}</h1>}
    </div>
  );
};

export default Calories;
