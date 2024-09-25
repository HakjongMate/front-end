import React from 'react';
import styled from 'styled-components';
import { Interest } from '../../types';

const CardWrapper = styled.div`
  width: calc(100% - 40px);
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  margin: 10px auto;
  border: 1px solid #CECECE;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const Date = styled.span`
  font-size: 14px;
  color: #888;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  background-color: #0F4ABE;
  color: #FFF;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 15px;
  display: inline-block;
`;

const Description = styled.p`
  font-size: 15px;
  color: #000;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InterestCard: React.FC<Interest> = ({ id, title, contents, createDate, subjectId }) => {
  const handleClick = () => {
    // Navigate to detail page (implement based on your routing setup)
    console.log(`Navigating to InterestDetail with id: ${id}`);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <TitleContainer>
        <Title>{title}</Title>
        <Date>{createDate}</Date>
      </TitleContainer>
      <TagContainer>
        <Tag>최근 관심사</Tag>
      </TagContainer>
      <Description>{contents}</Description>
    </CardWrapper>
  );
};

export default InterestCard;