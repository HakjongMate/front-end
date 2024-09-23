import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import useIsMobile from "../hooks/useIsMobile";
import ServiceIntroSection from "../components/services/ServiceIntroSection";
import ServiceItemCard from "../components/services/ServiceItemCard";
import BookImage from "../assets/images/book-main.webp";

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

function ServiceBookPage() {
  const location = useLocation();
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (location.hash === '#details' && titleContainerRef.current) {
      titleContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // 모바일 여부에 따라 subtitle 변경
  const subtitle = isMobile
    ? "스스로 준비하고 만든 생활기록부로 \n 대학이 원하는 \n 우수한 학생이 되도록 합니다"
    : "스스로 준비하고 만든 생활기록부로 \n 대학이 원하는 우수한 학생이 되도록 합니다";

  return (
    <PageWrapper>
      <ServiceIntroSection />
      <TitleContainer ref={titleContainerRef} id="details">
        <Title>한 권으로 끝내는 학종 가이드북</Title>
        <SubTitle>한 권에 학생부 종합 전형의{"\n"}본질을 전부 담았습니다.</SubTitle>
        <Underline />
        <CardsContainer>
          <ServiceItemCard
            imageSrc={BookImage}
            title="한 권으로 끝내는 학종 가이드북"
            subtitle={subtitle}
            link="/service/book/detail"
          />
        </CardsContainer>
      </TitleContainer>
    </PageWrapper>
  );
}

export default ServiceBookPage;
