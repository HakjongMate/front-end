import React from "react";
import styled from "styled-components";
import ServiceIntroSection from "../components/services/ServiceIntroSection";
import ServiceCard from "../components/services/ServiceCard";

const PageWrapper = styled.div`
  padding: 40px;
  background-color: #fff;
  display: flex;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
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
          <ServiceCard />
        </CardsContainer>
      </TitleContainer>
    </PageWrapper>
  );
}

export default ServiceBookPage;
