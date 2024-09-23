import React from "react";
import styled from "styled-components";
import ServiceIntroCard from "./ServiceIntroCard";
import BookImage from "../../assets/images/service/book.webp";
import AnalyzeImage from "../../assets/images/service/analyze.webp";
import AIImage from "../../assets/images/service/ai.webp";

const SectionWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  justify-content: center;
  padding: 40px 20px 60px;

  @media (max-width: 768px) {
    padding: 30px 15px 50px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px 40px;
  }
`;

const SectionContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
    white-space: pre-line;
    line-height: 1.5;
    margin-top: 0px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

function ServiceIntroSection() {
  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>
          스스로 준비하는 생활기록부의 시작, {"\n"} 학종메이트
        </SectionTitle>
        <CardsContainer>
          <ServiceIntroCard
            imageSrc={BookImage}
            description={"한 권에 학생부 종합전형의\n본질을 전부 담았습니다."}
            title="한 권으로 끝내는 학종 가이드북"
            link="/service/book"
          />
          <ServiceIntroCard
            imageSrc={AnalyzeImage}
            description={"컨설턴트 출신 SKY 멘토의\n밀착 1:1 생활기록부 분석합니다."}
            title="학종메이트 생활기록부 분석 서비스"
            link="/service/analyze"
          />
          <ServiceIntroCard
            imageSrc={AIImage}
            description={"탐구주제, 이제는 고민하지 마세요.\n 학종메이트 자체 개발 AI가 추천합니다."}
            title="생기부 AI 주제 추천 서비스"
            link="/service/ai"
          />
        </CardsContainer>
      </SectionContainer>
    </SectionWrapper>
  );
}

export default ServiceIntroSection;
