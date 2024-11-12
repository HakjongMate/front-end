import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserProfile, Archiving } from '../../types';
import ExplorationCard from '../common/ExplorationCard'; 
import InterestCard from '../common/InterestCard'; 
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

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

  @media (max-width: 480px) {
    padding: 10px;
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
  const [activeTab, setActiveTab] = useState<'전체' | '관심사' | 'AI 탐구' | '탐구'>('전체');
  const [archivingData, setArchivingData] = useState<Archiving[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
  }, []);

  // 전체 데이터를 API로부터 가져오기
  const fetchArchivingData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/archiving/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        credentials: 'include',
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
    if (activeTab === '전체') {
      fetchArchivingData();
    }
  }, [activeTab]);

  // 탐구 데이터와 관심사 데이터를 각각 탐구카드, 관심사카드로 매핑
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
      .slice(0, 6)
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

  return (
    <SectionWrapper>
      <Title>My 탐구 & 관심사</Title>

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

      <CardsGrid>{filteredItems()}</CardsGrid>

      <ViewMoreButton to="/my/exploration">더보기 &gt;</ViewMoreButton>
    </SectionWrapper>
  );
};

export default MyExplorationSection;
