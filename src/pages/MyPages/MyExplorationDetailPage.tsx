import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ExplorationsData from "../../assets/data/explores.json";
import { Exploration } from "../../types";

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

const PageType = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
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

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
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

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const MyExplorationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [exploration, setExploration] = useState<Exploration | null>(null);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    const foundExploration = ExplorationsData.find((exp) => exp.id === id);
    if (foundExploration) {
      setExploration(foundExploration as Exploration);
    }
  }, [id]);

  if (!exploration) {
    return <div>Loading...</div>;
  }

  const getStateText = (state: string) => {
    switch (state) {
      case "NOT_STARTED":
        return "탐구 진행 전";
      case "IN_PROGRESS":
        return "탐구 진행 중";
      case "COMPLETED":
        return "탐구 완료";
      default:
        return "알 수 없음";
    }
  };

  const handleSave = () => {
    console.log("Saving insight:", insight);
  };

  return (
    <PageWrapper>
      <PageType>{exploration.ai ? "AI 주제 추천" : "탐구"}</PageType>
      <Divider />
      <Title>{exploration.title}</Title>
      <TagContainer>
        <Tag backgroundColor="#28A745" color="#FFF">
          {getStateText(exploration.state)}
        </Tag>
        {exploration.ai && (
          <Tag backgroundColor="#FFC107" color="#000">
            AI 추천
          </Tag>
        )}
      </TagContainer>

      <ContentSection>
        <SectionTitle>탐구 동기</SectionTitle>
        <Content>{exploration.motive}</Content>
      </ContentSection>

      <ContentSection>
        <SectionTitle>탐구 내용</SectionTitle>
        <Content>{exploration.contents}</Content>
      </ContentSection>

      <ContentSection>
        <SectionTitle>탐구 결과</SectionTitle>
        <Content>{exploration.result}</Content>
      </ContentSection>

      <ContentSection>
        <SectionTitle>향후 행동</SectionTitle>
        <Content>{exploration.actions}</Content>
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

export default MyExplorationDetailPage;
