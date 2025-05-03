import React from 'react';
import TeamCard from './utils/TeamCard';
import teamMembers from '../data/team';

const Team = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/20 via-pink-500/10 to-blue-500/20 -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl md:text-4xl text-white">Meet Our Team</h2>
          <div className="w-24 h-1 bg-[#9333ea] mx-auto mt-4 mb-6"></div>
          <p className="max-w-2xl mx-auto text-black/80">A dedicated group of technology experts and civic enthusiasts committed to making cities better for everyone.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
