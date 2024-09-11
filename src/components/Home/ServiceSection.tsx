import React from "react";
import styled from "styled-components";
import blueIcon from "../../assets/icons/blue-icon.svg";
import greenIcon from "../../assets/icons/green-icon.svg";
import yellowIcon from "../../assets/icons/yellow-icon.svg";

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
  gap: 30px;
  flex-wrap: wrap;
`;

const ServiceCard = styled.div<{ isBest?: boolean }>`
  background-color: #fff;
  border: ${({ isBest }) => (isBest ? "2px solid #007BFF" : "1px solid #ccc")};
  border-radius: 10px;
  padding: 40px 20px 0px;
  width: 310px;
  height: 440px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 40px;
    line-height: 1.8;
    color: #000000;
  }

  a {
    font-size: 14px;
    display: block;
    text-align: right;
    color: #000000;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ServiceIcon = styled.img`
  width: 200px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
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
        <ServiceCard>
          <h3>생활기록부 진단 서비스</h3>
          <ServiceIcon src={blueIcon} alt="생활기록부 진단 서비스" />
          <p>
            컨설턴트 출신 SKY 멘토의 밀착 1:1 생활기록부 분석 <br /> 
            학종메이트의 생활기록부 진단 서비스
          </p>
          <a href="#">더 알아보기 &gt;</a>
        </ServiceCard>

        {/* 두 번째 (Best) 서비스 카드 */}
        <ServiceCard isBest>
          <h3>학종 가이드북</h3>
          <ServiceIcon src={greenIcon} alt="학종 가이드북" />
          <p>
            한 권에 학생부 종합전형의 본질을 전부 담았습니다. <br />
            한 권으로 끝내는 학종 가이드북
          </p>
          <a href="#">더 알아보기 &gt;</a>
        </ServiceCard>

        {/* 세 번째 서비스 카드 */}
        <ServiceCard>
          <h3>AI 주제 추천 서비스</h3>
          <ServiceIcon src={yellowIcon} alt="AI 주제 추천 서비스" />
          <p>
            탐구 주제, 이제는 고민하지 마세요 <br /> 
            학종메이트 자체 개발 AI 생활기록부 주제 추천 서비스
          </p>
          <a href="#">더 알아보기 &gt;</a>
        </ServiceCard>
      </ServicesGrid>
    </SectionContainer>
  );
}

export default ServiceSection;
