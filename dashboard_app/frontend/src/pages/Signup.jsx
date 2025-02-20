import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function SignupForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  function onValueChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (!uploadImage) {
      toast.error("Failed to upload the avatar");
      return;
    }
    setUserData({
      ...userData,
      avatar: uploadImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(fileReader.result);
    });
  }

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="w-96 bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Create an Account 📝
        </h2>

        <div className="flex justify-center mb-4">
          <label className="relative cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-500 w-20 h-20" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Full Name</label>
          <input
            value={userData.name}
            onChange={onValueChange}
            type="text"
            name="name"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Email</label>
          <input
            value={userData.email}
            onChange={onValueChange}
            type="email"
            name="email"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-2 relative">
          <label className="block text-gray-400 text-sm mb-1">Password</label>
          <input
            value={userData.password}
            onChange={onValueChange}
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Create a password"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-200 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition">
            Sign Up 🚀
          </button>
          <Link
            to="/login"
            className="text-center w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
          >
            Already have an account? Login 🔑
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
