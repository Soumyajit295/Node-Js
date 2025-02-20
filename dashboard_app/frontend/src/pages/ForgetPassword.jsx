import React, { useState } from "react";

function ForgotPasswordForm() {
  const [email,setEmail] = useState('')

  const handleForgetPassword = (e)=>{
    e.preventDefault()
    console.log(email)
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <form 
        onSubmit={handleForgetPassword}
        className="w-96 bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-4">
            Forgot Password? 🔒
        </h2>

        <p className="text-gray-400 text-sm text-center mb-4">
            Enter your email below to receive a password reset link.
        </p>

        <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            />
        </div>

        <button className="cursor-pointer w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition">
            Send Reset Link 📩
        </button>
        </form>
    </div>
  );
}

export default ForgotPasswordForm;
