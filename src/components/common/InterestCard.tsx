import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Interest } from '../../types';

const CardWrapper = styled.div`
  width: calc(100% - 40px);
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 0px 20px 10px;
  margin: 10px auto;
  border: 1px solid #CECECE;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  max-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledDate = styled.span`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
  display: block;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: -5px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const InterestCard: React.FC<Interest> = ({ id, title, contents, createDate, subjectId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my/interest/detail/${id}`);
  };

  const formattedDate = new Date(createDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <CardWrapper onClick={handleClick}>
      <Title>{title}</Title>
      <StyledDate>{formattedDate}</StyledDate>
      <TagContainer>
        <Tag>최근 관심사</Tag>
      </TagContainer>
      <Description>{contents}</Description>
    </CardWrapper>
  );
};

export default InterestCard;
