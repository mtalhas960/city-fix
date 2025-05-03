import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pin from "./utils/Pin"

const Hero = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 z-0"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/20 via-pink-500/20 to-blue-500/20"></div>

                <div className="absolute w-6 h-9 top-1/2 left-1/2 animate-bounce hidden md:block">
                    <Pin color="#ec4899" />
                </div>
                <div className="absolute w-6 h-9 top-[45%] left-[10%] animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="75" fill="#9333ea">
                        <path d="M12 0c-4.4 0-8 3.6-8 8 0 5.4 7.1 15.5 7.4 16 .2.3.6.5.9.5.3 0 .7-.2.9-.5.3-.5 7.4-10.6 7.4-16 0-4.4-3.6-8-8-8zm0 11.8c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z" stroke="white" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute w-6 h-9 top-[25%] left-[35%] animate-pulse hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="75" fill="#ec4899">
                        <path d="M12 0c-4.4 0-8 3.6-8 8 0 5.4 7.1 15.5 7.4 16 .2.3.6.5.9.5.3 0 .7-.2.9-.5.3-.5 7.4-10.6 7.4-16 0-4.4-3.6-8-8-8zm0 11.8c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z" stroke="white" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute w-6 h-9 top-[40%] left-[75%] animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="75" fill="#14b8a6">
                        <path d="M12 0c-4.4 0-8 3.6-8 8 0 5.4 7.1 15.5 7.4 16 .2.3.6.5.9.5.3 0 .7-.2.9-.5.3-.5 7.4-10.6 7.4-16 0-4.4-3.6-8-8-8zm0 11.8c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z" stroke="white" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute w-6 h-9 top-[20%] left-[85%] animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="75" fill="#a78bfa">
                        <path d="M12 0c-4.4 0-8 3.6-8 8 0 5.4 7.1 15.5 7.4 16 .2.3.6.5.9.5.3 0 .7-.2.9-.5.3-.5 7.4-10.6 7.4-16 0-4.4-3.6-8-8-8zm0 11.8c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z" stroke="white" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute w-6 h-9 top-[80%] left-[80%] animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="75" fill="#3b82f6">
                        <path d="M12 0c-4.4 0-8 3.6-8 8 0 5.4 7.1 15.5 7.4 16 .2.3.6.5.9.5.3 0 .7-.2.9-.5.3-.5 7.4-10.6 7.4-16 0-4.4-3.6-8-8-8zm0 11.8c-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8 2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8z" stroke="white" strokeWidth="1" />
                    </svg>
                </div>

                <div className="absolute w-3 h-3 bg-blue-500/80 rounded-full top-[65%] left-[15%] animate-pulse"></div>
                <div className="absolute w-5 h-5 bg-[#9333ea]/80 rounded-full top-[75%] left-[25%] animate-ping"></div>
                <div className="absolute w-32 h-32 rounded-full border-2 border-[#9333ea]/10 top-1/4 right-1/4 animate-[spin_25s_linear_infinite]"></div>
                <div className="absolute w-40 h-40 rounded-full border border-white/10 bottom-1/4 left-1/3 animate-[spin_30s_linear_reverse_infinite]"></div>
                <div className="absolute w-24 h-24 rounded-full border border-pink-500/10 top-1/3 left-1/6 animate-[spin_20s_linear_reverse_infinite]"></div>
                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-[#9333ea]/5 to-transparent bottom-1/3 right-1/6 animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
                <div className="relative z-10 backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-3xl shadow-xl border border-white/20">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                        Your City, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333ea] to-[#9233ea57]">Your Voice</span>
                    </h1>

                    <h4 className="text-xl md:text-2xl font-light text-white/90 mb-12 max-w-2xl mx-auto">
                        Transform your neighborhood by reporting local issues and tracking real-time solutions
                    </h4>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <Link to="/about" className='btn-primary'>
                            Learn More
                        </Link>
                        <Link to="/report" className='btn-primary'>
                            Report An Issue
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero