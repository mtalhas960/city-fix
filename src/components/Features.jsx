import React from 'react';
import { RiMapPinFill, RiThumbUpLine, RiUser3Fill, RiSettings4Fill } from '@remixicon/react';
import FeatureCard from './utils/FeatureCard';

const Features = () => {
  const features = [
    {
      icon: <RiMapPinFill size={24} color="#9333ea" />,
      title: "Live Map of Issues",
      description: "See reported issues in real time on an interactive map with status updates and location data."
    },
    {
      icon: <RiThumbUpLine size={24} color="#22c55e" />,
      title: "Upvote System",
      description: "Prioritize issues based on community votes to ensure the most important problems get fixed first."
    },
    {
      icon: <RiUser3Fill size={24} color="#f59e0b" />,
      title: "User Dashboards",
      description: "Track your reports, view their status, and receive notifications when updates are available."
    },
    {
      icon: <RiSettings4Fill size={24} color="#9333ea" />,
      title: "Admin Panel",
      description: "Powerful tools for admins to manage reports, assign tasks, and monitor resolution progress."
    }
  ];

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
