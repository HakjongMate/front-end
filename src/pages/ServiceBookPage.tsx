import React from "react";
import styled from "styled-components";
import ServiceIntroSection from "../components/services/ServiceIntroSection";
import ServiceItemCard from "../components/services/ServiceItemCard";

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
  max-width: 1200px;
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
`;

function ServiceBookPage() {
  return (
    <PageWrapper>
      <ServiceIntroSection />
      <TitleContainer>
        <Title>한 권으로 끝내는 학종 가이드북</Title>
        <SubTitle>한 권에 학생부 종합 전형의 본질을 전부 담았습니다.</SubTitle>
        <Underline />
        <CardsContainer>
          <ServiceItemCard />
        </CardsContainer>
      </TitleContainer>
    </PageWrapper>
  );
}

export default ServiceBookPage;
