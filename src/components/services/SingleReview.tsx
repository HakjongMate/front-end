import React from "react";
import styled from "styled-components";

const ReviewCard = styled.div`
  background-color: #fbfbfc;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px 20px;
    margin: 0 auto 15px;
  }

  @media (max-width: 480px) {
    width: 80%;
    padding: 10px 15px;
    margin: 0 auto 10px
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: bold;
  color: #333;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`;

const AuthorName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ReviewDate = styled.span`
  font-size: 14px;
  color: #666;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Rating = styled.div`
  font-size: 18px;
  color: #ffc107;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 8px;
  }
`;

const ReviewContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
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

const SingleReview = ({ review }: { review: Review }) => {
  const getInitials = (name: string) => {
    return name.split("*")[0].charAt(0);
  };

  return (
    <ReviewCard>
      <ReviewHeader>
        <AuthorInfo>
          <Avatar>{getInitials(review.author)}</Avatar>
          <div>
            <AuthorName>{review.author}</AuthorName>
            <ReviewDate>{review.date}</ReviewDate>
          </div>
        </AuthorInfo>
        <Rating>{"★".repeat(review.rating)}</Rating>
      </ReviewHeader>
      <ReviewContent>{review.content}</ReviewContent>
    </ReviewCard>
  );
};

export default SingleReview;
