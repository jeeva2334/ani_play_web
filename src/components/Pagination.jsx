import React, { useState } from 'react';    
import ReactPaginate from 'react-paginate';
import NCard from './NCard';
import { Link } from 'react-router-dom';

const PaginationComponent = ({ data, itemsPerPage,popularData,type }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selected) => {
        setCurrentPage(selected.selected);
    };

    const offset = currentPage * itemsPerPage;
    const paginatedData = data.slice(offset, offset + itemsPerPage);
    console.log(paginatedData)

    return (
        <div className='flex md:flex-row flex-col justify-start items-start'>
            <div className='md:w-[80%] md:pr-12'>
                <div className='grid grid-cols-2 place-content-center md:gap-12 gap-6 md:grid-cols-4'>
                {/* Render your paginated data */}
                {type==="g" ?paginatedData.map((item, index) => (
                    <Link to={`/anime/${item.id}`} className="p-2 hover:translate-x-1 hover:-translate-y-1 duration-200 ease-in-out transition-all flex flex-col justify-center items-center bg-[#212121]">
                        <img src={item.image} alt="Burger" className='h-[200px] drop-shadow-2xl hover:opacity-70 transition-all ease-in-out duration-300' />
                        <div>
                            <h1 className='text-white text-center mt-2  text-xl font-bold'>{item.title === "" ? item.id : item.title}</h1>
                        </div>
                    </Link>
                )) :paginatedData.map((item, index) => (
                    <Link to={`/play/${item.episodeId}/${item.id}`} className="p-2 hover:translate-x-1 hover:-translate-y-1 duration-200 ease-in-out transition-all flex flex-col justify-center items-center bg-[#212121]">
                        <img src={item.image} alt="Burger" className='h-[200px] drop-shadow-2xl hover:opacity-70 transition-all ease-in-out duration-300' />
                        <div>
                            <h1 className='text-white text-center mt-2  text-xl font-bold'>{item.title === "" ? item.id : item.title}</h1>
                            <h1 className='text-white text-center mt-1  text-xl font-bold'>Episode - {item.episodeNumber}</h1>
                        </div>
                    </Link>
                ))}
                </div>

                {/* Render the pagination component */}
                <ReactPaginate
                    previousLabel="❮"
                    nextLabel="❯"
                    pageCount={Math.ceil(data.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    className='flex w-full md:w-[30%] justify-around items-center mt-3 text-white'
                />
            </div>
            <div className='md:w-[20%] w-full mt-10 md:mt-0 h-full'>
                <div className='h-[65rem] bg-[#212121]'>
                    <div className='w-full h-16 p-4 bg-[#2e2e2e]'>
                        <h1 className='text-[rgb(48,248,208)] font-bold text-2xl'>Popular Anime</h1>
                    </div>
                    {popularData && popularData.map((item,index)=>(<NCard item={item} index={index} />))}
                </div>
            </div>
        </div>
    );
};

export default PaginationComponent;
