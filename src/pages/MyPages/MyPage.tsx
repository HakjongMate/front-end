import React from 'react'
import MyProfileSection from '../../components/my/MyProfileSection'
import MyExplorationDetailPage from './MyExplorationDetailPage'
import MyCartSection from '../../components/my/MyCartSection'
import MyPurchaseSection from '../../components/my/MyPurchaseSection'

function MyPage() {
  return (
    <div>
      <MyProfileSection />
      <MyExplorationDetailPage />
      <MyCartSection />
      <MyPurchaseSection />
    </div>
  )
}

export default MyPage