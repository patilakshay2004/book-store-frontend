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
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    🔍 Find Your Favorite Books
                </h2>
                <p className="text-gray-500">
                    Search from hundreds of books instantly
                </p>
            </div>

           {/* 🔍 Search */}
<div className="flex justify-center mb-10">
  <div className="relative w-full md:w-1/2 group">

    {/* Search Icon */}
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-blue-500 transition">
      🔍
    </span>

    {/* Input */}
    <input
      type="text"
      placeholder="Search books..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 transition-all duration-300"
    />

    {/* Clear Button */}
    {search && (
      <button
        onClick={() => setSearch("")}
        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500"
      >
        ✕
      </button>
    )}
  </div>
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