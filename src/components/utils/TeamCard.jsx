import React from 'react';

const TeamCard = ({ image, name, role, bio }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-white/20 hover:-translate-y-1">
      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h5 className="font-semibold text-lg text-darkGray">{name}</h5>
      <p className="text-[#9333ea] font-medium mb-2">{role}</p>
      <p className="text-darkGray/70 text-sm">{bio}</p>
    </div>
  );
};

export default TeamCard;
