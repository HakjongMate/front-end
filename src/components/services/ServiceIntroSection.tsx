import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BookImage from "../../assets/images/service/book.png";
import AnalyzeImage from "../../assets/images/service/analyze.png";
import AIImage from "../../assets/images/service/ai.png";

const SectionWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  justify-content: center;
  padding: 20px 0 50px;
`;

const SectionContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  width: 260px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  height: 140px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: #000;
  margin-bottom: 0px;
`;

const MoreLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #000;
  text-decoration: none;
  display: inline-block;
  margin-top: auto;
  align-self: flex-end;

  &:hover {
    color: #0d3a8f;
  }
`;

function ServiceIntroSection() {
  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>
          스스로 준비하는 생활기록부의 시작, 학종메이트
        </SectionTitle>
        <CardsContainer>
          <ServiceCard>
            <CardImage src={BookImage} alt="Book" />
            <CardDescription>
              한 권에 학생부 종합전형의 <br /> 본질을 전부 담았습니다.
            </CardDescription>
            <CardTitle>한 권으로 끝내는 학종 가이드북</CardTitle>
            <MoreLink to="/service/book">더 알아보기 &gt;</MoreLink>
          </ServiceCard>

          <ServiceCard>
            <CardImage src={AnalyzeImage} alt="Analyze" />
            <CardDescription>
              컨설턴트 출신 SKY 멘토의 <br /> 밀착 1:1 생활기록부 분석
            </CardDescription>
            <CardTitle>학종메이트 생활기록부 분석 서비스</CardTitle>
            <MoreLink to="/service/analyze">더 알아보기 &gt;</MoreLink>
          </ServiceCard>

          <ServiceCard>
            <CardImage src={AIImage} alt="AI Service" />
            <CardDescription>탐구주제, 이제는 고민하지 마세요.</CardDescription>
            <CardTitle>
              학종메이트 자체 개발 AI <br /> AI 생기부 주제 추천 서비스
            </CardTitle>
            <MoreLink to="/service/ai">더 알아보기 &gt;</MoreLink>
          </ServiceCard>
        </CardsContainer>
      </SectionContainer>
    </SectionWrapper>
  );
}

export default ServiceIntroSection;