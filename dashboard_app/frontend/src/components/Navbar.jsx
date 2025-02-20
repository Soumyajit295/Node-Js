import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {
  const {loggedInStatus} = useSelector((state)=>state.user)

  return (
    <div className='w-full py-5 px-10 bg-slate-800 border border-b-slate-600 flex justify-between'> 
        <h1 className='text-slate-500 text-2xl'>Dashboard <span className='text-orange-500'>App</span></h1>
        <div>
          {
            loggedInStatus ? (
              <button className='px-5 py-1 bg-red-600 rounded-2xl text-slate-100 hover:bg-red-500 cursor-pointer'>Log out</button>
            ) : (
              <Link 
              to='/login'
              className='px-5 py-1 bg-blue-600 rounded-2xl text-slate-100 hover:bg-blue-500 cursor-pointer'>Sign in</Link>
            )
          }
        </div>
    </div>
  )
}

export default Navbar