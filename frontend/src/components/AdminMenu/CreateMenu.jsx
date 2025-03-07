import React from "react";

const CreateMenu = () => {
  return (
    <>
      <div>
      <input
              type="text"
              placeholder="Enter menu item"
              className="border p-2 w-full mt-2 rounded-md"
            />
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-200">
              Add Item
            </button>
      </div>
    </>
  );
};

export default CreateMenu;
