import React from 'react';
import styled from 'styled-components';
import { Interest } from '../../types'; // 타입 임포트

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Date = styled.p`
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
`;

const InterestCard: React.FC<Interest> = ({ title, createDate, contents }) => {
  return (
    <CardWrapper>
      <Title>{title}</Title>
      <Date>{createDate}</Date>
      <Description>{contents}</Description>
    </CardWrapper>
  );
};

export default InterestCard;
