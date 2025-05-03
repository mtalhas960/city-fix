import React from 'react'
import Card from './utils/StepCard'
import steps from '../data/steps'

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white/90 backdrop-filter backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl md:text-4xl text-darkGray">How It Works</h2>
          <div className="w-24 h-1 bg-[#9333ea] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((card, index) => (
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
