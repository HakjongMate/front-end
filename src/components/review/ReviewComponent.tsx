import React from "react";
import styled from "styled-components";

interface Review {
  id: number;
  rating: number;
  type: string;
  image: string;
  author: string;
  date: string;
  content: string;
}

interface ReviewComponentProps {
  review: Review;
}

const ReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  width: 100%;
  background-color: #f6f7fc;
  padding: 30px;
  margin: 15px auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    padding: 20px;
    margin: 10px auto;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin: 8px auto;
    max-width: 95%;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 180px;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
    margin-top: 20px;
  }
`;

const Author = styled.div`
  font-size: 12px;
  font-weight: 300;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 300;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const Rating = styled.div`
  color: #202594;
  font-size: 18px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  text-align: justify;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Type = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #202594;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ReviewComponent: React.FC<ReviewComponentProps> = ({ review }) => {
  return (
    <ReviewContainer>
      <LeftContainer>
        <Type>
          {review.type === "analyze"
            ? "생기부 진단 서비스"
            : review.type === "book"
            ? "학종 가이드북"
            : "AI 주제 추천 서비스"}
        </Type>
        <Rating>{"★ ".repeat(review.rating)}</Rating>
        <Content>{review.content}</Content>
      </LeftContainer>
      <RightContainer>
        <Date>{review.date}</Date>
        <Author>{review.author}</Author>
      </RightContainer>
    </ReviewContainer>
  );
};

export default ReviewComponent;
