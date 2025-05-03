import React from 'react';

const Stats = () => {
  const statistics = [
    {
      number: "5,280+",
      label: "Issues Reported",
      color: "#9333ea"
    },
    {
      number: "3,945+",
      label: "Problems Fixed",
      color: "#22c55e"
    },
    {
      number: "12,500+",
      label: "Active Users",
      color: "#f59e0b"
    },
    {
      number: "4",
      label: "Cities Covered",
      color: "#9333ea"
    }
  ];

  return (
    <section className="py-16 bg-white/90 backdrop-filter backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl md:text-4xl text-darkGray">Our Impact</h2>
          <div className="w-24 h-1 bg-[#9333ea] mx-auto mt-4"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:-translate-y-1">
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>{stat.number}</div>
              <div className="text-darkGray font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
