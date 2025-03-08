import React from "react";
import axios from "axios";

const Status = ({ type, onClose, reservation }) => {
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const url = `http://localhost:5000/api/v1/reservation/${
        type === "Arrived" ? "arrived" : "cancel"
      }/${reservation}`;

      const response = await axios.put(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data.message);
      onClose(); 
      window.location.reload(); 
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0  flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] p-[50px]">
        <div
          className="w-full max-w-lg bg-white shadow-lg rounded-lg  relative"
          style={{ padding: "10px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
            viewBox="0 0 320.591 320.591"
            onClick={onClose}
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
          </svg>
          <div className="my-4 text-center" style={{ marginTop: "20px" }}>
            <h4 className="text-gray-800 text-base font-semibold mt-4">
              {type === "Arrived"
                ? "Are you sure they arrived?"
                : "Are you sure they are canceling?"}
            </h4>
            <div
              className="text-center space-x-4 mt-8 flex gap-5 justify-center"
              style={{ marginTop: "20px" }}
            >
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200 h-[40px] w-[90px]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-white text-sm w-[90px] ${
                  type === "Arrived"
                    ? "bg-green-600 hover:bg-green-700 active:bg-green-600"
                    : type === "Cancelled"
                    ? "bg-red-600 hover:bg-red-700 active:bg-red-600"
                    : "bg-gray-600 hover:bg-gray-700 active:bg-gray-600"
                }`}
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;