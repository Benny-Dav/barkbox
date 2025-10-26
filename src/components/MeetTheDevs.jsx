import React from "react";
import meetDevBene from "../assets/meetDevBene.jpg"
import meetDevWill from "../assets/meetDevWill.jpg"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
const developers = [

 
  {
    name: "Benedicta Davour",
    role: "Frontend Developer",
    image: meetDevBene,
    website: "https://benedictadavour.netlify.app/",
    linkedin: "https://www.linkedin.com/in/eba-davour"
  }
];

const MeetTheDevs = () => {
  return (
    <section className="h-auto lg:h-[100vh] mb-[10%] overflow-y-hidden w-full overflow-x-hidden">
      <div className="h-[100%] w-[100%] bg-gray-50 py-12 px-4 lg:px-8">
        <div className="h-[10%] text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Meet the Developer</h2>
          <p className="mt-4 text-[1.5em] lg:text-lg text-gray-500">Our talented team behind the scenes</p>
        </div>
        <div className="h-[80%] w-[60%] ml-auto mr-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {developers.map((developer) => (
            <div
              key={developer.name}
              className="lg:h-[60%] h-[100%] bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="h-[70%] overflow-hidden flex justify-center items-center">
                <img
                  className="h-full object-cover rounded-sm"
                  src={developer.image}
                  alt={developer.name}
                />
              </div>
              {/* Developer Info */}
              <h3 className="mt-4 text-xl font-semibold text-gray-800 ">{developer.name}</h3>
              <p className="text-gray-500">{developer.role}</p>
              {/* Developer Links */}
              <div className="mt-4 flex justify-center space-x-4">
                <a href={developer.website}
                  className="text-[#1E3A8A] hover:text-blue-700 text-[1.5em]"
                  target="_blank"
                  rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe}/>
                  </a>
                  <a href={developer.linkedin}
                  className="text-[#1E3A8A] hover:text-blue-700 font-extrabold text-[1.5em]"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    in
                  </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MeetTheDevs;
