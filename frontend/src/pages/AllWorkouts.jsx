import React, { useState, useEffect } from "react";
import WorkoutElement from "../components/WorkoutElement";
import WorkoutForm from "../components/WorkoutForm";

const AllWorkouts = () => {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token")

  const fetchWorkouts = async () => {
    try {
      const response = await fetch("https://fitnessapp-oexf.onrender.com/api/workouts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAllWorkouts(result?.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);
  const handleFormSubmit = () => {
    fetchWorkouts();
  };

  return (
    <div className="md:p-12 flex justify-between items-start w-full">
      <div className="md:w-3/4 max-h-[750px] overflow-y-scroll">
        {allWorkouts.length > 0?
          allWorkouts.map((item) => (
            <WorkoutElement onFormSubmit={handleFormSubmit} data={item} />
          )):<h1 className="text-4xl text-green-500">No Workouts Found</h1>}
      </div>
      <div className="md:w-1/2">
        <WorkoutForm onFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default AllWorkouts;
