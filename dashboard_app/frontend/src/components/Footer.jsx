import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  const currentDate = new Date().toLocaleDateString()

  return (
    <div className='w-full py-5 px-10 bg-slate-800 border border-b-slate-600 flex justify-between items-center'> 
      <h1 className='text-slate-500 text-xl'>Dashboard <span className='text-orange-500'>App</span></h1>
      <h1 className='text-slate-500'>Made with 😎 Soumyajit</h1>
      <h1 className='text-slate-500'>{currentDate}</h1>
    </div>
  );
}

export default Footer;
