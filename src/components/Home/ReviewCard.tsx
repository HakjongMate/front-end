import React from "react";
import styled from "styled-components";

const ReviewCardContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 25px;
  width: 200px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;

  @media (max-width: 768px) {
    height: 100%;
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    width: 60%;
  }
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  padding: 10px 0 15px;

  @media (max-width: 768px) {
    height: 160px;
  }
`;

const ReviewType = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 18px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ReviewDate = styled.p`
  font-size: 14px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ReviewContent = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

interface Review {
  id: number;
  type: string;
  image: string;
  author: string;
  date: string;
  content: string;
}

interface ReviewCardProps {
  review: Review;
  getTypeText: (type: string) => string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, getTypeText }) => {
  return (
    <ReviewCardContainer>
      <ReviewImage src={review.image} alt="review" />
      <ReviewType>{getTypeText(review.type)}</ReviewType>
      <ReviewMeta>
        <ReviewAuthor>{review.author}</ReviewAuthor>
        <ReviewDate>{review.date}</ReviewDate>
      </ReviewMeta>
      <ReviewContent>{review.content}</ReviewContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
