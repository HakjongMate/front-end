import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';
import blueIcon from '../../assets/icons/blue-icon.svg';
import greenIcon from '../../assets/icons/green-icon.svg';
import yellowIcon from '../../assets/icons/yellow-icon.svg';
import passData from '../../assets/data/pass.json';
import PassCard from '../../components/ai/PassCard';

const PageWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 30px;
  text-align: center;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

// Icon을 선택하는 함수
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'blueIcon':
      return blueIcon;
    case 'greenIcon':
      return greenIcon;
    case 'yellowIcon':
      return yellowIcon;
    default:
      return '';
  }
};

const AIPassPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedPass !== null) {
      navigate('/ai/waiting');
    } else {
      alert('패스를 선택해주세요.');
    }
  };

  const handleBack = () => {
    navigate('/ai/exploration');
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={4} />
      <Title>주제 추천시 사용할 이용권을 선택해주세요</Title>
      <CardsContainer>
        {passData.map((pass) => (
          <PassCard
            key={pass.id}
            title={pass.title}
            description={pass.description}
            benefits={pass.benefits}
            isBest={pass.isBest}
            isSelected={selectedPass === pass.id}
            iconSrc={getIcon(pass.icon)}
            onClick={() => setSelectedPass(pass.id)}
          />
        ))}
      </CardsContainer>
      <ButtonContainer onPreviousClick={handleBack} onNextClick={handleNext} />
    </PageWrapper>
  );
};

export default AIPassPage;
