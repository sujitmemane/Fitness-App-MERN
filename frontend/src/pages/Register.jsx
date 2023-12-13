import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContextProvider";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated,setUser } = useContext(AppContext);
  const token = localStorage.getItem("token")
  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://fitnessapp-oexf.onrender.com/api/users/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result?.success===true) {
        toast.success(result?.message, { autoClose: 3000 });
        localStorage.setItem("token", result?.user?.token);
        localStorage.setItem("username", result?.user?.username);
        localStorage.setItem("user_id", result?.user?.user_id);
        setIsAuthenticated(true);
      

        
        console.log(isAuthenticated)
      } else {
        console.log(isAuthenticated)
        toast.error(result?.message || "An error occurred during registration.");
      }
    } catch (error) {
     
      toast.error("An error occurred during registration.");
    }
  };

  console.log(errors);

  if(token){
    return <Navigate to="/all"/>
   }
   

  return (
    <main className="w-full py-24  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-normal text-green-500">Register</h1>
      <div className="max-w-lg px-8 w-full text-gray-600 space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please Enter A Name",
                },
              })}
            />
            <p className="text-red-400">{errors?.name?.message}</p>
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please Enter A Email",
                },
              })}
            />
            <p className="text-red-400">{errors?.email?.message}</p>
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-500 shadow-sm -lg"
              {...register("password", {
                required: {
                  value: true,
                  message: "Please Enter A Password",
                },
              })}
            />
            <p className="text-red-400">{errors?.password?.message}</p>
          </div>

          <button
            disabled={isSubmitting}
            class="inline-flex  w-full items-center justify-center h-12 px-6 font-bold tracking-wide text-white transition duration-200  shadow-md bg-green-400  focus:shadow-outline focus:outline-none"
          >
            REGISTER
          </button>
        </form>
        <h1 className="text-2xl  text-center text-green-400  font-normal my-4">OR</h1>
      <Link
      to="/login"
            class="inline-flex  w-full items-center justify-center h-12 px-6 font-bold tracking-wide text-white transition duration-200  shadow-md bg-green-400  focus:shadow-outline focus:outline-none"
          >
            LOGIN
          </Link>
      </div>
      
    </main>

  );
};

export default Register;
