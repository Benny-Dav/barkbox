import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const AdminNavbar = () => {
  return (
    <div className="fixed h-[10%] w-[83%] shadow-md top-0 right-0 flex items-center bg-white px-6">
      {/* Search Bar */}
      <div className="ml-[2em] flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          
          <FontAwesomeIcon icon={faSearch} className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500'/>
        </div>
      </div>

      {/* Profile Section */}
      <div className="ml-auto flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
          {/* Placeholder for profile image */}
          <span className="text-gray-500 text-xl font-bold">a</span>
        </div>
        <div>
          <p className="text-gray-800 font-semibold">{}</p>
          <p className="text-gray-600 text-sm">Vendor</p>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
