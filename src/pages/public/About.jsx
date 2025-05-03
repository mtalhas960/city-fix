import React from 'react'
import AboutHero from '../../components/AboutHero'
import Mission from '../../components/Mission'
import HowItWorks from '../../components/HowItWorks'
import Features from '../../components/Features'
import Team from '../../components/Team'
import Newsletter from '../../components/Newsletter'

const About = () => {
    return (
        <>
            <AboutHero />
            <Mission />
            <Features />
            <HowItWorks />
            <Team />
            <Newsletter />
        </>
    )
}

export default About