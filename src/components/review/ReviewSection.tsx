import React from "react";
import styled from "styled-components";
import ReviewComponent from "./ReviewComponent";
import ReviewJson from "../../assets/data/review.json";

interface Review {
  id: number;
  rating: number;
  type: string;
  image: string;
  author: string;
  date: string;
  content: string;
}

const ReviewSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  background-color: #fff;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin-bottom: 30px;
  text-align: center;
`;

const ReviewSection: React.FC = () => {
  const reviews: Review[] = ReviewJson;

  return (
    <ReviewSectionContainer>
      <SectionTitle>서비스 별 더 많은 후기를 만나보세요</SectionTitle>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </ReviewList>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
