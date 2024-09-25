import React from 'react'
import MyProfileSection from '../../components/my/MyProfileSection'
import MyExplorationSection from '../../components/my/MyExplorationSection'
import MyCartSection from '../../components/my/MyCartSection'
import MyPurchaseSection from '../../components/my/MyPurchaseSection'

function MyPage() {
  return (
    <div>
      <MyProfileSection />
      <MyExplorationSection />
      <MyCartSection />
      <MyPurchaseSection />
    </div>
  )
}

export default MyPage