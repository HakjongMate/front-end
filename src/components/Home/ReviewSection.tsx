import React from "react";
import styled from "styled-components";
import SampleImage from "../../assets/images/home/example.png";
import ReviewData from "../../assets/data/review.json";

const SectionWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 30px 0 90px;
  display: flex;
  justify-content: center;
`;

const SectionContainer = styled.div`
  max-width: 1440px;
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
`;

const SectionDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #333;
  margin-bottom: 50px;
`;

const ReviewGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const ReviewCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 25px;
  width: 260px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  padding: 10px 0 15px;
`;

const ReviewType = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #000;
`;

const ReviewMeta = styled.div`
  display: flex;
  margin-bottom: -15px;
  align-items: center;
`;

const ReviewAuthor = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

const ReviewDate = styled.p`
  font-size: 14px;
  color: #666;
`;

const ReviewContent = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
`;

const CTAButton = styled.a`
  position: absolute;
  right: 0px;
  background-color: #0f4abe;
  color: #fff;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #0d3a8f;
  }
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
  const reviews: Review[] = ReviewData.slice(0, 4);

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

  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>한 번뿐인 입시<br />아무에게나 맡길 순 없습니다.</SectionTitle>
        <SectionDescription>
          학종의 본질을 파악하고 개인에 맞는 솔루션을 제공합니다.
        </SectionDescription>
        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewImage src={SampleImage} alt="review" />
              <ReviewType>{getTypeText(review.type)}</ReviewType>
              <ReviewMeta>
                <ReviewAuthor>{review.author}</ReviewAuthor>
                <ReviewDate>{review.date}</ReviewDate>
              </ReviewMeta>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewCard>
          ))}
        </ReviewGrid>
        <CTAButton href="/review">더 많은 후기 보기 &gt;</CTAButton>
      </SectionContainer>
    </SectionWrapper>
  );
}

export default ReviewSection;