import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';

function Episode({episodes,name}) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 40;
    const handlePageChange = (selected) => {
        setCurrentPage(selected.selected);
    };

    const offset = currentPage * itemsPerPage;
    const paginatedData = episodes.slice(offset, offset + itemsPerPage);
    return (
        <div className='md: p-7'>
            <h1 className='text-[rgb(48,248,208)] font-bold text-2xl mb-5'>Episodes</h1>
            <div className='grid md:gap-4 gap-0  md:grid-cols-8 grid-cols-6 md:w-[%]'>
                {paginatedData && paginatedData.map((item,index)=>(<Link to={`/play/${item.id}/${name}`} className=' cursor-pointer'>
                    <div className='px-7 py-5 flex justify-center items-center border-2 w-12 text-white'>{item.number}</div>
                </Link>))}
            </div>
            <ReactPaginate
                previousLabel={'❮'}
                nextLabel={'❯'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(episodes.length/itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                className='flex justify-between text-white mt-5 md:w-[40%]'
            />
        </div>
    )
}

export default Episode