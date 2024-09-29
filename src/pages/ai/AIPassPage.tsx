import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';
import StarIcon from '@mui/icons-material/Star';
import blueIcon from '../../assets/icons/blue-icon.svg';
import greenIcon from '../../assets/icons/green-icon.svg';
import yellowIcon from '../../assets/icons/yellow-icon.svg';
import passData from '../../assets/data/pass.json';

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

const PassCard = styled.div<{ isBest?: boolean; isSelected?: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? '#f7f7fd' : '#fff')};
  border: ${({ isBest, isSelected }) =>
    isSelected
      ? '3px solid #202594' 
      : isBest
      ? '2px solid #007BFF'
      : '1px solid #E0E0E0'};
  border-radius: 15px;
  padding: 20px;
  width: 290px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BestLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007bff;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
`;

const PassTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #202594;
  margin-bottom: 10px;
`;

const PassDescription = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.4;
  color: #000000;
  white-space: pre-wrap;
`;

const BenefitsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

const BenefitItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const PassIcon = styled.img`
  width: 180px;
  height: 140px;
  margin-bottom: 20px;
  align-self: center;
`;

const AIPassPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<number | null>(null);

  // 아이콘 맵핑 함수
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
            isBest={pass.isBest}
            isSelected={selectedPass === pass.id}
            onClick={() => setSelectedPass(pass.id)}
          >
            {pass.isBest && <BestLabel>Best</BestLabel>}
            <PassTitle>{pass.title}</PassTitle>
            <PassIcon src={getIcon(pass.icon)} alt={`${pass.title} icon`} />
            <PassDescription>{pass.description}</PassDescription>
            <BenefitsList>
              {pass.benefits.map((benefit: string, i: number) => (
                <BenefitItem key={i}>
                  <StarIcon style={{ color: '#FFC107', marginRight: '5px' }} />
                  {benefit}
                </BenefitItem>
              ))}
            </BenefitsList>
          </PassCard>
        ))}
      </CardsContainer>
      <ButtonContainer onPreviousClick={handleBack} onNextClick={handleNext} />
    </PageWrapper>
  );
};

export default AIPassPage;
