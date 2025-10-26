import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../services/auth";
import { toast } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Importing eye icons from react-icons
import signupLeft from "../assets/signupLeft.svg";
import signupRight from "../assets/signupRight.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "user",
    };

    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === data.email);

    if (existingUser) {
      toast.error("This account already exists. Go ahead and login");
      setIsLoading(false);

      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("authToken", Math.random().toString(36).substr(2));
    localStorage.setItem("currentUser", JSON.stringify(data));

    toast.success("You have been successfully signed up! Welcome");
    navigate("/login");

    setIsLoading(false);

  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-[100vh] bg-[#F0F8FA] flex items-center justify-center">
      <div className="w-[100%] px-[5%] h-[90%] lg:max-w-7xl lg:h-[80%] grid lg:grid-cols-3 items-center">
        {/* Left bird illustration */}
        <div className="hidden justify-center items-center lg:block">
          <img src={signupLeft} alt="Bird illustration" />
        </div>

        {/* Form container */}
        <div className="h-[60%] lg:h-[90%] bg-white shadow-md rounded-3xl px-8 lg:py-10 text-center flex flex-col justify-center relative">
          {/* BarkBox Header */}
          <div className="w-12 h-12 mx-auto mb-4">
            <h3 className="font-bold text-[1.5em]">BarkBox</h3>
          </div>

          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-semibold mb-2">Create an Account with Us</h2>
          <p className="text-gray-600 mb-6"></p>

          {/* Sign Up Form */}
          <form onSubmit={handleSignup}>
            <div className="flex gap-x-[1em]">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Password field with eye toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-6 focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Toggle password visibility
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} className="mb-[1em]" /> : <FontAwesomeIcon icon={faEye} className="mb-[1em]" />} {/* Display the appropriate icon */}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white rounded-md py-2 font-semibold hover:bg-[#1E3A8A] transition-colors"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Log in link */}
          <p className="text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1E3A8A] hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right bird illustration */}
        <div className="hidden justify-center items-center lg:block">
          <img
            src={signupRight} // Right bird image placeholder
            alt="Bird illustration"
            className="w-80 h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
