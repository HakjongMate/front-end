import React from 'react';
import styled from 'styled-components';

const ReviewCard = styled.div`
  background-color: #fbfbfc;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  margin-bottom: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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
`;

const AuthorName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const ReviewDate = styled.span`
  font-size: 14px;
  color: #666;
`;

const Rating = styled.div`
  font-size: 18px;
  color: #ffc107;
`;

const ReviewContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 16px;
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
    return name.split('*')[0].charAt(0);
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