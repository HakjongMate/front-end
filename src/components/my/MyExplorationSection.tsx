import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserProfile, Exploration, Interest } from '../../types';
import ExplorationCard from '../common/ExplorationCard'; 
import InterestCard from '../common/InterestCard'; 
import exploresData from '../../assets/data/explores.json';
import interestsData from '../../assets/data/interest.json';
import { Link } from 'react-router-dom';

const SectionWrapper = styled.div`
  padding: 40px 20px 0px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ active }) => (active ? '#3F5BF6' : '#333')};
  border: none;
  border-bottom: ${({ active }) => (active ? '2px solid #3F5BF6' : 'none')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    color: #3F5BF6;
  }
`;

const ViewMoreButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  text-align: right;
  color: #3F5BF6;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const MyExplorationSection: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'전체' | '관심사' | 'AI 탐구 결과' | '탐구 결과'>('전체');
  const [explorations, setExplorations] = useState<Exploration[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
    const userId = userProfile?.id;

    if (userId) {
      const filteredExplorations = exploresData
        .filter((explore) => explore.userId === userId)
        .map((explore) => ({
          ...explore,
          state: explore.state as 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED',
        }));
      setExplorations(filteredExplorations);

      const filteredInterests = interestsData.filter((interest) => interest.userId === userId);
      setInterests(filteredInterests);
    }
  }, [userProfile]);

  const filteredItems = () => {
    let items: (Exploration | Interest)[] = [];
    switch (activeTab) {
      case '관심사':
        items = interests;
        break;
      case 'AI 탐구 결과':
        items = explorations.filter((explore) => explore.ai);
        break;
      case '탐구 결과':
        items = explorations.filter((explore) => explore);
        break;
      default:
        items = [...interests, ...explorations];
    }
    return items.slice(0, 6).map((item) => 
      'state' in item ? (
        <ExplorationCard key={item.id} {...item} />
      ) : (
        <InterestCard key={item.id} {...item} />
      )
    );
  };

  return (
    <SectionWrapper>
      <Title>My 탐구 & 관심사</Title>

      <TabContainer>
        {['전체', '관심사', 'AI 탐구 결과', '탐구 결과'].map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      <CardsGrid>
        {filteredItems()}
      </CardsGrid>

      <ViewMoreButton to="/my/exploration">더보기 &gt;</ViewMoreButton>
    </SectionWrapper>
  );
};

export default MyExplorationSection;