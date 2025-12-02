import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'


function SearchBar({data}) {

    const[input,setInput]=useState( data ? data : '')
    const navigate = useNavigate()

    const onSearchHandler = (e)=>{
        e.preventDefault()
        navigate('/courseList/'+input)
    }


  return (
    <form onSubmit={onSearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500 rounded' >
        <img className='md:w-auto w-10 px-3' src={assets.search_icon} alt="" />
        <input onChange={(e)=>setInput(e.target.value)} defaultValue={data} className='w-full h-full outline-none text-gray-500' type="text" placeholder='Search for courses' />
        <button className='bg-blue-600 md:py-3 py-2 mx-1 rounded text-white md:px-10 px-7 cursor-pointer'>Search</button>

    </form>
  )
}

export default SearchBar
