import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { apiGetAppts } from '../services/getAppts'; // Ensure this is the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import ConfirmationDialog from './ConfirmationDialog'; // Adjust path if necessary

const AdminAppts = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [showDialog, setShowDialog] = useState(false);
  const [selectedApptId, setSelectedApptId] = useState(null);
  const itemsPerPage = 5;

  const fetchAppts = async () => {
    try {
      const fetchedAppts = await apiGetAppts();
      const validAppts = fetchedAppts.data.filter((appt) => appt.petOwner);
      setAppointments(validAppts);
      console.log(validAppts);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAppts();
  }, []);

  // Filter appointments based on the search query
  const filteredAppointments = appointments.filter((appt) => {
    const ownerName = appt.petOwner
      ? `${appt.petOwner.firstName || ''} ${appt.petOwner.lastName || ''}`.toLowerCase()
      : '';
    const petName = appt.petName?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
  
    return ownerName.includes(search) || petName.includes(search);
  });
  

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  // Handlers for pagination
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle mark as done with confirmation dialog
  const handleMarkAsDone = (apptId) => {
    setSelectedApptId(apptId);
    setShowDialog(true);
  };

  const confirmMarkAsDone = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appt) => appt.id !== selectedApptId)
    );
    toast.success('Appointment marked as completed!');
    setShowDialog(false);
  };

  const cancelMarkAsDone = () => {
    setShowDialog(false);
  };

  return (
    <div className="h-[100vh] flex flex-col p-4 bg-gray-50">
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-gray-800">Upcoming Appointments</h1>
      </div>
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-[#F3F4F6] text-black">
            <tr>
              <th className="py-2 px-4 border">Owner's Name</th>
              <th className="py-2 px-4 border">Pet's Name</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading Appointments...
                </td>
              </tr>
            ) : currentAppointments.length > 0 ? (
              currentAppointments.map((appt, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200`}
                >
                  <td className="py-2 px-4 border">
  {appt.petOwner ? `${appt.petOwner.firstName} ${appt.petOwner.lastName}` : 'N/A'}
</td>

                  <td className="py-2 px-4 border">{appt.petName}</td>
                  <td className="py-2 px-4 border">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{appt.appointmentTime}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleMarkAsDone(appt.id)}
                      className="text-[green] hover:text-green-700"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#1E3A8A] text-white'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#1E3A8A] text-white'
          }`}
        >
          Next
        </button>
      </div>
      {/* Confirmation Dialog */}
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to mark this appointment as done?"
          onConfirm={confirmMarkAsDone}
          onCancel={cancelMarkAsDone}
        />
      )}
    </div>
  );
};

export default AdminAppts;
