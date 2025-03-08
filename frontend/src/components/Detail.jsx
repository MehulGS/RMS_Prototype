import React, { useState } from "react";
import AdminReservations from "./AdminReservations";
import CreateMenu from "./AdminMenu/CreateMenu";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4 md:h-full fixed md:relative top-0 left-0 z-10">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li
            className={`p-2 cursor-pointer rounded-md transition-colors duration-200 ${
              activeTab === "reservation" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("reservation")}
          >
            Reservation
          </li>
          <li
            className={`p-2 cursor-pointer rounded-md transition-colors duration-200 ${
              activeTab === "menu" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            Menu
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        {activeTab === "reservation" && (
          <div className="p-5">
            <div className="" style={{ padding: "20px" }}>
              <h2 className="text-2xl font-bold mb-4">Reservations</h2>
            </div>
            <AdminReservations />
          </div>
        )}
        {activeTab === "menu" && (
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Create Menu</h2>
            <CreateMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
