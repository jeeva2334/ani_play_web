import React from 'react'
import { FaCalendar, FaRegCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NCard({item,index}) {
  return (
    <Link to={`/anime/${item.animeId}`} className='flex justify-around items-center cursor-pointer'>
        <div>
            <h1 className='text-xl font-bold text-white'>0{index +1}</h1>
        </div>
        <div className='flex justify-center items-start border-b-2 py-4 border-gray-600'>
            <img src={item.animeImg} className='w-20' />
            <div className=' ml-2'>
                <h1 className='text-xl w-40 font-bold text-white'>{item.animeTitle === "" ? item.animeId : item.animeTitle}</h1>
                <p className='flex justify-around items-center mt-3 font-bold text-white'>
                    <FaRegCalendar color='white' />{item.releasedDate}
                </p>
            </div>
        </div>
    </Link>
  )
}

export default NCard