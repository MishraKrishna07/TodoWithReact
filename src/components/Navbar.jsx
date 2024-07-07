import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-700 text-white py-2 '>
      <span className='flex text-white text-xl mx-9 font-bold '>iTask</span>
      <ul className="flex gap-10 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
