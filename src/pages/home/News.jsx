import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation, Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'

import news1 from "../../assets/news/news-1.png"
import news2 from "../../assets/news/news-2.png"
import news3 from "../../assets/news/news-3.png"
import news4 from "../../assets/news/news-4.png"

const news = [
  {
    id: 1,
    title: "Global Climate Summit Calls for Urgent Action",
    description: "World leaders gather to discuss urgent strategies to combat climate change and promote renewable energy.",
    image: news1
  },
  {
    id: 2,
    title: "Breakthrough in AI Technology Announced",
    description: "New advancements in AI promise to revolutionize industries from healthcare to finance.",
    image: news2
  },
  {
    id: 3,
    title: "New Space Mission Aims to Explore Galaxies",
    description: "NASA plans a mission to explore distant galaxies and uncover secrets of the universe.",
    image: news3
  },
  {
    id: 4,
    title: "Stock Markets Reach Record Highs",
    description: "Global markets hit record highs as economic recovery continues worldwide.",
    image: news4
  }
]

const News = () => {
  return (
    <section className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <h2 className="text-3xl font-semibold mb-8">📰 Latest News</h2>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          modules={[Navigation, Autoplay]}
        >

          {news.map((item) => (
            <SwiperSlide key={item.id}>

              {/* 🔥 Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col sm:flex-row gap-6 items-center">

                {/* 📸 Image (UNCHANGED SIZE) */}
                <div className="sm:w-1/2 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover rounded-lg"
                  />
                </div>

                {/* 📝 Content */}
                <div className="sm:w-1/2 w-full">

                  <Link to="/">
                    <h3 className="text-lg font-semibold hover:text-blue-600 mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="w-10 h-[3px] bg-blue-600 mb-3"></div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <Link
                    to="/"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Read More →
                  </Link>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </section>
  )
}

export default News