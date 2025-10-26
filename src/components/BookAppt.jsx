import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../innerComponents/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const BookAppt = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser"); // ✅ consistent key name
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        name: parsedUser.firstName || "",
        email: parsedUser.email || "",
      });
    }
  }, []);

  const handleShowCalendar = () => {
    setShowCalendar(true);
    setError('');
  };

  const handleShowTimePicker = () => {
    setShowCalendar(false);
    setError('');
  };

  const availableTimes = ["11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

  const handleTimeSelect = (time) => {
    if (time) {
      setSelectedTime(time);
      setError('');
    } else {
      toast.error("Please select a valid time.");
    }
  };

  const handleDateChange = (date) => {
    const today = new Date();
    if (date < today) {
      setError('Appointment date should be in the present or future.');
    } else {
      setSelectedDate(date);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.error("Please log in to book an appointment.");
      setLoading(false);
      navigate('/login');
      return;
    }

    if (!selectedTime || !selectedDate) {
      setError('Please select both a date and a time for your appointment.');
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    const newAppt = {
      ownerName: formData.get('ownerName'),
      email: formData.get('email'),
      petName: formData.get('petName'),
      reason: formData.get('reason'),
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
    };

    // Save appointments to localStorage
    const existingAppts = JSON.parse(localStorage.getItem("appointments")) || [];
    existingAppts.push(newAppt);
    localStorage.setItem("appointments", JSON.stringify(existingAppts));

    toast.success("Appointment successfully booked! Check your email for appointment details");
    setLoading(false);
    navigate('/viewservices');
  };

  return (
    <div>
      <section className='h-[100vh] pt-[20%] lg:pt-[3em] bg-white'>
        <Navbar />
        <div className='h-auto lg:h-[85%] lg:w-[75%] mt-[2em] mx-auto lg:border-[5px] pt-[1em] lg:border-[#1E3A8A] rounded-2xl px-[2em] lg:shadow-lg bg-white'>
          <h1 className='font-bold text-[1.8em] text-center mb-[1em] text-[#1E3A8A]'>
            Schedule an Appointment
          </h1>
          <div className='lg:flex grid h-[70%] gap-x-[1em]'>
            {/* Calendar/Time Picker */}
            <div className='lg:w-[50%] p-[1em]'>
              <button
                onClick={handleShowCalendar}
                className={`p-[0.5em] rounded-lg mb-2 font-semibold ${
                  showCalendar ? 'bg-gray-200 text-[#1E3A8A]' : 'hover:bg-gray-200 text-[#1E3A8A]'
                }`}
              >
                Select a Date
              </button>
              <button
                onClick={handleShowTimePicker}
                className={`p-[0.5em] rounded-lg font-semibold ${
                  !showCalendar ? 'bg-gray-200 text-[#1E3A8A]' : 'hover:bg-gray-200 text-[#1E3A8A]'
                }`}
              >
                Select a Time
              </button>
              <div className='mt-4'>
                {showCalendar ? (
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileClassName={({ date }) =>
                      selectedDate.toDateString() === date.toDateString()
                        ? 'bg-[#1E3A8A] text-white rounded-lg'
                        : null
                    }
                    showNeighboringMonth={false}
                    formatDay={(locale, date) => date.getDate()}
                    className='text-center'
                  />
                ) : (
                  <div>
                    <h2 className='text-center font-semibold mb-[2em] text-[#1E3A8A]'>
                      Select Appointment Time
                    </h2>
                    <div className="grid grid-cols-3 gap-x-[1em] gap-y-[1em] mb-[2em]">
                      {availableTimes.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(time)}
                          className={`px-4 py-2 rounded-md border ${
                            selectedTime === time
                              ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-[#1E3A8A]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <p className='p-[0.5em] bg-[#e2774d80] rounded-lg '>
                      <FontAwesomeIcon icon={faCircleExclamation} className='mr-[1em] text-red-500' />
                      All selected times are in GMT
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className='lg:w-[50%] p-[1em]'>
              <h3 className='text-[1.7em] lg:text-[1.2em] font-bold text-center text-[#1E3A8A]'>
                Enter your Details
              </h3>
              <form onSubmit={handleSubmit} className='flex flex-col px-[10%] pt-[5%] gap-y-[1em]'>

{/* Owner Name */}
<div className='flex flex-col sm:flex-row sm:items-center sm:gap-x-4'>
  <label htmlFor="ownerName" className='w-[35%] text-gray-700 font-medium'>
    Owner Name:
  </label>
  <input
    type="text"
    id="ownerName"
    name="ownerName"
    value={userData.name}
    readOnly
    className='flex-1 py-2 border-b-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none'
  />
</div>

{/* Email */}
<div className='flex flex-col sm:flex-row sm:items-center sm:gap-x-4'>
  <label htmlFor="email" className='w-[35%] text-gray-700 font-medium'>
    Email:
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={userData.email}
    readOnly
    className='flex-1 py-2 border-b-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none'
  />
</div>

{/* Pet Name */}
<div className='flex flex-col sm:flex-row sm:items-center sm:gap-x-4'>
  <label htmlFor="petName" className='w-[35%] text-gray-700 font-medium'>
    Pet Name:
  </label>
  <input
    type="text"
    id="petName"
    name="petName"
    placeholder="Enter your pet's name"
    required
    className='flex-1 py-2 border-b-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none'
  />
</div>

{/* Reason */}
<div className='flex flex-col sm:flex-row sm:items-start sm:gap-x-4'>
  <label htmlFor="reason" className='w-[35%] text-gray-700 font-medium'>
    Reason:
  </label>
  <textarea
    id="reason"
    name="reason"
    placeholder="Your reason for visiting"
    required
    className='flex-1 py-2 border-2 border-gray-300 focus:border-[#1E3A8A] focus:outline-none rounded-md'
  ></textarea>
</div>

{error && <p className="text-red-500 text-center">{error}</p>}

<div className='flex justify-center'>
  <button
    type="submit"
    className="mt-[1em] p-[1em] lg:p-[0.6em] bg-[#1E3A8A] text-white rounded-md text-[1.3em] lg:text-[1em] font-bold transition duration-300"
    disabled={loading}
  >
    {loading ? 'Confirming...' : 'Confirm Appointment'}
  </button>
</div>
</form>


            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppt;
 