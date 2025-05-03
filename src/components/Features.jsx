import React from 'react';
import FeatureCard from './utils/FeatureCard';
import features from '../data/features';

const Features = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/20 via-pink-500/10 to-blue-500/20 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl md:text-4xl text-white">Key Features</h2>
          <div className="w-24 h-1 bg-[#9333ea] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              color={feature.color}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
