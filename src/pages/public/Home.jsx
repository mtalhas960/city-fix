import React from 'react'
import Hero from '../../components/Hero'
import HowItWorks from '../../components/HowItWorks'
import Features from '../../components/Features'
import Stats from '../../components/Stats'
import FAQ from '../../components/FAQ'
import Newsletter from '../../components/Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <FAQ />
      <Newsletter />
    </>
  )
}

export default Home