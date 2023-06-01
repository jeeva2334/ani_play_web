import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { popular, todayRelease, topSeasonal,topTrending } from '../services/animeServices'
import Carousel from '../components/Carousel';
import PaginationComponent from '../components/Pagination';
import Footer from '../components/Footer';
import MainCard from '../components/MainCard';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [banner,setBanner] = useState([]);
    const [trending,setTrending] = useState([]);
    const [recent,setRecent] = useState([]);
    const [popularData,setPopular] = useState([]);
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        setLoader(true)
        topSeasonal().then((res)=>{
            res.map(async(item)=>{
                item.description = removeHtmlTags(item.description);
                item.description = shortenParagraph(item.description)
            })
            setBanner(res)
        }).catch((err)=>{
            console.log(err)
        });
        topTrending().then((res)=>{
            setTrending(res)
        });
        todayRelease(1).then((res)=>{
            console.log(res);
            setRecent(res);
        })
        popular().then((res)=>{
            setPopular(res)
        })
        setLoader(false)
    },[])
    function removeHtmlTags(str) {
        str = str.replace(/(<([^>]+)>)/gi, '');
        str = str.replace(/\n/g, '');
        str = str.replace(/\(Source:[^\)]+\)/g, '');
        return str;
    }
    function shortenParagraph(paragraph) {
        if (paragraph.length <= 200) {
            return paragraph;
        } else {
            return paragraph.substr(0, 200 - 3) + '...';
        }
    }
    const handleBannerClick = async(id) => {
        const title = id.replaceAll(" ","-");
        const idA = title.replaceAll("[","");
        const idd = idA.replaceAll("]","");
        const finalRoute = idd.replaceAll(":","");
        if (finalRoute === "Dr.-STONE-NEW-WORLD"){
            return navigate('/anime/dr-stone-3rd-season')
        }
        navigate(`/anime/${finalRoute}`)
    }
    return (
        <div className='bg-[#011406]'>
            <Navbar />
            {loader === true &&
                <div className='mt-20 h-[60vh] flex justify-center'>
                    <div className="spinner mt-10"></div>
                </div>}
            <div className='mt-20'>
                <Carousel banner={banner} handleBannerClick={handleBannerClick} />
            </div>
            <div className='p-10'>
                <h1 className='text-[#30f8d0] font-bold text-2xl'>Trending</h1>
                <p className='text-gray-700 mt-2'>Swipe <span className='text-[#30f8d0]'>❯</span></p>
                <div className="carousel mt-6 p-2 bg-[#011406]">
                    {trending && trending.map((item,index)=>(<MainCard item={item} index={index} handleBannerClick={handleBannerClick} />))}
                </div>
                <h1 className='text-[#30f8d0] mb-10 font-bold text-2xl mt-20'>Recent Release</h1>
                <PaginationComponent data={recent} itemsPerPage={12} popularData={popularData} handleBannerClick={handleBannerClick} />
            </div>
            <Footer />
        </div>
    )
}

export default HomePage