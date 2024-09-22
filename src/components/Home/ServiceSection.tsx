import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const ServiceCardContainer = styled.div<{ isBest?: boolean }>`
  background-color: #fff;
  border: ${({ isBest }) => (isBest ? "2px solid #007BFF" : "1px solid #ccc")};
  border-radius: 10px;
  padding: 40px 20px 20px;
  width: 290px;
  height: 440px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  position: relative;
  
  ${({ isBest }) => isBest && `
    margin-top: -20px;
    
    @media (max-width: 768px) {
      margin-top: 0;
      order: -1;
    }
  `}

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    width: 260px;
    height: 400px;
    padding: 30px 15px 15px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-top: 0 !important;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
  line-height: 1.8;
  color: #000000;
  white-space: pre-line;

  @media (max-width: 1024px) {
    font-size: 13px;
    margin-bottom: 30px;
  }
`;

const ServiceLink = styled(Link)`
  font-size: 14px;
  display: block;
  text-align: right;
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ServiceIcon = styled.img`
  width: 200px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 180px;
    height: 135px;
  }
`;

const BestText = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
  text-align: center;
  background-color: #fff;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 20px;
    top: -10px;
  }
`;

interface ServiceCardProps {
  title: string;
  description: string;
  iconSrc: string;
  link: string;
  isBest?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconSrc,
  link,
  isBest,
}) => {
  return (
    <ServiceCardContainer isBest={isBest}>
      {isBest && <BestText>Best</BestText>}
      <ServiceTitle>{title}</ServiceTitle>
      <ServiceIcon src={iconSrc} alt={title} />
      <ServiceDescription>{description}</ServiceDescription>
      <ServiceLink to={link}>더 알아보기 &gt;</ServiceLink>
    </ServiceCardContainer>
  );
};

function ServiceSection() {
  return (
    <SectionContainer id="service-section">
      <SectionTitle>스스로 준비하는 생활기록부의 시작, 학종메이트</SectionTitle>
      <SectionDescription>
        전국 대학에 가려면 "우수한 학생"이 되어야 합니다. <br />
        학종메이트는 우수한 학생이 되기 위한 올바른 방향을 제시합니다.
      </SectionDescription>
      <ServicesGrid>
        <ServiceCard
          title="생활기록부 진단 서비스"
          description={`컨설턴트 출신 SKY 멘토의 밀착 1:1 생활기록부 분석\n학종메이트의 생활기록부 진단 서비스`}
          iconSrc={blueIcon}
          link="/service/analyze"
        />
        <ServiceCard
          title="학종 가이드북"
          description={`한 권에 학생부 종합전형의 본질을 전부 담았습니다.\n한 권으로 끝내는 학종 가이드북`}
          iconSrc={greenIcon}
          link="/service/book"
          isBest
        />
        <ServiceCard
          title="AI 주제 추천 서비스"
          description={`탐구 주제, 이제는 고민하지 마세요\n학종메이트 자체 개발 AI 생활기록부 주제 추천 서비스`}
          iconSrc={yellowIcon}
          link="/service/ai"
        />
      </ServicesGrid>
    </SectionContainer>
  );
}

export default ServiceSection;