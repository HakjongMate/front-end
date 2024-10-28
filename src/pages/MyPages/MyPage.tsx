import React from 'react';
import MyProfileSection from '../../components/my/MyProfileSection';
import MyExplorationSection from '../../components/my/MyExplorationSection';
import MyPurchaseSection from '../../components/my/MyPurchaseSection';
import { Toaster } from 'react-hot-toast';

function MyPage() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <MyProfileSection />
      <MyExplorationSection />
      <MyPurchaseSection />
    </div>
  );
}

export default MyPage;
