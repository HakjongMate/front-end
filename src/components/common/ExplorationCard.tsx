import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Exploration } from '../../types';

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
  font-weight: 600;
  color: #000;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const StyledDate = styled.span`
  font-size: 14px;
  color: #888;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Tag = styled.span<{ $bgColor: string; $textColor: string }>`
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  font-size: 14px;
  font-weight: 400;
  padding: 8px 15px;
  border-radius: 15px;
  display: inline-block;
  margin-right: 7px;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  color: #000;
  line-height: 1.4;
  margin: 0;
  padding: 0 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ExplorationCard: React.FC<Exploration> = ({
  id,
  title,
  contents,
  state,
  createDate,
  ai,
}) => {
  const navigate = useNavigate();

  const getStateText = (state: string) => {
    switch (state) {
      case 'NOT_STARTED':
        return '탐구 진행 전';
      case 'IN_PROGRESS':
        return '탐구 진행 중';
      case 'COMPLETED':
        return '탐구 완료';
      default:
        return '알 수 없음';
    }
  };

  const handleClick = () => {
    navigate(`/my/exploration/detail/${id}`);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <TitleContainer>
        <Title>{title}</Title>
        <StyledDate>{new Date(createDate).toLocaleDateString()}</StyledDate>
      </TitleContainer>
      <TagContainer>
        {ai && <Tag $bgColor="#FFC107" $textColor="#000">AI 추천</Tag>}
        <Tag $bgColor="#28A745" $textColor="#000">
          {getStateText(state)}
        </Tag>
      </TagContainer>
      <Description>{contents}</Description>
    </CardWrapper>
  );
};

export default ExplorationCard;
