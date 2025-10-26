import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import MapLocation from "./MapLocation";
import ClickToCall from "./ClickToCall";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.firstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    toast.info("You’ve been logged out.");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-md z-50 px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 text-[#1E3A8A]">
        <h1 className="text-[1.5em] sm:text-[1.8em] font-extrabold tracking-wide">
          BARKBOX
        </h1>
      </NavLink>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-[#1E3A8A] text-[1.8em] z-[60]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center font-medium text-[#333] space-x-8">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-[#1E3A8A] transition-colors ${
                isActive ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/viewservices"
            className={({ isActive }) =>
              `hover:text-[#1E3A8A] transition-colors ${
                isActive ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]" : ""
              }`
            }
          >
            Services
          </NavLink>
        </li>
        <NavLink to="/viewservices">
          <button className="px-5 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#334D89] text-white rounded-lg text-[1em] font-bold shadow-md hover:scale-105 transform transition-all">
            Book an Appointment
          </button>
        </NavLink>
      </ul>

      {/* Desktop Icons */}
      <ul className="hidden lg:flex items-center gap-6 text-[#1E3A8A]">
        <MapLocation />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="text-[1.3em] cursor-pointer hover:text-[#334D89] transition-colors"
        />
        <ClickToCall />
      </ul>

      {/* Desktop User Info */}
      <div className="hidden lg:flex items-center gap-4">
        {userName ? (
          <span className="font-semibold italic text-[#1E3A8A]">
            Hi, {userName} 👋
          </span>
        ) : (
          <Link
            to="/login"
            className="bg-[#60A5FA] px-4 py-2 rounded-md hover:bg-[#93C5FD] transition"
          >
            Sign In
          </Link>
        )}
        <button onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="text-[#1E3A8A]" />
        </button>
      </div>

      {/* ✅ Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ✅ Mobile Menu Content */}
      <div
        className={`lg:hidden fixed top-[70px] right-0 w-[70%] sm:w-[60%] bg-white shadow-lg rounded-l-lg p-6 flex flex-col space-y-6 font-medium text-[#333] z-[50] transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NavLink
          to="/"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `hover:text-[#1E3A8A] transition-colors ${
              isActive ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/viewservices"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `hover:text-[#1E3A8A] transition-colors ${
              isActive ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]" : ""
            }`
          }
        >
          Services
        </NavLink>

        <NavLink to="/viewservices" onClick={() => setIsOpen(false)}>
          <button className="w-full px-5 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#334D89] text-white rounded-lg text-[1em] font-bold shadow-md hover:scale-105 transform transition-all">
            Book an Appointment
          </button>
        </NavLink>

        <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
          {userName ? (
            <span className="font-semibold italic text-[#1E3A8A] text-center">
              Hi, {userName} 👋
            </span>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-center bg-[#60A5FA] px-4 py-2 rounded-md hover:bg-[#93C5FD] transition"
            >
              Sign In
            </Link>
          )}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center justify-center gap-2 text-[#1E3A8A]"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
