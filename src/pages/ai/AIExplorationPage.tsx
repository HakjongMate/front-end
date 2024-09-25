import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';

const PageWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: center;
  margin-bottom: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
`;

const InterestCard = styled.div`
  width: 45%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 20px;
  background-color: #fff;
  font-size: 18px;
  font-weight: bold;
  color: #202594;
  cursor: pointer;
  text-align: center;
`;

const AIExplorationPage: React.FC = () => {
  const navigate = useNavigate();

  // "다음" 버튼 클릭 시 "/ai/license"로 이동
  const handleNext = () => {
    navigate('/ai/license');
  };

  // "이전" 버튼 클릭 시 "/ai/university"로 이동
  const handleBack = () => {
    navigate('/ai/university');
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={3} />
      <Title>주제 생성 시 반영할 관심사와 탐구를 확인해주세요</Title>
      <Subtitle>더 구체적인 탐구 및 관심사는 앱을 통해 추가하실 수 있습니다.</Subtitle>

      <CardContainer>
        <InterestCard>
          +
        </InterestCard>
      </CardContainer>

      <ButtonContainer
        onPreviousClick={handleBack}
        onNextClick={handleNext}
      />
    </PageWrapper>
  );
};

export default AIExplorationPage;
