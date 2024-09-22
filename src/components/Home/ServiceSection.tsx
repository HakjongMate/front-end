import React from "react";
import styled from "styled-components";
import ServiceCard from "./ServiceCard"; // 분리된 ServiceCard 컴포넌트 임포트
import blueIcon from "../../assets/icons/blue-icon.svg";
import greenIcon from "../../assets/icons/green-icon.svg";
import yellowIcon from "../../assets/icons/yellow-icon.svg";

const SectionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 30px 20px 50px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 15px 40px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: #000;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const ServicesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
  position: relative;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

// 카드 데이터 배열
const services = [
  {
    title: "생활기록부 진단 서비스",
    description: "컨설턴트 출신 SKY 멘토의 밀착 1:1 생활기록부 분석\n학종메이트의 생활기록부 진단 서비스",
    iconSrc: blueIcon,
    link: "/service/analyze"
  },
  {
    title: "학종 가이드북",
    description: "한 권에 학생부 종합전형의 본질을 전부 담았습니다.\n한 권으로 끝내는 학종 가이드북",
    iconSrc: greenIcon,
    link: "/service/book",
    isBest: true
  },
  {
    title: "AI 주제 추천 서비스",
    description: "탐구 주제, 이제는 고민하지 마세요\n학종메이트 자체 개발 AI 생활기록부 주제 추천 서비스",
    iconSrc: yellowIcon,
    link: "/service/ai"
  }
];

function ServiceSection() {
  return (
    <SectionContainer id="service-section">
      <SectionTitle>스스로 준비하는 생활기록부의 시작, 학종메이트</SectionTitle>
      <SectionDescription>
        전국 대학에 가려면 "우수한 학생"이 되어야 합니다. <br />
        학종메이트는 우수한 학생이 되기 위한 올바른 방향을 제시합니다.
      </SectionDescription>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </ServicesGrid>
    </SectionContainer>
  );
}

export default ServiceSection;
