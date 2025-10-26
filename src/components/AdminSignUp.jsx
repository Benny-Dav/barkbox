import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../services/auth";
import { toast } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminSide from "../assets/adminSide.svg";
import adminSide2 from "../assets/adminSide2.svg";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      role: "vendor",
      storeName: formData.get("storeName"),
      storeDescription: formData.get("storeDescription"),
      storeLocation: formData.get("storeLocation"),
      storeContact: formData.get("storeContact"),
    };
  
    // Save vet data locally — just like customer signup
    try {
      // Check if account already exists
      const existingVets = JSON.parse(localStorage.getItem("vets")) || [];
      const accountExists = existingVets.some((vet) => vet.email === data.email);
  
      if (accountExists) {
        toast.error("This account already exists. Please log in instead.");
      } else {
        existingVets.push(data);
        localStorage.setItem("vets", JSON.stringify(existingVets));
        localStorage.setItem("currentVet", JSON.stringify(data));
  
        toast.success("You have been successfully signed up! Welcome 🎉");
        navigate("/admin/login");
      }
    } catch (error) {
      toast.error("Something went wrong during signup. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section className="h-screen bg-[#F0F8FA] flex items-center justify-center">
      <div className="w-full px-[5%] h-[90%] lg:max-w-7xl lg:h-full grid lg:grid-cols-3 items-center">
        
        {/* Left image */}
        <div className="hidden lg:flex justify-center items-center">
          <img src={adminSide} alt="Vet illustration" className="w-80 h-80" />
        </div>

        {/* Signup Form */}
        <div className="h-full lg:h-[90%] bg-white shadow-md rounded-3xl px-8 lg:py-10 flex flex-col justify-center text-center relative">
          <h3 className="font-bold text-[1.5em] text-[#1E3A8A] mb-2">BarkBox</h3>
          <h2 className="text-2xl font-semibold mb-6 text-[#1E3A8A]">Register as a Vet / Service Provider</h2>

          <form onSubmit={handleSignup}>
            <div className="flex gap-x-[1em]">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            />

            <input
              type="text"
              name="storeName"
              placeholder="Store Name"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            />

            <input
              type="text"
              name="storeDescription"
              placeholder="Store Description"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            />

            <input
              type="text"
              name="storeLocation"
              placeholder="Store Location"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            />

            <input
              type="text"
              name="storeContact"
              placeholder="Store Contact"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Password field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-4 mb-6 focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E3A8A] text-white rounded-md py-2 font-semibold hover:bg-[#1B3270] transition-colors"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-[#1E3A8A] hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right image */}
        <div className="hidden lg:flex justify-center items-center">
          <img src={adminSide2} alt="Vet illustration" className="w-80 h-80" />
        </div>
      </div>
    </section>
  );
};

export default AdminSignUp;
