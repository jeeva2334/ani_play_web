import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReactPlayer from 'react-player';
import { fetchBanner, fetchDetails, videoPlay } from '../services/animeServices';
import { useNavigate, useParams } from 'react-router-dom';
import Episode from '../components/Episode';
import { IoSettingsOutline } from 'react-icons/io5';
import Select from 'react-select';
import { FaArrowLeft } from 'react-icons/fa';

function VideoPage() {
    const {id,name} = useParams();
    const [episode,setEpisode] = useState([]);
    const [quality,setQuality] = useState([]);
    const [selected,setSeleceted] = useState("");
    const [playingUrl,setPlayingUrl] = useState("");
    const [urls,setUrls] = useState([]);
    const [loader,setLoader] = useState(false);    
    const [banner,setBanner] = useState("")
    useEffect(()=>{
        console.log(name);
        setLoader(true);
        videoPlay(id).then((res)=>{
            console.log(res)
            const q = res.sources.map((item)=>[{value:item.quality.toString(),label:item.quality.toString()}])
            const ql = [].concat(...q);
            setQuality(ql)
            console.log(ql)
            const urlsss = res.sources.map((item)=>[{url:item.url,quality:item.quality}])
            const playing = res.sources.find((item)=>item.quality === "default" && setPlayingUrl(item.url))
            const urls = [].concat(...urlsss)
            setUrls(urls)
        }).catch((err)=>{
            console.log(err)
            setLoader(false);
        })
        fetchBanner(name).then((res)=>{
            setBanner(res.bannerImage);
        })
        fetchDetails(name).then((res)=>{
            setEpisode(res.episodes)
            setLoader(false);
        }).catch((err)=>{
            console.log(err)
            setLoader(false);
        })
    },[id,name])
    const handleChangeQuality = async(e) =>{
        setLoader(true)
        setSeleceted(e.target.value)
        setPlayingUrl("");
        const playing = urls.find((item)=>item.quality === selected && setPlayingUrl(item.url))
        setLoader(false)
    }
    const nav = useNavigate()
    return (
        <div className='bg-[#060406]'>
            <Navbar />
            {loader === true &&
                <div className='mt-20 h-[60vh] flex justify-center'>
                    <div className="spinner mt-10"></div>
                </div>}
            {urls&&<div className='bg-center bg-cover ' style={{backgroundImage:"url('"+banner+"')"}}>
                <div className='bg-opacity-60 backdrop-filter backdrop-blur-xl bg-black  h-full p-2'>
                <div className='mt-[4.8rem] px-12 py-4 flex items-center hover:cursor-pointer' onClick={()=>nav(`/anime/${name}`)}>
                    <FaArrowLeft size={20} color='white'/>
                    <p className=' ml-2 text-white font-bold'>{name}</p>
                </div>
                <div className=' flex flex-col md:justify-around md:items-center md:flex-row '>
                    <div className='mt-0 md: md:h-[45rem] border-none'>
                        <ReactPlayer
                            url={playingUrl}
                            controls
                            height="100%"
                            width="100%"
                            playing
                        />
                    </div>
                <div className='md:w-[40vw]'>
                    <div className='h-12 flex justify-around items-center'>
                        <h1 className='text-white text-2xl flex justify-center items-center w-36 font-bold p-4'><IoSettingsOutline size={40} />Quality</h1>
                        <select className="select mt-2 bg-black text-white border-none" onChange={(e)=>handleChangeQuality(e)}>
                            <option disabled selected>Choose a quality</option>
                            {quality && quality.map((item)=>(<option>{item.label}</option>))}
                        </select>
                    </div>
                    <Episode episodes={episode} name={name} />
                </div>
            </div>
            </div>
            </div>}
            <Footer />
        </div>
    )
}

export default VideoPage