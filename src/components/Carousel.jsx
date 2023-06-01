import { Carousel } from 'antd';
import React,{ useEffect, useRef } from 'react';

function CarouselBanner({banner,handleBannerClick}) {
    const index = useRef()
    const prevButton = () =>{
        index.current.prev()
    }
    const nextButton = () =>{
        index.current.next()
    }
    const config = {
        duration: 1000,
        easing: 'ease-in-out',
        delay: 0,
        distance: '0px',
        origin: 'bottom',
    };
    return (
        <Carousel 
            autoplay
            draggable={true}
            ref={index}
            fade={true}
            className=''
            dotPosition='right'
        >
            {banner && banner.map((item,index)=>(
                <div id={`slide${index + 1}`} className="carousel-item relative w-full bg-none overflow-hidden">
                    <div className="hero" style={{ backgroundImage: 'url("' + item.coverImage.extraLarge + '")' }}>
                        <div className="hero-overlay bg-[#060406] bg-opacity-60"></div>
                        <div className="flex w-full h-[20rem] text-left md:p-10 p-4 justify-end items-end md:justify-start md:h-[35rem] text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 md:text-5xl text-3xl font-bold">{item.title.romaji}</h1>
                                <p className="mb-5 text-sm md:text-xl">{item.description}</p>
                                <button className="btn bg-[#30f8d0] hover:translate-x-5 transition-all duration-600 hover:bg-[#91ffe9] border-none text-[#011406]" onClick={()=>handleBannerClick(item.title.romaji)}>Watch Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute p-3 flex flex-col-reverse justify-between bg-transparent transform bottom-0 right-0">
                        <div>
                            <div className='w-2 rounded-full bg'></div>
                        </div>
                        <div className='mt-1 mb-3'>
                            <button onClick={prevButton} className="btn bg-[#30f8d0] hover:bg-[#91ffe9] border-none">❮</button> 
                        </div>
                        <button onClick={nextButton}  className="btn bg-[#30f8d0] hover:bg-[#91ffe9] border-none">❯</button>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}

export default CarouselBanner