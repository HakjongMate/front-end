import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import ServiceCard from "./ServiceCard";
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
  text-align: center; 

  @media (max-width: 768px) {
    font-size: 22px;  
    margin-bottom: 20px;
    white-space: pre-wrap;  
  }

  @media (max-width: 480px) {
    font-size: 20px; 
    margin-bottom: 15px;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: #000;
  margin-bottom: 60px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
    line-height: 1.6; 
    white-space: pre-wrap;  
  }

  @media (max-width: 480px) {
    font-size: 14px;  
    margin-bottom: 30px;
  }
`;

// 데스크탑용 그리드 스타일 (태블릿에서는 가운데 정렬)
const ServicesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
  position: relative;

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 모바일 슬라이더 컨테이너
const MobileServicesSlider = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// 슬라이더 내부 카드 컨테이너
const MobileServicesContainer = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ currentIndex }) => currentIndex * -100}%);
  width: 100%;
`;

// 모바일 카드 스타일
const MobileServiceCardWrapper = styled.div`
  flex: 0 0 100%;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex; 
  justify-content: center;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

const PrevButton = styled(SliderButton)`
  left: 10px;
`;

const NextButton = styled(SliderButton)`
  right: 10px;
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? '30px' : '10px')};
  height: 10px;
  border-radius: ${({ active }) => (active ? '5px' : '50%')};
  background-color: ${({ active }) => (active ? '#007BFF' : '#ccc')};
  margin: 0 5px;
  cursor: pointer;
`;

// 서비스 카드 배열
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  }, [services.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoSliding(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoSliding) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoSliding, nextSlide]);

  return (
    <SectionContainer id="service-section">
      <SectionTitle>스스로 준비하는 생활기록부의 시작, {"\n"}학종메이트</SectionTitle>
      <SectionDescription>
        전국 대학에 가려면 "우수한 학생"이 되어야 합니다. <br />
        학종메이트는 우수한 학생이 되기 위한 {"\n"} 올바른 방향을 제시합니다.
      </SectionDescription>

      {/* 데스크탑 및 태블릿용 그리드 */}
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </ServicesGrid>

      {/* 모바일용 슬라이더 */}
      <MobileServicesSlider>
        <MobileServicesContainer
          currentIndex={currentIndex}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, index) => (
            <MobileServiceCardWrapper key={index}>
              <ServiceCard {...service} />
            </MobileServiceCardWrapper>
          ))}
        </MobileServicesContainer>
        <PrevButton onClick={prevSlide}>&lt;</PrevButton>
        <NextButton onClick={nextSlide}>&gt;</NextButton>
      </MobileServicesSlider>

      {/* 슬라이더 하단의 점 네비게이션 */}
      <SliderDots>
        {services.map((_, index) => (
          <Dot
            key={index}
            active={currentIndex === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </SliderDots>
    </SectionContainer>
  );
}

export default ServiceSection;
