import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserProfile, Exploration, Interest } from '../../types';
import ExplorationCard from './ExplorationCard'; 
import InterestCard from './InterestCard'; 
import exploresData from '../../assets/data/explores.json';
import interestsData from '../../assets/data/interest.json';

// state 변환 함수
const mapStateToEnum = (state: string): 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED' => {
  switch (state) {
    case 'IN_PROGRESS':
      return 'IN_PROGRESS';
    case 'COMPLETED':
      return 'COMPLETED';
    case 'NOT_STARTED':
      return 'NOT_STARTED';
    default:
      throw new Error(`Unknown state: ${state}`);
  }
};

const SectionWrapper = styled.div`
  padding: 40px 20px;
  max-width: 1080px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ active }) => (active ? '#202594' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
`;

const MyExplorationSection: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'탐구' | '관심사'>('탐구');
  const [explorations, setExplorations] = useState<Exploration[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    // LocalStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
    const userId = userProfile?.id;
    console.log(userId);
    console.log(exploresData);
    console.log(interestsData);

    if (userId) {
      // 탐구 데이터를 사용자 ID에 따라 필터링하고, state를 제한된 값으로 변환
      const filteredExplorations = exploresData
        .filter((explore) => explore.userId === userId)
        .map((explore) => ({
          ...explore,
          state: mapStateToEnum(explore.state),  // state 값을 제한된 타입으로 변환
        }));
      setExplorations(filteredExplorations);

      // 관심사 데이터를 사용자 ID에 따라 필터링
      const filteredInterests = interestsData.filter((interest) => interest.userId === userId);
      setInterests(filteredInterests);
    }
  }, []);

  return (
    <SectionWrapper>
      <Title>My 탐구 & 관심사</Title>

      <TabContainer>
        <TabButton active={activeTab === '탐구'} onClick={() => setActiveTab('탐구')}>
          탐구
        </TabButton>
        <TabButton active={activeTab === '관심사'} onClick={() => setActiveTab('관심사')}>
          관심사
        </TabButton>
      </TabContainer>

      <CardsGrid>
        {activeTab === '탐구'
          ? explorations.map((explore) => (
              <ExplorationCard key={explore.id} {...explore} />
            ))
          : interests.map((interest) => (
              <InterestCard key={interest.id} {...interest} />
            ))}
      </CardsGrid>
    </SectionWrapper>
  );
};

export default MyExplorationSection;
