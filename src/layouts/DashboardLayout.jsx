import React from 'react';
import AdminSidebar from '../innerComponents/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHamburger } from '@fortawesome/free-solid-svg-icons';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="h-screen flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside
                className={`fixed lg:static top-0 left-0 h-full bg-gray-800 text-white z-20 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform lg:translate-x-0 lg:w-64`}
            >
                {/* Sidebar Content */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700 lg:hidden">
                    <h2 className="text-lg font-bold">Sidebar</h2>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-white"
                    >
                        <FontAwesomeIcon icon={faClose} className="text-[1.5em]" />
                    </button>
                </div>
                <AdminSidebar />
            </aside>

            {/* Overlay for Mobile Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="h-16 bg-white shadow flex items-center px-6 lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-600"
                    >
                        <FontAwesomeIcon
                            icon={isSidebarOpen ? faClose : faHamburger}
                            className="text-[2em]"
                        />
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
