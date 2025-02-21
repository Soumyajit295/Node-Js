import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, sendOTP } from "../Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

function OTPForm() {
  const [otp, setOtp] = useState("");
  const {userData} = useSelector((state)=>state.user)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onOTPsend = async()=>{
    await dispatch(sendOTP())
  }

  const onDelete = async(e)=>{
    e.preventDefault()
    const res = await dispatch(deleteAccount({userId : userData._id,otp : otp}))
    if(res?.payload?.sucess){
        navigate('/')
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form 
      onSubmit={onDelete}
      className="w-80 bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Send OTP
        </h2>

        <div className="relative">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
            placeholder="Enter your OTP"
          />
          <button
            onClick={onOTPsend}
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition"
          >
            Send OTP
          </button>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition">
          Delete Account
        </button>
      </form>
    </div>
  );
}

export default OTPForm;
