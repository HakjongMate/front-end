import React from 'react'

import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import IntroPage from './pages/IntroPage'
import ServiceBookPage from './pages/ServiceBookPage'
import ServiceAnalyzePage from './pages/ServiceAnalyzePage'
import ServiceAIPage from './pages/ServiceAIPage'
import ReviewPage from './pages/ReviewPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyPage from './pages/MyPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/service/book" element={<ServiceBookPage />} />
      <Route path="/service/analyze" element={<ServiceAnalyzePage />} />
      <Route path="/service/ai" element={<ServiceAIPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/my" element={<MyPage />} />
    </Routes>
  )
}

export default App