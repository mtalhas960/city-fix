import React from 'react';
import { RiCheckboxCircleFill, RiCommunityFill, RiGovernmentFill, RiGroupFill } from '@remixicon/react';

const Mission = () => {
  return (
    <section className="py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9333ea]/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl mx-auto text-center relative">
          <span className="inline-block py-1 px-3 bg-[#9333ea]/10 text-[#9333ea] text-sm font-medium rounded-full mb-4">Our Purpose</span>
          <h2 className="text-4xl md:text-5xl font-bold text-darkGray mb-6 leading-tight">
            Empowering Citizens to <span className="text-[#9333ea]">Transform Cities</span>
          </h2>
          <div className="w-20 h-1 bg-[#9333ea] mx-auto"></div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute -left-8 top-1/3 w-16 h-16 border-2 border-[#9333ea]/20 rounded-full"></div>
          <div className="hidden lg:block absolute right-10 bottom-10 w-24 h-24 border-4 border-dashed border-[#9333ea]/20 rounded-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 transform lg:-translate-y-12">
              <div className="space-y-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1">
                <div className="text-center">
                  <span className="text-4xl font-bold text-[#9333ea]">94%</span>
                  <p className="text-darkGray/70 mt-2">Issues resolved within 30 days</p>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-[#9333ea]">78%</span>
                  <p className="text-darkGray/70 mt-2">Citizens reporting improved neighborhoods</p>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-[#9333ea]">56%</span>
                  <p className="text-darkGray/70 mt-2">Increase in community participation</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pl-4">
              <h3 className="text-3xl font-bold text-darkGray mb-6">Our Mission</h3>
              <p className="text-lg text-darkGray/80 mb-6 leading-relaxed">
                At CityFix, we're revolutionizing how citizens and governments collaborate to solve urban challenges. Our platform empowers communities to identify, report, and track the resolution of local issues—creating more responsive, transparent cities for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-[#9333ea]/10 px-4 py-2 rounded-full">
                  <RiCommunityFill size={18} className="text-[#9333ea] mr-2" />
                  <span className="text-darkGray font-medium">Community-Driven</span>
                </div>
                <div className="flex items-center bg-[#9333ea]/10 px-4 py-2 rounded-full">
                  <RiGovernmentFill size={18} className="text-[#9333ea] mr-2" />
                  <span className="text-darkGray font-medium">Transparency</span>
                </div>
                <div className="flex items-center bg-[#9333ea]/10 px-4 py-2 rounded-full">
                  <RiGroupFill size={18} className="text-[#9333ea] mr-2" />
                  <span className="text-darkGray font-medium">Inclusivity</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-6 lg:border-l border-gray-200">
              <h3 className="text-3xl font-bold text-darkGray mb-6">Our Approach</h3>
              <div className="space-y-2 mb-8">
                <div className="flex items-start">
                  <RiCheckboxCircleFill size={24} className="text-[#9333ea] mt-1 mr-3 flex-shrink-0" />
                  <p className="text-darkGray/80">
                    <span className="font-semibold text-darkGray">Bridging the gap</span> between citizens and local governments through technology
                  </p>
                </div>
                <div className="flex items-start">
                  <RiCheckboxCircleFill size={24} className="text-[#9333ea] mt-1 mr-3 flex-shrink-0" />
                  <p className="text-darkGray/80">
                    <span className="font-semibold text-darkGray">Increasing transparency</span> in public service delivery and civic administration
                  </p>
                </div>
                <div className="flex items-start">
                  <RiCheckboxCircleFill size={24} className="text-[#9333ea] mt-1 mr-3 flex-shrink-0" />
                  <p className="text-darkGray/80">
                    <span className="font-semibold text-darkGray">Building communities</span> that actively participate in shaping their urban environments
                  </p>
                </div>
                <div className="flex items-start">
                  <RiCheckboxCircleFill size={24} className="text-[#9333ea] mt-1 mr-3 flex-shrink-0" />
                  <p className="text-darkGray/80">
                    <span className="font-semibold text-darkGray">Data-driven solutions</span> that help prioritize and track urban improvement projects
                  </p>
                </div>
              </div>
              <div className="bg-[#9333ea]/5 p-4 pt-0 rounded-lg border border-[#9333ea]/10">
                <p className="text-darkGray/80 italic">
                  "We believe in the power of collective action and technology to transform our urban spaces into more livable, responsive communities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
