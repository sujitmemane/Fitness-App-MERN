import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
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

  return formattedDate;
}

const WorkoutElement = ({ data, onFormSubmit }) => {
  const { title, reps, load, createdAt } = data;
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem("token");
  const onDeleteWorkout = async (id) => {
    try {
      const response = await fetch(`https://fitnessapp-oexf.onrender.com/api/workouts/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      toast.success(result.mssg);
      onFormSubmit();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" p-4 rounded-lg mb-4 bg-gray-100 flex justify-between">
      <div>
        <h1 className="text-2xl font-medium mb-1 text-green-500">{title}</h1>
        <p className=""> Load (kg) - {load}</p>
        <p className="">Reps - {reps}</p>
        <p className="">{formatDate(createdAt)}</p>
      </div>
      <MdDeleteOutline
        className="opacity-80 cursor-pointer text-red-500"
        onClick={() => onDeleteWorkout(data?._id)}
        size={30}
      />
    </div>
  );
};

export default WorkoutElement;
