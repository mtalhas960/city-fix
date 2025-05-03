import { RiArrowDownSLine } from '@remixicon/react';
import React from 'react'

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="mb-2">
          <button
            onClick={onClick}
            className="flex justify-between items-center w-full text-left font-medium text-lg text-[#9333ea] p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 transition duration-300 shadow-md hover:shadow-lg"
          >
            <span>{question}</span>
            <RiArrowDownSLine 
              size={20} 
              color="#9333ea" 
              className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`mt-2 px-4 bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'} shadow-md`}>
            <p className="text-darkGray/90">{answer}</p>
          </div>
        </div>
      );
}

export default FaqItem