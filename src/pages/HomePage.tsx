import React from 'react'
import HookingSection from '../components/Home/HookingSection'
import ServiceSection from '../components/Home/ServiceSection'
import WhySection from '../components/Home/WhySection'
import ReviewSection from '../components/Home/ReviewSection'

function HomePage() {
  return (
    <div>
      <HookingSection />
      <ServiceSection />
      <WhySection />
      <ReviewSection />
    </div>
  )
}

export default HomePage