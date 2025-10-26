import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../innerComponents/Navbar";
import F from "../services/features";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewServs = () => {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    const authToken = localStorage.getItem("authToken");
    console.log("AuthToken:", authToken);
    return authToken !== null && authToken !== "";
  };

  const handleServiceClick = (serviceUrl) => {
    if (isLoggedIn()) {
      navigate(serviceUrl);
      console.log("User logged in");
    } else {
      toast.error(
        "Oops! You have to create an account or sign in before proceeding."
      );
      navigate("/signup");
    }
  };

  return (

      <section className=" h-[100vh] mt-[20%] lg:mt-0 py-4 lg:overflow-y-hidden">
        <Navbar />
        <div className="mt-[5%] h-full pt-[1em]">
          <h2 className="text-[1.8em] sm:text-[2em] lg:text-[2.5em] text-center font-extrabold italic mb-[1em] px-[1em] bg-gradient-to-r from-[#1E3A8A] to-[#60A5FA] text-transparent bg-clip-text shadow-sm tracking-wide leading-tight">
            We provide you with <span className="">easy access</span> to the following services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[85%] ml-auto mr-auto gap-x-[2em]">
            {F.SERVICES.map((service, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col border px-[2em] py-[3em] rounded-lg h-[400px] shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 cursor-pointer hover:z-10 hover:bg-gradient-to-r from-[#1E3A8A] to-[#60A5FA] hover:text-white"
                  onClick={() => handleServiceClick(service.url)}
                  style={{ transformOrigin: "center", willChange: "transform" }}
                >
                  <FontAwesomeIcon
                    icon={service.icon}
                    className="text-[4em] text-center text-[#1E3A8A] mb-[1em] transition-colors duration-300"
                  />
                  <h3 className="text-center text-[1.2em] font-bold mb-[1em]">
                    {service.title}
                  </h3>
                  <p className="text-center  ">
                    {service.description}
                  </p>
                  <button className="bg-[#1E3A8A] w-[60%] ml-auto mr-auto mt-[2.5em] py-[0.75em] text-white font-semibold rounded-md hover:bg-[#1b336a] transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

  );
};

export default ViewServs;
