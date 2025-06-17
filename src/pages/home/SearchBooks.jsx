import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon

import BookCard from '../books/BookCard';
import { useSearchBooksByNameQuery } from "../../redux/features/books/booksApi";

const SearchBooks = () => {
    const [query, setQuery] = useState('');
    const { data = [], isLoading, error } = useSearchBooksByNameQuery(query, { skip: !query });

    return (
        <div className="py-16 px-6">
            <div className="flex justify-center mb-4">
                <div className="relative w-96">
                    {/* Search Icon Inside the Input */}
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search book by name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {isLoading && (
                <div className="text-center">
                    <p>Loading...</p>
                    {/* You could add a spinner here */}
                </div>
            )}

            {error && (
                <div className="text-center text-red-500">
                    <p>Something went wrong: {error.message || 'Please try again later'}</p>
                </div>
            )}

            {data.length === 0 && query && !isLoading && !error && (
                <div className="text-center text-gray-500">
                    <p>No books found matching your query.</p>
                </div>
            )}

            {data.length > 0 && (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 40 },
                        1024: { slidesPerView: 2, spaceBetween: 50 },
                        1180: { slidesPerView: 3, spaceBetween: 50 },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {data.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default SearchBooks;
