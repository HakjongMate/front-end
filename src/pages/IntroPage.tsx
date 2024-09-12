import React from 'react'
import VisionSection from '../components/intro/VisionSection'
import CeoSection from '../components/intro/CeoSection'
import BackgroundSection from '../components/intro/BackgroundSection'
import ResultSection from '../components/intro/ResultSection'
import SemiFooter from '../components/common/SemiFooter'

function IntroPage() {
  return (
    <div>
      <VisionSection />
      <CeoSection />
      <BackgroundSection />
      <ResultSection />
      <SemiFooter />
    </div>
  )
}

export default IntroPage