import React, { useState } from 'react';
import FaqItem from './utils/FaqItem';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I report an issue?",
      answer: "To report an issue, open the CityFix app or website, click on \"Report an Issue\", upload a photo of the problem, add a description, and confirm the location. Your report will be submitted to local authorities and other users can upvote it for visibility."
    },
    {
      question: "How are issues prioritized?",
      answer: "Issues are prioritized based on several factors including the number of upvotes, severity of the problem, and how long it has been reported. Critical infrastructure problems like water leaks or dangerous road conditions typically receive higher priority."
    },
    {
      question: "Is CityFix available in my city?",
      answer: "CityFix is currently available in 4 cities across the country with plans for rapid expansion. You can check if your city is supported by downloading the app and enabling location services. Even if we haven't officially partnered with your local government, you can still report issues and build community support."
    },
    {
      question: "How do I track the status of my report?",
      answer: "You can track the status of your reports in the \"My Reports\" section of your user dashboard. Each report will show its current status (Submitted, Under Review, In Progress, Resolved, or Closed). You'll also receive notifications when there are updates to your reports."
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/20 via-pink-500/10 to-blue-500/20 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl md:text-4xl text-white">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-[#9333ea] mx-auto mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FaqItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
