import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StepIndicator from '../../components/ai/StepIndicator';
import HakjongMateBlue from '../../assets/icons/HakjongMate_Blue.png';
import waitingMessages from '../../assets/data/waiting.json';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const Image = styled.img`
  width: 130px;
  height: 150px;
  margin: 50px auto 30px;

  @media (max-width: 768px) {
    width: 110px;
    height: 130px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 110px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
    white-space: pre-line;
    line-height: 1.5;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666666;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const WaitingMessage = styled.p`
  font-size: 14px;
  color: #666666;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const AIWaitingPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState('');
  const navigate = useNavigate();

  // localStorage에서 유저 정보 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  // 1.5초마다 메시지 변경
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % waitingMessages.length);
      setDots('');
    }, 1500);

    return () => clearInterval(messageInterval);
  }, []);

  // 0.5초마다 점 변경
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // 8초 후에 결과 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/my/exploration/detail/1');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper>
      <StepIndicator currentStep={5} />
      <Image src={HakjongMateBlue} alt="HakjongMate Logo" />
      <Title>AI가 {username}님을 위한 {'\n'}맞춤형 주제를 생성 중입니다.</Title>
      <Subtitle>약 3분 ~ 5분 정도의 시간이 소요됩니다.</Subtitle>
      <WaitingMessage>
        {waitingMessages[messageIndex]}
        {dots}
      </WaitingMessage>
    </PageWrapper>
  );
};

export default AIWaitingPage;
