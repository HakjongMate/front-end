import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import InterestsData from '../../assets/data/interest.json';
import { Interest } from '../../types';

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: 70vh;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageType = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
`;

const Tag = styled.span<{ backgroundColor: string; color: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 400;
  padding: 8px 15px;
  border-radius: 15px;
`;

const ContentSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #000;
  margin-bottom: 20px;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const InsightInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  resize: none;
  margin-bottom: 20px;
  background-color: #fff;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  background-color: #202594;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0009bd;
  }
`;

const MyInterestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [interest, setInterest] = useState<Interest | null>(null);
  const [insight, setInsight] = useState('');

  useEffect(() => {
    const foundInterest = InterestsData.find((int) => int.id === id);
    if (foundInterest) {
      setInterest(foundInterest as Interest);
    }
  }, [id]);

  if (!interest) {
    return <div>Loading...</div>;
  }

  const handleSave = () => {
    console.log('Saving insight:', insight);
    // 실제로 백엔드에 데이터를 보내는 로직 추가 가능
  };

  return (
    <PageWrapper>
      <PageType>관심사</PageType>
      <Divider />
      <Title>{interest.title}</Title>
      <TagContainer>
        <Tag backgroundColor="#0F4ABE" color="#FFF">
          최근 관심사
        </Tag>
      </TagContainer>

      <ContentSection>
        <SectionTitle>관심사 설명</SectionTitle>
        <Content>{interest.contents}</Content>
      </ContentSection>

      <Divider />

      <ContentSection>
        <SectionTitle>추가 인사이트 정리</SectionTitle>
        <InsightInput
          value={insight}
          onChange={(e) => setInsight(e.target.value)}
          placeholder="추가적인 인사이트들을 정리해서 기록하세요."
        />
        <ButtonContainer>
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </ButtonContainer>
      </ContentSection>
    </PageWrapper>
  );
};

export default MyInterestDetailPage;