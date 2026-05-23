import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // UPLOAD IMAGE
  const uploadImage = async () => {
    if (!image) return alert("Please select image");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", image);

      // TOKEN
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:5000/api/users/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // UPDATED USER
      const updatedUser = {
        ...user,
        avatar: data.avatar,
      };

      // UPDATE LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Profile picture uploaded successfully");

      // Automatically close after 1.5s
      setTimeout(() => {
        setShowPreview(false);
      }, 1500);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl font-bold text-slate-600 hover:bg-red-500 hover:text-white transition duration-300"
        >
          ×
        </button>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="profile"
            onClick={() => setShowPreview(true)}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg cursor-pointer hover:scale-105 transition duration-300"
          />
        </div>

        {/* USER NAME */}
        <h2 className="text-3xl font-bold dark:text-white mb-2">{user?.name}</h2>

        {/* FULLSCREEN IMAGE PREVIEW */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-8 right-8 text-white text-5xl font-bold hover:scale-110 transition"
            >
              ×
            </button>
            <img
              src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="preview"
              className="max-w-[90%] max-h-[90vh] rounded-3xl shadow-2xl object-contain"
            />
          </div>
        )}

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-3"
        />

        {/* BUTTON */}
        <button
          onClick={uploadImage}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          {loading ? "Uploading..." : "Upload Profile Picture"}
        </button>
      </div>
    </div>
  );
};

export default Profile;