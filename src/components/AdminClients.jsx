import { faComment, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { apiGetAppts } from '../services/getAppts';
import { toast } from 'react-toastify';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchClients = async () => {
    try {
      const fetchedClients = await apiGetAppts();
      console.log('Fetched clients:', fetchedClients);
      setClients(fetchedClients.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error fetching clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    if (!client.petOwner) return false; // Skip if petOwner is null or undefined
  
    const fullName = `${client.petOwner.firstName} ${client.petOwner.lastName}`.toLowerCase();
    const email = client.petOwner.email.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
  });
  

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  // Handlers for pagination
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  return (
    <div className="h-[100vh] flex flex-col p-4 bg-gray-50">
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-gray-800">Clients</h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search clients by name or email..."
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Client Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-[#F3F4F6] text-black">
            <tr>
              <th className="py-2 px-4 border">Client's Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
  {loading ? (
    <tr>
      <td colSpan="3" className="text-center py-4">
        Loading...
      </td>
    </tr>
  ) : currentClients.length > 0 ? (
    currentClients.map((client, index) => (
      <tr
        key={index}
        className={`${
          index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
        } hover:bg-gray-200`}
      >
        <td className="py-2 px-4 border">
          {client.petOwner
            ? `${client.petOwner.firstName} ${client.petOwner.lastName}`
            : 'Unknown'}
        </td>
        <td className="py-2 px-4 border">
          {client.petOwner ? client.petOwner.email : 'No email'}
        </td>
        <td className="py-2 px-4 border text-center">
          {client.petOwner && (
            <a href={`mailto:${client.petOwner.email}`} className="text-blue-600">
              <FontAwesomeIcon icon={faComment} />
            </a>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-4">
        No clients found.
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
    </div>
  );
};

export default AdminClients;
