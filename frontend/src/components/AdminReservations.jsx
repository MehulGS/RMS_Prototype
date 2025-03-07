import React, { useEffect, useState } from "react";
import axios from "axios";
import Status from "./Model/Status";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userRole === "manager") {
      fetchReservations(currentPage);
    }
  }, [userRole, currentPage]);

  const fetchReservations = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/v1/reservation/guestList?page=${page}&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReservations(response.data.reservations);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleAction = (type, reservation) => {
    setActionType(type);
    setSelectedReservation(reservation._id);
    setPopupVisible(true);
  };

  return (
    <div className="font-sans overflow-x-auto p-4">
      {userRole !== "manager" ? (
        <p className="text-red-500 font-semibold">
          Access denied. Only managers can view reservations.
        </p>
      ) : (
        <div style={{padding:"20px"}}>
          <div className="shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-100 h-[30px]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Guest Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 h-[30px]" style={{borderBottom:"2px solid black"}}>
                {reservations.map((reservation, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {reservation.firstName} {reservation.lastName}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm ${
                        reservation.status === "Arrived"
                          ? "text-green-600"
                          : reservation.status === "Cancelled"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {reservation.status}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {reservation.date}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {reservation.time}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {reservation.phone}
                    </td>
                    <td className="px-4 py-4 text-sm text-green-800 flex gap-4">
                      <button
                        className={`${
                          reservation.status === "Cancelled"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-Green-200 hover:text-green-800"
                        }`}
                        onClick={() => {
                          if (reservation.status !== "Cancelled") {
                            handleAction("Arrived", reservation);
                          }
                        }}
                        disabled={reservation.status === "Cancelled"}
                      >
                        Arrived
                      </button>
                      <button
                        className={`${
                          reservation.status === "Arrived"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:text-red-800"
                        }`}
                        onClick={() => {
                          if (reservation.status !== "Arrived") {
                            handleAction("Cancelled", reservation);
                          }
                        }}
                        disabled={reservation.status === "Arrived"}
                      >
                        Cancelled
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{marginTop:"20px"}}>
            <div className="flex gap-5 justify-center items-center mt-4">
              <button
                className={`px-4 py-2 mx-2 border rounded h-[30px] w-[90px] ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-4 py-2 mx-2 border rounded  h-[30px] w-[90px] ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
      {popupVisible && (
        <Status
          type={actionType}
          onClose={() => setPopupVisible(false)}
          reservation={selectedReservation}
        />
      )}
    </div>
  );
};

export default AdminReservations;
