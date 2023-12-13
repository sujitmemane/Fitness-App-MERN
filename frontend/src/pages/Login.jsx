import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContextProvider";
import { Navigate,Link } from "react-router-dom";

const Login = () => {
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(AppContext)
  const token = localStorage.getItem("token")
  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://fitnessapp-oexf.onrender.com/api/workouts/api/users/login", {
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
        toast.error(result?.message || "An error occurred during Login.");
      }
    } catch (error) {
     
      toast.error(error?.message);
    }
  };

//   useEffect(() => {
//     reset();
//   }, [isSubmitted]);

if(token){
 return <Navigate to="/all"/>
}

  return (
    <main className="w-full py-24  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-normal text-green-500">Login</h1 >
      <div className="max-w-lg px-8 w-full text-gray-600 space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
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
            Login
          </button>
        </form>
        <h1 className="text-2xl  text-center text-green-400  font-normal my-4">OR</h1>
      <Link
      to="/register"
            class="inline-flex  w-full items-center justify-center h-12 px-6 font-bold tracking-wide text-white transition duration-200  shadow-md bg-green-400  focus:shadow-outline focus:outline-none"
          >
           REGISTER
          </Link>
      </div>
    </main>
  );
};

export default Login;
