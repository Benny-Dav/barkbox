import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [vet, setVet] = useState(null);

  useEffect(() => {
    // Fetch current logged-in vet details from localStorage
    const storedVet = JSON.parse(localStorage.getItem("currentVet"));
    if (storedVet) {
      setVet(storedVet);
    }
  }, []);

  if (!vet) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">
          Please log in to access your dashboard.
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col px-6 py-4 bg-gray-100">
      {/* Navbar Section */}
      <div className="h-[8%] w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-md mb-6">
        <h1 className="font-extrabold text-2xl text-[#1E3A8A]">Dashboard</h1>
        <p className="text-gray-600 font-medium">
          Logged in as <span className="font-semibold text-[#1E3A8A]">{vet.firstName} {vet.lastName}</span>
        </p>
      </div>

      {/* Greeting Card */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white w-full rounded-xl flex flex-col px-8 py-6 mb-6 shadow-lg">
        <h1 className="font-extrabold text-3xl mb-2">
          Welcome back, <span className="text-yellow-300">{vet.storeName}</span> 👋
        </h1>
        <p className="text-lg font-medium">
          {vet.storeDescription || "Let’s make today great for pets and their owners!"}
        </p>
      </div>

      {/* Store Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-[#1E3A8A] mb-4">Store Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="font-medium text-gray-500">Location:</p>
            <p className="font-semibold">{vet.storeLocation || "Not provided"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Contact:</p>
            <p className="font-semibold">{vet.storeContact || "Not provided"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Email:</p>
            <p className="font-semibold">{vet.email}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Account Type:</p>
            <p className="font-semibold capitalize">{vet.role}</p>
          </div>
        </div>
      </div>

      {/* Statistics Section (placeholder for dynamic data later) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Appointments Card */}
        <div className="border rounded-xl shadow-lg bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Appointments</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Today's Appointments</p>
            <p className="text-3xl font-bold text-[#1E3A8A]">—</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Total This Month</p>
            <p className="text-3xl font-bold text-[#1E3A8A]">—</p>
          </div>
        </div>

        {/* Consultations Card */}
        <div className="border rounded-xl shadow-lg bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Consultations</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Today</p>
            <p className="text-3xl font-bold text-[#1E3A8A]">—</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Pending Follow-ups</p>
            <p className="text-3xl font-bold text-[#1E3A8A]">—</p>
          </div>
        </div>

        {/* Clients Card */}
        <div className="border rounded-xl shadow-lg bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Clients</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">New This Week</p>
            <p className="text-3xl font-bold text-[#1E3A8A]">—</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Total Clients</p>
            <p className="text-3xl font-bold text-[#1E3A8A]">—</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
