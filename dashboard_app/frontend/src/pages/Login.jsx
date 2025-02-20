import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  const onLogin = (e)=>{
    e.preventDefault()
    console.log(loginData)
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form 
      onSubmit={onLogin}
      className="w-96 bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Welcome Back 👋
        </h2>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Email</label>
          <input
            value={loginData.email}
            onChange={onValueChange}
            type="email"
            name="email"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-400 text-sm mb-1">Password</label>
          <input
            value={loginData.password}
            onChange={onValueChange}
            type={showPassword ? "text" : "password"} // 👈 Dynamic type change
            name="password"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-200 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <Link
          to="/forgetpassword"
          className="block text-right text-sm text-blue-400 hover:underline cursor-pointer mb-4"
        >
          Forgot Password?
        </Link>

        <div className="flex flex-col gap-3">
          <button className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition">
            Login 🚀
          </button>
          <Link
            to="/signup"
            className="text-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
          >
            Create an Account 📝
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
