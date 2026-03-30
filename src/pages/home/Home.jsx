import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommened'
import News from './News'
import SearchBooks from './SearchBooks'
const Home = () => {
  return (
    <>
        <Banner/>
        {/* <SearchBooks/> */}
        <TopSellers/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home