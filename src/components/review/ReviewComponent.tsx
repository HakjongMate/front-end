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
  background-color: #f6f7fc;
  padding: 30px;
  margin: 15px 100px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 180px;
`;

const Author = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

const Rating = styled.div`
  color: #202594;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  text-align: justify;
`;

const Type = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #202594;
  margin-bottom: 10px;
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
