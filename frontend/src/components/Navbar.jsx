import { useContext, useState } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const navigate= useNavigate()
  console.log(isAuthenticated);
  const onLogoutHandler = (event) => {
    event.preventDefault();
    console.log("Logging out...");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    console.log("1");
    navigate("/");
    console.log("2");
  };
  


  
  return (
    <div class="bg-black text-white ">
      <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div class="relative flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-black text-green-500 uppercase">
              FITAXX
            </h1>
          </Link>
          {token && (
            <ul class="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link className="text-green-400  uppercase font-bold" to="/all">
                  {" "}
                  Workouts
                </Link>
              </li>
              <li>
                <Link className="text-green-400  uppercase font-bold" to="/new">
                  Calories
                </Link>
              </li>
            </ul>
          )}

          {isAuthenticated ? (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li> Hello {localStorage.getItem("username")} !</li>
              <li>
                <Link
                  onClick={onLogoutHandler}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-500  focus:shadow-outline focus:outline-none"
                >
                  Logout
                </Link>
              </li>
              
            </ul>
          ) : (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              {" "}
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-500  focus:shadow-outline focus:outline-none"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-500  focus:shadow-outline focus:outline-none"
                >
                  Register
                </Link>
              </li>{" "}
            </ul>
          )}

          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg class="w-5 -600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
