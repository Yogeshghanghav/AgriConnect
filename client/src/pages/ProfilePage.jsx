import React, { useState } from "react";
import axios from "../utils/axiosInstance";

const ProfilePage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || {});
  const [preview, setPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (avatarFile) formData.append("avatar", avatarFile);

    const res = await axios.put("/update-profile", formData);
    localStorage.setItem("user", JSON.stringify(res.data));
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />
          {(preview || user.avatar) && (
            <img
              src={preview || `http://localhost:5000${user.avatar}`}
              alt="Avatar"
              className="w-24 h-24 rounded-full mt-3 object-cover border-2 border-green-600"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
