import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../Redux/Slices/userSlice'

function Navbar() {
  const {loggedInStatus} = useSelector((state)=>state.user)
  const {userData} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleLogout = async()=>{
    const res = await dispatch(logoutUser())
    if(res?.payload?.success){
      navigate('/')
    }
  }

  return (
    <div className='w-full py-5 px-10 bg-slate-800 border border-b-slate-600 flex justify-between'> 
        <h1 className='text-slate-500 text-2xl'>Dashboard <span className='text-orange-500'>App</span></h1>
        <div className='flex items-center gap-5'>
          {
            loggedInStatus ? (
              <button 
              onClick={handleLogout}
              className='px-5 py-1 bg-red-600 rounded-2xl text-slate-100 hover:bg-red-500 cursor-pointer'>Log out</button>
            ) : (
              <Link 
              to='/login'
              className='px-5 py-1 bg-blue-600 rounded-2xl text-slate-100 hover:bg-blue-500 cursor-pointer'>Sign in</Link>
            )
          }
          {
            userData.role === 'admin' && (
              <Link
              to='/'
              className='px-5 py-1 bg-green-600 rounded-2xl text-slate-100 hover:bg-green-500 cursor-pointer'
              >Admin</Link>
            )
          }
        </div>
    </div>
  )
}

export default Navbar