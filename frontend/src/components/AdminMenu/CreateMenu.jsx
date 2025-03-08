import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateMenu = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [foodname, setFoodname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/type/get-type"
      );
      setTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };
  
  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/menu/menu-items?type=${selectedType}`
      );
      setMenuItems(response.data.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchQuery = e.target.value.toLowerCase();
    setSearchResults(
      menuItems.filter((item) =>
        item.foodname.toLowerCase().includes(searchQuery)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedType || !foodname || !price || !image) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("foodname", foodname);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/menu/add-item",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      fetchMenuItems(); 
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add menu item.");
    }
  };

  return (
    <>
      <div>
        <div style={{ padding: "20px" }}>
          <div className="flex gap-1" style={{ marginBottom: "10px" }}>
            <select
              className="border p-2 w-full mt-2 rounded-md h-[60px]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select menu type</option>
              {types?.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.type}
                </option>
              ))}
            </select>
            <div className="mt-5">
              <button
                className="bg-gray-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-gray-600 transition duration-200 w-[90px] h-[40px]"
                onClick={fetchMenuItems}
              >
                Filter
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Enter Food Item Name"
              className="border p-2 w-full mt-2 rounded-md h-[60px]"
              value={foodname}
              onChange={(e) => setFoodname(e.target.value)}
            />
          </div>
          <div className="flex gap-5" style={{ marginBottom: "10px" }}>
            <input
              type="number"
              placeholder="Enter Price"
              className="border p-2 w-full mt-2 rounded-md h-[60px]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mt-2 rounded-md h-[60px] cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <p className="mt-2 text-sm text-green-600">{image.name}</p>
            )}
          </div>
          <div
            className="flex justify-center gap-4"
            style={{ marginTop: "20px" }}
          >
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-200 w-[90px] h-[40px]"
              onClick={handleSubmit}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      <hr />

      {/* Search Section */}
      <div className="mt-5">
        <h2 className="text-xl font-bold">Search Menu Items:</h2>
        <input
          type="text"
          placeholder="Search food item..."
          className="border p-2 w-full mt-2 rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Menu Items:</h2>
        <ul className="mt-2">
          {searchTerm.length > 0 ? (
            searchResults.length > 0 ? (
              searchResults.map((item) => (
                <li key={item._id} className="border-b py-2">
                  <strong>{item.foodname}</strong> - ₹{item.price} (
                  {item.type.type})
                </li>
              ))
            ) : (
              <p>No matching items found</p>
            )
          ) : menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item._id} className="border-b py-2">
                <strong>{item.foodname}</strong> - ₹{item.price} (
                {item.type.type})
              </li>
            ))
          ) : (
            <p>No items found for the selected type</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default CreateMenu;