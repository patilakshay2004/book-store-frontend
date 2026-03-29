import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaSearch } from 'react-icons/fa';

import BookCard from '../books/BookCard';
import { useSearchBooksByNameQuery } from "../../redux/features/books/booksApi";

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const { data = [], isLoading, error } = useSearchBooksByNameQuery(query, {
    skip: !query,
  });

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          🔍 Find Your Favorite Books
        </h2>
        <p className="text-gray-500">
          Search from hundreds of books instantly
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by book name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500">
          <p>⚠️ Something went wrong. Try again.</p>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && query && !isLoading && !error && (
        <div className="text-center text-gray-400">
          <p>No books found 😔</p>
        </div>
      )}

      {/* Results */}
      {data.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Navigation]}
        >
          {data.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="hover:scale-105 transition duration-300">
                <BookCard book={book} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default SearchBooks;