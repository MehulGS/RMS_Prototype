import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateMenu = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [foodname, setFoodname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
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
    fetchTypes();
  }, []);

  console.log(types);

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
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add menu item.");
    }
  };

  console.log("Selected Type ID:", selectedType);

  return (
    <>
      <div>
        <div style={{ padding: "20px" }}>
          <div className="flex gap-5" style={{ marginBottom: "10px" }}>
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
          <div className="flex justify-center" style={{ marginTop: "20px" }}>
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
    </>
  );
};

export default CreateMenu;
