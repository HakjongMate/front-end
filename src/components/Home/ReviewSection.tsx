import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import ReviewData from "../../assets/data/review.json";
import ReviewCard from "./ReviewCard";

const SectionWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 30px 0 90px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 20px 0 60px;
  }

  @media (max-width: 480px) {
    padding: 15px 0 50px;
  }
`;

const SectionContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 20px;
  white-space: pre-line;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const SectionDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #333;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileReviewSlider = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  display: none;
  touch-action: pan-y;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileReviewContainer = styled.div<{ transform: string }>`
  display: flex;
  transform: ${({ transform }) => transform};
  width: 100%;
  padding: 0 0 30px;
  transition: transform 0.3s ease-in-out;
`;

const MobileReviewCardWrapper = styled.div`
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
  width: ${({ active }) => (active ? "30px" : "10px")};
  height: 10px;
  border-radius: ${({ active }) => (active ? "5px" : "50%")};
  background-color: ${({ active }) => (active ? "#007BFF" : "#ccc")};
  margin: 0 5px;
  cursor: pointer;
`;

interface Review {
  id: number;
  rating: number;
  type: string;
  image: string;
  author: string;
  date: string;
  content: string;
}

function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transform, setTransform] = useState(`translateX(0%)`);
  const reviews: Review[] = ReviewData.slice(0, 4);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTypeText = (type: string) => {
    switch (type) {
      case "analyze":
        return "생활기록부 진단 서비스";
      case "book":
        return "학종 가이드북";
      case "ai":
        return "AI 주제 추천 서비스";
      default:
        return "기타 서비스";
    }
  };

  const updateTransform = useCallback((index: number) => {
    setTransform(`translateX(-${index * 100}%)`);
  }, []);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % reviews.length;
    setCurrentIndex(nextIndex);
    updateTransform(nextIndex);
  }, [currentIndex, reviews.length, updateTransform]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    setCurrentIndex(prevIndex);
    updateTransform(prevIndex);
  }, [currentIndex, reviews.length, updateTransform]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    updateTransform(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const touch = e.touches[0];
    const diff = touchStartX.current - touch.clientX;
    const movement = (diff / window.innerWidth) * 100;
    
    setTransform(`translateX(${-currentIndex * 100 - movement}%)`);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (diff > 50 && currentIndex < reviews.length - 1) {
      nextSlide();
    } else if (diff < -50 && currentIndex > 0) {
      prevSlide();
    } else {
      updateTransform(currentIndex);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setCurrentIndex(0);
        updateTransform(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateTransform]);

  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>
          한 번뿐인 입시
          <br />
          아무에게나 맡길 순 없습니다.
        </SectionTitle>
        <SectionDescription>
          학종의 본질을 파악하고 개인에 맞는 솔루션을 제공합니다.
        </SectionDescription>

        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              getTypeText={getTypeText}
            />
          ))}
        </ReviewGrid>

        <MobileReviewSlider
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <MobileReviewContainer
            ref={containerRef}
            transform={transform}
          >
            {reviews.map((review) => (
              <MobileReviewCardWrapper key={review.id}>
                <ReviewCard review={review} getTypeText={getTypeText} />
              </MobileReviewCardWrapper>
            ))}
          </MobileReviewContainer>
          <PrevButton onClick={prevSlide}>&lt;</PrevButton>
          <NextButton onClick={nextSlide}>&gt;</NextButton>
          
          <SliderDots>
            {reviews.map((_, index) => (
              <Dot
                key={index}
                active={currentIndex === index}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </SliderDots>
        </MobileReviewSlider>
      </SectionContainer>
    </SectionWrapper>
  );
}

export default ReviewSection;