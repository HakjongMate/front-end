import React from "react";
import styled from "styled-components";
import blueIcon from "../../assets/icons/blue-icon.svg";
import greenIcon from "../../assets/icons/green-icon.svg";
import yellowIcon from "../../assets/icons/yellow-icon.svg";
import ServiceCard from "./ServiceCard";

const SectionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 30px 20px 50px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: #000;
  margin-bottom: 60px;
`;

const ServicesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
  position: relative;
`;

function ServiceSection() {
  return (
    <SectionContainer id="service-section">
      <SectionTitle>스스로 준비하는 생활기록부의 시작, 학종메이트</SectionTitle>
      <SectionDescription>
        전국 대학에 가려면 “우수한 학생”이 되어야 합니다.
        <br />
        학종메이트는 우수한 학생이 되기 위한 올바른 방향을 제시합니다.
      </SectionDescription>

      <ServicesGrid>
        {/* 첫 번째 서비스 카드 */}
        <ServiceCard
          title="생활기록부 진단 서비스"
          description={`컨설턴트 출신 SKY 멘토의 밀착 1:1 생활기록부 분석\n학종메이트의 생활기록부 진단 서비스`}
          iconSrc={blueIcon}
        />

        {/* 두 번째 (Best) 서비스 카드 */}
        <ServiceCard
          title="학종 가이드북"
          description={`한 권에 학생부 종합전형의 본질을 전부 담았습니다.\n한 권으로 끝내는 학종 가이드북`}
          iconSrc={greenIcon}
          isBest
        />

        {/* 세 번째 서비스 카드 */}
        <ServiceCard
          title="AI 주제 추천 서비스"
          description={`탐구 주제, 이제는 고민하지 마세요\n학종메이트 자체 개발 AI 생활기록부 주제 추천 서비스`}
          iconSrc={yellowIcon}
        />
      </ServicesGrid>
    </SectionContainer>
  );
}

export default ServiceSection;
