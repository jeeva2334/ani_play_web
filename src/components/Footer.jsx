import React from 'react'
import { FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <div className='relative'>
        <div style={{ backgroundImage: 'url("https://64.media.tumblr.com/307900c6c86203626347cf3b16db2364/tumblr_pqzrhvnDIG1w0po92_1280.jpg")',opacity:'10' }} className='hero h-72 w-full bg-cover bg-center'>
            <div className='hero-overlay  bg-opacity-90 bg-[#212121]'></div>
            <div className='p-10 h-full w-full flex-col items-start'>
                <div className='flex justify-start mb-5 items-start'>
                    <img src={logo} className='w-12 h-12 -mt-2' />
                    <h1 className='text-white text-3xl font-bold'>Ani Play</h1>
                </div>
                <div className="flex-col justify-start items-center border-b-2 border-gray-400 p-2 text-gray-400 grid-flow-col">
                    <p className='md:w-[30rem] mb-3'>Ani play is an EDUCATIONAL PUROPSED project,it is open source anime player where you can stream any anime </p>
                    <p>Copyright © 2023 - All right reserved</p>
                    <div className='flex justify-center items-center absolute top-0 right-10 w-40 mt-5'>
                        <p>Join Us - </p>
                        <a href='https://www.youtube.com/@amvedits55' target='_blank'><FaYoutube size={21} color='white' className='ml-2'/></a>
                        <a href='https://instagram.com/a_m_v_edits?igshid=MzRlODBiNWFlZA==' target='_blank'><FaInstagram size={21} color='white' className='ml-2' /></a>
                        <a href='https://github.com/jeeva2334/aniplay.git' target='_blank'><FaGithub size={21} color='white' className='ml-2' /></a>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Footer