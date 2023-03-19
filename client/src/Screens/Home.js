import React from 'react'
import Header from '../components/header'
import ProductsCard from '../components/Products'
import Main from '../components/Main'
import Footer from '../components/Footer'
function Home() {
  return (
    <div>
      <Header/>
      <Main/>
      <ProductsCard/>
      <Footer/>
    </div>
  )
}

export default Home
