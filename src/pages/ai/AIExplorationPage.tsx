import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExplorationCard from '../../components/common/ExplorationCard';
import InterestCard from '../../components/common/InterestCard';
import InterAddCard from '../../components/common/InterAddCard';
import { UserProfile, Archiving } from '../../types';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: 70vh;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 10px;
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 20px;
    white-space: pre-wrap;
    line-height: 1.5;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const AIExplorationPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [archivingData, setArchivingData] = useState<Archiving[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 가져와 설정
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
  }, []);

  useEffect(() => {
    // 백엔드에서 탐구 및 관심사 데이터를 가져오는 함수
    const fetchArchivingData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/archiving/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setArchivingData(data.data); // 백엔드에서 받아온 데이터를 archivingData에 저장
        } else {
          console.error('데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    // 사용자 정보가 있을 때 데이터 가져오기
    if (userProfile) {
      fetchArchivingData();
    }
  }, [userProfile]);

  const handleNext = () => {
    navigate('/ai/pass');
  };

  const handleBack = () => {
    navigate('/ai/university');
  };

  const renderCards = () => {
    const cards = archivingData.map((item) => {
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

    // 데이터가 없는 경우 InterAddCard 추가 (최대 2개까지)
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
      <StepIndicator currentStep={3} />
      <Title>주제 생성 시 반영할 관심사와 {'\n'}탐구를 확인해주세요</Title>
      <Subtitle>평소 관심사나 지난 탐구 이력에 맞춰 {'\n'}주제를 추천받을 수 있습니다.</Subtitle>
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
