import React, { useState } from "react";

function ResetPasswordForm() {
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const handleResetPassword = (e)=>{
    e.preventDefault()
    console.log(password,confirmPassword)
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <form 
        onSubmit={handleResetPassword}
        className="w-96 bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-4">
            Reset Password 🔑
        </h2>

        <p className="text-gray-400 text-sm text-center mb-4">
            Enter your new password below.
        </p>
        <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">New Password</label>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="text"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
            Confirm Password
            </label>
            <input
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            type="text"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
            />
        </div>
        <button className="cursor-pointer w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition">
            Reset Password 🔄
        </button>
        </form>
    </div>
  );
}

export default ResetPasswordForm;
