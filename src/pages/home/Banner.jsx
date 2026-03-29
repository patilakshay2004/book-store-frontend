import React from "react";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Image */}
      <div className="flex justify-center md:justify-end">
        <img
          src={bannerImg}
          alt="Books Banner"
          className="w-full max-w-md drop-shadow-xl hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Discover <span className="text-blue-600">New Releases</span> This Week 📚
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Upgrade your reading list with the latest and greatest books. From thrilling adventures to inspiring stories, explore fresh releases curated just for you.
        </p>

        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
            Explore Now
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-10">
          <div>
            <h3 className="text-xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-500 text-sm">Books Available</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-500 text-sm">New Releases</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-600">1k+</h3>
            <p className="text-gray-500 text-sm">Happy Readers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;