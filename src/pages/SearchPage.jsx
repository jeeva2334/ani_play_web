import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { search } from '../services/animeServices';
import NCard from '../components/NCard';
import { Link } from 'react-router-dom';

function SearchPage() {
    const [searchText,setSearch] = useState("");
    const [searched,setSearched] = useState(false);
    const [result,setResult] = useState([]);
    const [loader,setLoader] = useState(false);
    const handleSearch = () =>{
        setLoader(true);
        search(searchText).then((res)=>{
            console.log(res)
            setResult(res.results)
            setSearched(true)
            setLoader(false);
        }).catch(err=>{
            console.log(err)
            setLoader(false);
        })
    }
    return (
        <div>
            <Navbar />
            {loader === true &&
            <div className='mt-20 h-[60vh] flex justify-center'>
                <div className="spinner mt-10"></div>
            </div>}
            <div className='mt-20'>
                <div className="justify-around items-center pt-5 mb-10 flex md:flex-row flex-row">
                    <div>
                        <h1 className='font-bold text-2xl text-white'>Search</h1>
                    </div>
                    <div className="search">
                        <div className="search-box">
                            <div className="search-field">
                                <input placeholder="Search..." className="inputt" type="text" onChange={(e)=>setSearch(e.target.value)} value={searchText} />
                                <div className="search-box-icon">
                                    <button className="btn-icon-content" onClick={()=>handleSearch()}>
                                        <i className="search-icon">
                                            <svg xmlns="://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path></svg>
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {searched === false && <div className='h-[70vh] md:px-32 p-7'>
                <h1 className='text-2xl text-white font-bold'>Search To show results</h1>
            </div>}
            {searched === true && result.length === 0 && <div className='h-[70vh] md:px-32 p-7'>
                <h1 className='text-2xl text-white font-bold'>No results found</h1>
            </div>}
            <div className='p-7 md:px-32 md:py-7 h-[70vh] grid grid-cols-2 md:grid-cols-4 gap-4 overflow-auto'>
                {result.length !== 0 && result.map((item)=>(
                    <Link to={`/anime/${item.id}`} className="p-2 hover:translate-x-1 hover:-translate-y-1 duration-200 ease-in-out transition-all flex flex-col justify-center items-center bg-[#212121]">
                        <img src={item.image} alt="Burger" className='h-[200px] drop-shadow-2xl hover:opacity-70 transition-all ease-in-out duration-300' />
                        <div>
                            <h1 className='text-white text-center mt-2  text-xl font-bold'>{item.title === "" ? item.id : item.title}</h1>
                            <h1 className='text-white text-center mt-1  text-xl font-bold'>Episode - {item.episodeNumber}</h1>
                        </div>
                    </Link>
                )) }
            </div>
            <Footer />
        </div>
    )
}

export default SearchPage