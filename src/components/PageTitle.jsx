import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ title, description, pageName }) => {
  return (
    <section className="py-24 px-6  bg-gradient-to-br from-[#9333ea]/20 via-pink-500/20 to-blue-500/20">
      <div className="section-container text-center">
        <h1 className="font-poppins font-bold text-4xl md:text-5xl text-darkGray">{title}</h1>
        <p className="text-lg text-darkGray/70 mt-4">{description}</p>
        <div className="flex items-center justify-center mt-6 text-sm">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-darkGray">{pageName}</span>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
