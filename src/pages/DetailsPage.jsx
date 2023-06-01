    import React, { useEffect, useState } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'
    import Navbar from '../components/Navbar'
    import { fetchBanner, fetchDetails } from '../services/animeServices'
    import { FaArrowLeft, FaRegCalendar, FaRegClock, FaSignLanguage, FaTypo3 } from 'react-icons/fa'
    import { IoLanguage, IoTvOutline } from 'react-icons/io5'
    import Episode from '../components/Episode'
    import Footer from '../components/Footer'
    import { Link } from 'react-router-dom'

    function DetailsPage() {
        const {id} = useParams()
        const [details,setDetails] = useState()
        const [episodes,setEpisodes] = useState([]);
        const [loader,setLoader] = useState(false);
        const [bannerImg,setBannerImg] = useState("");
        const nav = useNavigate();
        useEffect(()=>{
            setLoader(true)
            fetchDetails(id,setEpisodes).then((res)=>{
                console.log(res.episodes)
                fetchBanner(id).then((res)=>{
                    setBannerImg(res.bannerImage)
                    console.log(res)
                })
                res.description = shortenParagraph(res.description)
                setEpisodes(res.episodes)
                setDetails(res);
                setLoader(false)
            }).catch(err=>{
                console.log(err)
                setLoader(false)
            })
        },[])
        function shortenParagraph(paragraph) {
            if (paragraph.length <= 200) {
                return paragraph;
            } else {
                return paragraph.substr(0, 200 - 3) + '...';
            }
        }
        return (
            <div className=''>
                <Navbar />
                {loader === true &&
                <div className='mt-20 h-[60vh] flex justify-center'>
                    <div className="spinner mt-10"></div>
                </div>}
                {details && <div className='relative mt-20'>
                    <div style={{backgroundImage:"url('"+bannerImg+"')"}} className='md:h-[40rem] h-full bg-center bg-cover w-full'>
                        <div className='bg-opacity-60 backdrop-filter backdrop-blur-xl bg-black h-full flex-col flex md:flex-row md:justify-start justify-center items-start'>
                            <div className='px-7 mt-7 flex items-center cursor-pointer' onClick={()=>nav('/')}>
                                <FaArrowLeft size={20} color='white' />
                                <p className='text-white ml-2'>Home</p>
                            </div>
                            <div className='md:p-32 p-7 flex flex-col justify-center items-center md:flex-row w-full h-full '>
                                <div>
                                    <img src={details.image} className='w-72' />
                                </div>
                                <div className=' md:w-[34rem] ml-10'>
                                    <h1 className='text-gray-500 mt-4 md:mt-0 hover:text-white cursor-default transition-all ease-in-out duration-500'>Home . {id}</h1>
                                    <h1 className='text-white font-bold text-3xl mt-5'>{details.title}</h1>
                                    <p className='text-white mt-4 font-semibold'>{details.description}</p>
                                    <Link to={`/play/${episodes[0].id}/${id}`} className='btn mt-5 rounded-full bg-[#30f8d0] hover:bg-[#91ffe9] border-none text-black'>Watch now</Link>
                                    <p className='mt-5 text-white'>episode count - {details.totalEpisodes}</p>
                                </div>
                            </div>
                            <div className='bg-opacity-20 md:p-20 p-7 backdrop-filter backdrop-blur md:mr-9 bg-white md:h-[40rem] md:w-[40rem] w-full '>
                                <div className=''>
                                    <h1 className='text-white font-bold text-2xl mb-5'>Genre :</h1>
                                    <div className='grid grid-cols-3 gap-5'>
                                        {details.genres && details.genres.map((item)=>(<div className='cursor-pointer hover:bg-none transition-all text-white ease-in-out duration-200 hover:text-[rgb(48,248,208)] border-white hover:border-[rgb(48,248,208)] border-2 rounded-full flex justify-center items-center'>
                                            <h1 className='font-bold text-sm px-4 py-2 rounded-full'>{item}</h1>
                                        </div>))}
                                    </div>
                                </div>
                                <div className='mt-5 border-b-2 border-b-gray-400'></div>
                                <h1 className='text-white font-bold text-2xl mt-5 mb-5'>Info :</h1>
                                <div className='flex justify-between text-white items-center w-40'>
                                    <div className='flex'>
                                        <FaRegCalendar size={20} color='white' className='mr-1' />Released :
                                    </div>
                                    {details.releaseDate}
                                </div>
                                <div className='flex mt-5 justify-between text-white items-center w-40'>
                                    <div className='flex'>
                                        <FaRegClock  size={20} color='white' className='mr-1' />Status :
                                    </div>
                                    {details.status}
                                </div>
                                <div className='flex mt-5 justify-between text-white items-center w-40'>
                                    <div className='flex'>
                                        <IoLanguage  size={20} color='white' className='mr-1' />Sub or Dub :
                                    </div>
                                    {details.subOrDub}
                                </div>
                                <div className='flex mt-5 justify-between text-white items-center w-56'>
                                    <div className='flex'>
                                        <IoTvOutline  size={20} color='white' className='mr-1' />Type :
                                    </div>
                                    {details.type}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className='md:px-32 md:py-20 md:w-[60%]'>
                    <Episode episodes={episodes} name={id}/>
                </div>
                <Footer />
            </div>
        )
    }

    export default DetailsPage