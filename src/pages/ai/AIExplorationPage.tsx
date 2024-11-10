import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExplorationSelectCard from '../../components/common/ExplorationSelectCard';
import InterestSelectCard from '../../components/common/InterestSelectCard';
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
  white-space: pre-wrap;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 20px;
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
  }, []);

  useEffect(() => {
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
          setArchivingData(data.data);
        } else {
          console.error('데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    if (userProfile) {
      fetchArchivingData();
    }
  }, [userProfile]);

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      // 이미 선택된 항목인 경우 선택 해제
      setSelectedIds((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
    } else {
      if (selectedIds.length >= 2) {
        // 최대 2개 선택 제한 안내
        alert('최대 2개만 선택할 수 있습니다.');
      } else {
        // 선택 항목 추가
        setSelectedIds((prevSelected) => [...prevSelected, id]);
      }
    }
  };

  const handleNext = () => {
    navigate('/ai/pass');
  };

  const handleBack = () => {
    navigate('/ai/university');
  };

  const renderCards = () => {
    const cards = archivingData.map((item) => {
      const isSelected = selectedIds.includes(item.uniqueId);

      if (item.type === 'explore') {
        return (
          <ExplorationSelectCard
            key={item.uniqueId}
            id={item.uniqueId}
            title={item.title}
            contents={item.contents}
            state={item.state}
            ai={item.ai}
            selected={isSelected}
            onSelect={() => handleSelect(item.uniqueId)}
          />
        );
      } else {
        return (
          <InterestSelectCard
            key={item.uniqueId}
            id={item.uniqueId}
            title={item.title}
            contents={item.contents}
            createDate={item.createDate}
            selected={isSelected}
            onSelect={() => handleSelect(item.uniqueId)}
          />
        );
      }
    });

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
      <Description>
        * 더 많은 탐구 및 관심사는 "학종메이트" 앱을 통해 추가하실 수 있습니다. {'\n'}
        * 최대 2개까지 선택 가능하며, 관심사가 없을 경우 선택하지 않으셔도 됩니다.
      </Description>

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
