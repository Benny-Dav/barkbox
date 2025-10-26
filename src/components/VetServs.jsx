import Navbar from "../innerComponents/Navbar";
import vetImg1 from "../assets/vetImg1.jpg";
import { Link } from "react-router-dom";
const VetServs = () => {
  return (
    <div>
      <Navbar />
      <section className="h-[100vh] grid grid-cols-2 pt-[5%]">
        {/* Text Section */}
        <div className="pt-[15%]">
          <div className="w-[100%] px-[20%]">
            <h1 className="text-[2em] mb-[0.5em]">A Special Touch</h1>
            <h3 className="text-[2em] font-bold mb-[1em]">DR SACKEY VETERINARY CLINIC</h3>
            <p className="mb-[1em]">
            Empower your patients to book or reschedule appointments online 24/7. Reduce average booking time from 8+ minutes by phone* to just a few clicks
            </p>
            <Link to="/book-appt">
            <button className="p-[0.6em] bg-[#1E3A8A] text-[white] rounded-md text-[1em] font-bold ">Book an Appointment</button></Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="px-[5%] py-[7%] pr-[12%] relative ml-[5%]">
          <div className="h-[100%] border-[#1E3A8A] border-4 w-[80%] relative overflow-hidden">
            {/* Blue background */}
          </div>
          {/* Image positioned to overflow on the left */}
          <img
            src={vetImg1}
            alt="Image of Vet"
            className="absolute top-[20%] left-[-10%] w-[70%] h-auto z-[10] object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default VetServs;
