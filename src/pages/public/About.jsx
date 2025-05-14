import AboutHero from '../../components/AboutHero'
import Mission from '../../components/Mission'
import HowItWorks from '../../components/HowItWorks'
import Features from '../../components/Features'
import Team from '../../components/Team'
import Newsletter from '../../components/Newsletter'
import { useEffect } from 'react'
import { settingsApi } from '../../api'

const About = () => {
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await settingsApi.getPublicSettings();
                console.log("Public Settings:", response);
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };

        fetchSettings();
    }, []);
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