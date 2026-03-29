import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import BookCard from '../books/BookCard'
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'

const Recommended = () => {

  const { data: books = [], isLoading } = useFetchAllBooksQuery()

  // 🔥 Better logic (example: latest books)
  const recommendedBooks = [...books]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)

  return (
    <section className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* ✅ Proper Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              📚 Latest Book Releases
            </h2>
            <p className="text-gray-500 mt-1">
              Discover the newest arrivals added to our collection. Stay updated with fresh titles across all genres.
            </p>
          </div>

          <button className="text-blue-600 font-medium hover:underline hidden md:block">
            Explore All →
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-60 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        )}

        {/* Swiper */}
        {!isLoading && recommendedBooks.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            modules={[Pagination, Navigation, Autoplay]}
          >
            {recommendedBooks.map((book) => (
              <SwiperSlide key={book._id}>
                <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-lg transition hover:-translate-y-1">
                  <BookCard book={book} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Empty */}
        {!isLoading && recommendedBooks.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No new books available right now 😔
          </p>
        )}

      </div>
    </section>
  )
}

export default Recommended