import { Link } from "react-router-dom"
import Navbar from "../innerComponents/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import F from "../services/features"
import Home2Bkg from "../assets/Home2Bkg.png"
import dalmatian from "../assets/dalmatian.png"
import Footer from "../innerComponents/Footer"
import MeetTheDevs from "./MeetTheDevs"

const HomePage = () => {
  return (
    <div>
      <section id="homeBg" className="overflow-x-hidden w-full h-[100vh] lg:h-[100vh] overflow-hidden bg-[#1E3A8A] lg:lg:m-0 lg:p-0 lg:flex lg:justify-content lg:items-center">
        <Navbar />
        <div className="px-[5%] flex flex-col lg:w-[50%] lg:pl-[15%]">
          <h1 className="mt-[35%] w-[70%] text-[3em] text-[white] font-bold lg:w-[100%] mb-[0.5em]">Online Vet Booking System</h1>
          <p className="text-[1.2em] text-[white] w-[70%]">Find certified vets near you and schedule an appointment with the click of a button.</p>
          
         <div className="mt-[2em] w-[100%] flex flex-col lg:gap-y-[1em]">
         <Link to="/viewservices"><button className="p-[1em] lg:p-[0.6em] border-white border-2 rounded-md text-[1.2em] lg:text-[1em] font-bold w-[90%] lg:w-[40%] mt-[1em] text-[white]">View our Services</button></Link>
         <Link to="/admin/register"><button className="p-[1em] lg:p-[0.6em] border-white border-2 rounded-md text-[1.2em] lg:text-[1em] font-bold w-[90%] lg:w-[40%] mt-[1em] text-[white]">Register a Service</button></Link>
         </div>
       
        </div>
        <div className="w-[50%] h-[100%] flex justify-end items-center ">
          <img src={dalmatian} alt="" className="h-[150%] w-auto object-contain "/>
        </div>
        
      </section>
      <section className="h-[100vh] overflow-y-hidden grid grid-rows-2 lg:mb-[10%] lg:h-[100vh] w-full bg-[white] lg:flex lg:justify-center lg:items-center overflow-x-hidden">
        <div className="lg:w-[60%] w-[100%] bg-center lg:h-full bg-no-repeat bg-contain" style={{ backgroundImage: `url(${Home2Bkg})` }}>

        </div>
        <div className="lg:w-[40%] px-[3%] h-full lg:px-[4em] w-[100%] lg:pt-[10%]">
          <h2 className=" text-center lg:text-[2.2em] text-[2em] font-bold mb-[1em] lg:text-left">Ease scheduling pains with a vet booking system</h2>
          <p className="text-[1.5em] lg:text-[1.1em] mb-[1em]">Empower your patients to book or reschedule appointments online 24/7. Reduce average booking time from 8+ minutes by phone* to just a few clicks.</p>
          <Link to="/viewservs">
            <button className="ml-[20%]  p-[1em] lg:p-[0.6em] bg-[#1E3A8A] text-[white] rounded-md text-[1.3em] lg:text-[1em] font-bold ">Book an Appointment</button>
          </Link>
        </div>
      </section>
      <section className="w-full grid grid-rows-2 mt-[20%] px-[3%] gap-y-[2em] lg:h-[100vh] bg-[#F5F5F5] lg:px-[15%] lg:py-[10%] lg:gap-y-[2em] lg:grid lg:grid-cols-2 ">
        {F.FEATURES.map((feature, index) => {
              return(
                <div key={index} className="flex flex-col w-[80%] lg:w-[70%] lg:ml-auto lg:mr-auto">
                <span>
                  <FontAwesomeIcon icon={feature.icon} className="text-[2em]"/>
                </span>
                <h3 className="w-[80%] lg:w-[100%] text-[1.3em] font-semibold mt-4">{feature.title}</h3>
                <p className="w-[90%] lg:w-[100%] text-[1em] mt-2">{feature.description}</p>
              </div>
              )

        } 
        )}
      </section>
      <MeetTheDevs/>
      <Footer/>
      
    </div>




  )
}

export default HomePage

