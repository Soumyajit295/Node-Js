import React, { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../Redux/Slices/userSlice';

function UserCard() {
  const [userData,setUserData] = useState({})
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await dispatch(getProfile())
      if(res?.payload?.success){
        setUserData(res?.payload?.data)
      }
    }
    fetchData()
  },[])
  return (
    <div className='w-[420px] h-[200px] bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl shadow-lg p-5 flex items-center text-white'>
      <div className='w-1/3 flex justify-center items-center'>
        <img
          className='w-24 h-24 rounded-full border-4 border-gray-500 shadow-md object-cover'
          src={userData?.avatar}
          alt="User"
        />
      </div>

      <div className="h-[70%] w-[2px] bg-gray-400 opacity-50 mx-3"></div>

      <div className='w-2/3 flex flex-col justify-between gap-5 p-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-semibold'>Name: {userData?.name}</h1>
          <button className='w-8 h-8 flex justify-center items-center bg-blue-600 hover:bg-blue-500 rounded-full shadow-md transition cursor-pointer'>
            <FiEdit3 className='text-white text-lg' />
          </button>
        </div>
        <div className=''>
          <h1 className='text-gray-300'>Email: {userData?.email}</h1>
        </div>
        <button className='mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition cursor-pointer'>
          <AiFillDelete className='text-lg' />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
