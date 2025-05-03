import React from 'react'
import { RiCameraFill, RiThumbUpFill, RiCheckboxCircleFill } from '@remixicon/react'
import Card from './utils/StepCard'

const HowItWorks = () => {
  const cards = [
    {
      icon: <RiCameraFill size={36} color="#9333ea" />,
      title: "Step 1: Report an Issue",
      description: "Capture a photo and provide details about the issue you've spotted in your neighborhood."
    },
    {
      icon: <RiThumbUpFill size={36} color="#22c55e" />,
      title: "Step 2: Get Community Support",
      description: "Other citizens vote on your report, helping prioritize issues that matter most to the community."
    },
    {
      icon: <RiCheckboxCircleFill size={36} color="#f59e0b" />,
      title: "Step 3: Track Resolution",
      description: "Follow the progress as issues get fixed and receive notifications when your reported problems are resolved."
    }
  ];

  return (
    <section className="py-16 bg-white/90 backdrop-filter backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl md:text-4xl text-darkGray">How It Works</h2>
          <div className="w-24 h-1 bg-[#9333ea] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              color={card.color}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
