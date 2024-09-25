import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserProfile, Exploration, Interest } from '../../types';
import ExplorationCard from '../../components/my/ExplorationCard';
import InterestCard from '../../components/my/InterestCard';
import exploresData from '../../assets/data/explores.json';
import interestsData from '../../assets/data/interest.json';

const PageWrapper = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #0f4abe 0%, #002368 100%);
  padding: 30px 20px 50px;
  color: white;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const HeaderSubtitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ContentSection = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
`;

const MyExplorationPage: React.FC = () => {
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
    return items.map((item) =>
      'state' in item ? (
        <ExplorationCard key={item.id} {...item} />
      ) : (
        <InterestCard key={item.id} {...item} />
      )
    );
  };

  const renderContent = () => {
    const items = filteredItems();
    return items.length > 0 ? (
      <CardsGrid>{items}</CardsGrid>
    ) : (
      <EmptyState>
        <EmptyStateText>해당하는 항목이 없습니다.</EmptyStateText>
      </EmptyState>
    );
  };

  return (
    <PageWrapper>
      <HeaderSection>
        <HeaderTitle>탐구 및 관심사의 추가는 앱을 통해 가능합니다.</HeaderTitle>
        <HeaderSubtitle>
          아래 QR코드를 통해 앱을 설치하시면 {'\n'}
          학생부 종합 전형 준비를 위한 다양한 기능을 이용하실 수 있습니다. {'\n'}
          현재 본 서비스는 준비중입니다.
        </HeaderSubtitle>
      </HeaderSection>

      <ContentSection>
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

        {renderContent()}
      </ContentSection>
    </PageWrapper>
  );
};

export default MyExplorationPage;