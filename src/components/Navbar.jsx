import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import {motion} from 'framer-motion'

function Navbar() {
    const navRef = useRef();

    const menuVariants = {
        open: {
          opacity: 1,
          x: 0,
        },
        closed: {
          opacity: 0,
          x: '-100%',
        },
  
    }

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

    const [showSearch,setShowSearch] = useState(false);

    const handleShow = () =>{
        setShowSearch(!showSearch)
    }

    const [user,setUser] = useState({});

    useEffect(()=>{
        const g = localStorage.getItem('user')
        if(g) setUser(g)
        else setUser()
    },[])
    
    const nav = useNavigate();

    return (
        <div>
            <header className="">
                <Link to='/' className="text-2xl md:ml-20 text-[#f4fbfb] font-[Fira Sans] font-bold flex w-[14rem] justify-center items-center"><img src={logo} className="w-10 h-9" />Ani-Play</Link>
                <nav ref={navRef}>
                    <Link to="/">Home</Link>
                    <Link to="/top-airing">Top Airing</Link>
                    <Link to="/anime-movies">Movies</Link>
                    {user?<Link to='/'>Profile</Link>:<Link to="/login">Login</Link>}
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button>
                    <FaSearch color='white' size={20} onClick={()=>nav('/search')} />
                </button>
                <button
                    className="nav-btn"
                    onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </div>
    )
}

export default Navbar