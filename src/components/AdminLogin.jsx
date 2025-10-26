import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginLeft from "../assets/loginLeft.svg";
import loginRight from "../assets/loginRight.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    // Retrieve stored vets from localStorage
    const storedVets = JSON.parse(localStorage.getItem("vets")) || [];

    // Check for account match
    const matchedVet = storedVets.find(
      (vet) => vet.email === email && vet.password === password
    );

    if (matchedVet) {
      // Save session info
      localStorage.setItem("authToken", "dummy-token"); // mimic token
      localStorage.setItem("currentVet", JSON.stringify(matchedVet));

      toast.success(`Welcome back, ${matchedVet.firstName}! 🐾`);
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid email or password. Please try again.");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <section className="h-[100vh] bg-[#F0F8FA] flex items-center justify-center">
      <div className="w-[100%] px-[5%] h-[90%] lg:max-w-7xl lg:h-[80%] grid lg:grid-cols-3 items-center">
        {/* Left illustration */}
        <div className="hidden justify-center items-center lg:block">
          <img src={loginLeft} alt="Dog illustration" className="w-[80%] h-[80%]" />
        </div>

        {/* Form container */}
        <div className="h-[60%] lg:h-[90%] bg-white shadow-md rounded-3xl px-8 lg:py-10 text-center flex flex-col justify-center relative">
          <div className="w-12 h-12 mx-auto mb-4">
            <h3 className="font-bold text-[1.5em]">BarkBox</h3>
          </div>

          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-6 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white rounded-md py-2 font-semibold hover:bg-[#1B336A] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="text-gray-600 mt-4">
            <Link to="/forgot-password" className="text-[#1E3A8A] hover:underline">
              Forgot your password?
            </Link>
          </div>
          <p className="text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link to="/admin/register" className="text-[#1E3A8A] hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right illustration */}
        <div className="hidden justify-center items-center lg:block">
          <img src={loginRight} alt="Dog illustration" className="w-80 h-80" />
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
