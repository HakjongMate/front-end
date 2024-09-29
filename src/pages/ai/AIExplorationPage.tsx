import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExplorationCard from '../../components/common/ExplorationCard';
import InterestCard from '../../components/common/InterestCard';
import InterAddCard from '../../components/common/InterAddCard';
import exploresData from '../../assets/data/explores.json';
import interestsData from '../../assets/data/interest.json';
import { UserProfile, Exploration, Interest } from '../../types';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: 70vh;
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
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #666;
  text-align: left;
  margin-bottom: 30px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 50px;
`;

const AIExplorationPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [explorations, setExplorations] = useState<Exploration[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }

    if (userProfile) {
      const userId = userProfile.id;

      // 탐구 데이터 필터링
      const filteredExplorations = exploresData
        .filter((explore) => explore.userId === userId)
        .map((explore) => ({
          ...explore,
          state: explore.state as 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED',
        }));
      setExplorations(filteredExplorations);

      // 관심사 데이터 필터링
      const filteredInterests = interestsData.filter((interest) => interest.userId === userId);
      setInterests(filteredInterests);
    }
  }, [userProfile]);

  const handleNext = () => {
    navigate('/ai/pass');
  };

  const handleBack = () => {
    navigate('/ai/university');
  };

  const renderCards = () => {
    const cards = [];

    // 탐구 카드 추가
    explorations.forEach((explore) => {
      cards.push(<ExplorationCard key={explore.id} {...explore} />);
    });

    // 관심사 카드 추가
    interests.forEach((interest) => {
      cards.push(<InterestCard key={interest.id} {...interest} />);
    });

    // 데이터가 없는 경우에만 InterAddCard 추가 (최대 2개까지)
    if (cards.length === 0) {
      cards.push(<InterAddCard key="add-1" />);
      cards.push(<InterAddCard key="add-2" />);
    } else if (cards.length === 1) {
      cards.push(<InterAddCard key="add-1" />);
    }

    return cards;
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={2} />
      <Title>주제 생성 시 반영할 관심사와 탐구를 확인해주세요</Title>
      <Subtitle>평소 관심사나 지난 탐구 이력에 맞춰 주제를 추천받을 수 있습니다.</Subtitle>
      <Divider />
      <Description>더 구체적인 탐구 및 관심사는 앱을 통해 추가하실 수 있습니다.</Description>

      <CardsGrid>
        {renderCards()}
      </CardsGrid>

      <ButtonContainer
        onPreviousClick={handleBack}
        onNextClick={handleNext}
      />
    </PageWrapper>
  );
};

export default AIExplorationPage;