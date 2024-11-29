import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import { AIProvider } from './contexts/AIContext';

import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import ServiceBookPage from './pages/ServiceBookPage';
import ServiceBookDetailPage from './pages/ServiceBookDetailPage';
import ServiceAnalyzePage from './pages/ServiceAnalyzePage';
import ServiceAnalyzeDetailPage from './pages/ServiceAnalyzeDetailPage';
import ServiceAIPage from './pages/ServiceAIPage';
import ServiceAIDetailPage from './pages/ServiceAIDetailPage';
import ReviewPage from './pages/ReviewPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PurchasePage from './pages/PurchasePage';

import MyPage from './pages/MyPages/MyPage';
import MyCartPage from './pages/MyPages/MyCartPage';
import MyExplorationPage from './pages/MyPages/MyExplorationPage';
import MyExplorationDetailPage from './pages/MyPages/MyExplorationDetailPage';
import MyInterestDetailPage from './pages/MyPages/MyInterestDetailPage';
import MyPurchasePage from './pages/MyPages/MyPurchasePage';

import AISubjectPage from './pages/ai/AISubjectPage';
import AIUniversityPage from './pages/ai/AIUniversityPage';
import AIExplorationPage from './pages/ai/AIExplorationPage';
import AIPassPage from './pages/ai/AIPassPage';
import AIWaitingPage from './pages/ai/AIWaitingPage';
import ExplorationAddPage from './pages/ai/ExplorationAddPage';
import { PurchaseProvider } from './contexts/PurchaseContext';

function App() {
  return (
    <PurchaseProvider>
      <AIProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/service/book" element={<ServiceBookPage />} />
          <Route path="/service/book/detail" element={<ServiceBookDetailPage />} />
          <Route path="/service/analyze" element={<ServiceAnalyzePage />} />
          <Route path="/service/analyze/detail" element={<ServiceAnalyzeDetailPage />} />
          <Route path="/service/ai" element={<ServiceAIPage />} />
          <Route path="/service/ai/detail" element={<ServiceAIDetailPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/purchase" element={<PurchasePage />} />

          <Route path="/my" element={<MyPage />} />
          <Route path="/my/cart" element={<MyCartPage />} />
          <Route path="/my/exploration" element={<MyExplorationPage />} />
          <Route path="/my/exploration/detail/:id" element={<MyExplorationDetailPage />} />
          <Route path="/my/interest/detail/:id" element={<MyInterestDetailPage />} />
          <Route path="/my/purchase" element={<MyPurchasePage />} />

          <Route path="/ai/subject" element={<AISubjectPage />} />
          <Route path="/ai/university" element={<AIUniversityPage />} />
          <Route path="/ai/exploration" element={<AIExplorationPage />} />
          <Route path="/ai/pass" element={<AIPassPage />} />
          <Route path="/ai/waiting" element={<AIWaitingPage />} />
          <Route path="/ai/exploration/add" element={<ExplorationAddPage />} />
        </Routes>
      </AIProvider>
    </PurchaseProvider>
  );
}

export default App;
