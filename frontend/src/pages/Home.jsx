import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="relative mb-6 sm:mx-auto md:mb-10 md:max-w-md lg:max-w-lg">
        <img
          className="object-cover w-full h-56 rounded shadow-lg md:h-64 lg:h-80"
          src="https://imgs.search.brave.com/ijdhGVwhS6M0KnaOu3FECqzrhvJNzzixSo6Pi6NJdhk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMzkyNzQy/OS84MTgxL2kvNjAw/L2RlcG9zaXRwaG90/b3NfODE4MTUwNzQt/c3RvY2stcGhvdG8t/YXRobGV0aWMtbWFu/LWFuZC13b21hbi1h/ZnRlci5qcGc"
          alt=""
        />
        <a
          href="/"
          aria-label="Play Video"
          className="absolute inset-0 flex items-center justify-center w-full h-full transition-colors duration-300 bg-gray-900 bg-opacity-50 group hover:bg-opacity-25"
        >
          <div className="flex items-center justify-center w-16 h-16 transition duration-300 transform bg-gray-100 rounded-full shadow-2xl group-hover:scale-110">
            <svg
              className="w-10 text-gray-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.53,11.152l-8-5C8.221,5.958,7.833,5.949,7.515,6.125C7.197,6.302,7,6.636,7,7v10 c0,0.364,0.197,0.698,0.515,0.875C7.667,17.958,7.833,18,8,18c0.184,0,0.368-0.051,0.53-0.152l8-5C16.822,12.665,17,12.345,17,12 S16.822,11.335,16.53,11.152z" />
            </svg>
          </div>
        </a>
      </div>
      <div className="mb-16 md:mb-0 md:max-w-xl sm:mx-auto md:text-center">
        <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Transform Your Lifestyle -  Your Personalized Fitness Hub
        
        </h2>
        <p className="mb-5 text-base text-gray-700 md:text-md font-normal">
        Experience a seamless blend of cutting-edge technology and expert guidance as <span className=" font-bold">FITAXX</span>  empowers you to sculpt your ideal fitness journey
        </p>
        <div className="flex items-center md:justify-center">
          <Link
            class="inline-flex items-center justify-center h-12 px-6 font-normal  text-xl tracking-wide text-white transition duration-200 rounded  bg-green-500  "
            to="/register"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
