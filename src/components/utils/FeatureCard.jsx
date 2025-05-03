import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl hover:shadow-[#9333ea]/10 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-2 sm:gap-0 border border-gray-100 hover:-translate-y-1">
      <div className="rounded-full bg-[#9333ea]/10 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 shadow-md shadow-[#9333ea]/5">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-xl mb-2 text-darkGray">{title}</h4>
        <p className="text-darkGray/80">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
