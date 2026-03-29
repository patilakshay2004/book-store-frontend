import React, { useState } from 'react'
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const TopSellers = () => {

    const [search, setSearch] = useState("");

    const { data: books = [], isLoading } = useFetchAllBooksQuery();

    // 🔥 Filter only by search
    const filteredBooks = books.filter((book) =>
        book.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='py-10 max-w-7xl mx-auto px-6'>

            {/* Heading */}
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

            {/* 🔍 Search */}
            <div className='mb-8'>
                <input
                    type="text"
                    placeholder="Search book by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            {/* Loading */}
            {isLoading && <p className="text-center">Loading...</p>}

            {/* Empty */}
            {!isLoading && filteredBooks.length === 0 && (
                <p className="text-center text-gray-400">No books found 😔</p>
            )}

            {/* Swiper */}
            {filteredBooks.length > 0 && (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Pagination, Navigation]}
                >
                    {filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
};

export default TopSellers;