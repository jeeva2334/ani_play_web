import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { moreSearch, popular } from '../services/animeServices'
import PaginationComponent from '../components/Pagination';
import { useParams } from 'react-router-dom';

function MorePage() {
    const {id} = useParams()
    const [data,setData] = useState([]);
    const [f,sF] = useState([]);
    const [pop,setPop] = useState([]);
    const [loader,setLoader] = useState(false);
    useEffect(()=>{
        setLoader(true)
        sF([])
        setData([])
        setPop([])
        moreSearch(id).then((res)=>{
            console.log(res)
            setData(res);
            sF(res.splice(0,4))
            popular().then((res)=>{
                res = res.splice(0,6)
                setPop(res);
                setLoader(false)
            })
        }).catch(err=>{
            setLoader(false)
        })
    },[id])
    return (
        <div className='bg-[#060406]'>
            <Navbar />
            {loader === true &&
                <div className='mt-20 h-[60vh] flex justify-center'>
                    <div className="spinner mt-10"></div>
                </div>}
            <div className='mt-20 md:px-2 md:py-7 p-12'>
                <h1 className='text-[#30f8d0] font-bold text-2xl'>Trending</h1>
                <p>Top Trendings</p>
                <div className='mt-5 grid md:grid-cols-4 grid-cols-1 gap-4 place-content-center md:w-[70%]'>
                    {f.map((item)=>(<div className='h-[30rem] border w-[17rem] p-4 '>
                        <img src={item.image} className='h-96 hover:opacity-60 transition-all ease-in-out duration-500' />
                        <h1 className='text-white text-center font-bold text-xl'>{item.title}</h1>
                    </div>))}
                </div>
            </div>
            <PaginationComponent data={data} itemsPerPage={10} popularData={pop} type={"g"}  />
            <Footer />
        </div>
    )
}

export default MorePage