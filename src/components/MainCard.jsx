import React from 'react'

function MainCard({item,index,handleBannerClick}) {
  return (
    <div onClick={()=>handleBannerClick(item.title.romaji)} id={`slide${index+1}`} className="carousel-item hover:translate-x-1 hover:-translate-y-1 duration-200 ease-in-out transition-all border-2 border-[#30f8d0] flex-col justify-start items-center h-[30rem] mr-10 bg-[#212121]">
        <div className='py-[1em] px-[2em]'>
            <img src={item.coverImage.extraLarge} alt="Burger" className='h-[300px] drop-shadow-2xl hover:opacity-70 transition-all ease-in-out duration-300' />
            <div>
                <h1 className='text-white text-center mt-2 w-52 text-xl font-bold'>{item.title.romaji}</h1>
                <h1 className='text-white text-center mt-1  text-xl font-bold'>#{index + 1} Trending</h1>
            </div>
        </div>
    </div>
  )
}

export default MainCard