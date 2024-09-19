import React from "react";
import styled from "styled-components";
import ServiceIntroSection from "../components/services/ServiceIntroSection";
import ServiceItemCard from "../components/services/ServiceItemCard";
import AnalyzeImage from "../assets/images/analyze-main.webp";

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
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 0px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Underline = styled.hr`
  width: 350px;
  border: 1px solid #000;
  margin: 0 0 40px 0;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 70vh;
`;

function ServiceAnalyzePage() {
  return (
    <PageWrapper>
      <ServiceIntroSection />
      <TitleContainer>
        <Title>학종메이트 생활기록부 분석 서비스</Title>
        <SubTitle>컨설턴트 출신 SKY 멘토의 밀착 1:1 생활기록부 분석을 제공합니다.</SubTitle>
        <Underline />
        <CardsContainer>
          <ServiceItemCard
            imageSrc={AnalyzeImage}
            title="학종메이트 생활기록부 분석 서비스"
            subtitle={"생활기록부의 현주소를 파악하고, \n 발전 방향성을 아는 것이 \n 우수한 생활기록부의 시작입니다."}
            link="/service/analyze/detail"
          />
        </CardsContainer>
      </TitleContainer>
    </PageWrapper>
  );
}

export default ServiceAnalyzePage;
