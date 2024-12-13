import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import ServiceIntroSection from "../components/services/ServiceIntroSection";
import ServiceItemCard from "../components/services/ServiceItemCard";
import AIImage from "../assets/images/ai-main.webp";

const PageWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 0px;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-top: 30px;
  }
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 425px) {
    white-space: pre-wrap;
    line-height: 1.6;
    margin-bottom: 5px;
  }
`;

const Underline = styled.hr`
  width: 350px;
  border: 1px solid #000;
  margin: 10px 0 40px 20px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

function ServiceAIPage() {
  const location = useLocation();
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash === '#details' && titleContainerRef.current) {
      titleContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <PageWrapper>
      <ServiceIntroSection />
      <TitleContainer ref={titleContainerRef} id="details">
        <Title>AI 생기부 주제 추천 서비스</Title>
        <SubTitle>AI가 당신에게 딱 맞는{"\n"}생기부 주제를 추천해 드립니다.</SubTitle>
        <Underline />
        <CardsContainer>
          <ServiceItemCard
            imageSrc={AIImage}
            title="AI 생기부 주제 추천 서비스"
            subtitle={"AI를 통해 나만의 맞춤 주제를 찾아 \n 3개년 유직적인 생활기록부를 만드세요."}
            link="/service/ai/detail"
            showAlert={true}
          />
        </CardsContainer>
      </TitleContainer>
    </PageWrapper>
  );
}

export default ServiceAIPage;
