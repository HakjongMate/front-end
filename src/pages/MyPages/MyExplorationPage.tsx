import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserProfile, Archiving } from '../../types';
import ExplorationCard from '../../components/common/ExplorationCard';
import InterestCard from '../../components/common/InterestCard';

const PageWrapper = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #0f4abe 0%, #002368 100%);
  padding: 30px 20px 50px;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 15px 40px;
  }

  @media (max-width: 480px) {
    padding: 15px 10px 30px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    white-space: pre-wrap;
    line-height: 1.5;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 18px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    max-width: 300px;
    white-space: pre-wrap;
  }
`;

const ContentSection = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px 100px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
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

  @media (max-width: 768px) {
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const MyExplorationPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'전체' | '관심사' | 'AI 탐구' | '탐구'>('전체');
  const [archivingData, setArchivingData] = useState<Archiving[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
  }, []);

  // 백엔드에서 아카이빙 데이터를 가져오는 함수
  const fetchArchivingData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/archiving/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArchivingData(data.data);
      } else {
        console.error('데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchArchivingData();
  }, []);

  // 각 탭에 따라 필터링된 아이템을 반환하는 함수
  const filteredItems = () => {
    return archivingData
      .filter((item) => {
        switch (activeTab) {
          case '관심사':
            return item.type === 'interest';
          case 'AI 탐구':
            return item.type === 'explore' && item.ai;
          case '탐구':
            return item.type === 'explore';
          default:
            return true;
        }
      })
      .map((item) => {
        if (item.type === 'explore') {
          return (
            <ExplorationCard
              key={item.id}
              id={item.id}
              userId={userProfile?.id || ''}
              subjectId={item.subjectId}
              title={item.title}
              state={item.state}
              motive=""
              contents={item.contents}
              result=""
              actions=""
              ai={item.ai}
              createDate={item.createDate}
            />
          );
        } else {
          return (
            <InterestCard
              key={item.id}
              id={item.id}
              userId={userProfile?.id || ''}
              subjectId={item.subjectId}
              title={item.title}
              contents={item.contents}
              createDate={item.createDate}
            />
          );
        }
      });
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
        <HeaderTitle>탐구 및 관심사의 추가는 {'\n'} 앱을 통해 가능합니다.</HeaderTitle>
        <HeaderSubtitle>
          아래 QR코드를 통해 앱을 설치하시면 학생부 종합 전형 준비를 위한 {'\n'} 다양한 기능을 이용하실 수 있습니다.
        </HeaderSubtitle>
        <HeaderSubtitle>현재 본 서비스는 준비중입니다.</HeaderSubtitle>
      </HeaderSection>

      <ContentSection>
        <TabContainer>
          {['전체', '관심사', 'AI 탐구', '탐구'].map((tab) => (
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
