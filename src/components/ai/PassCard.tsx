import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';

const CardWrapper = styled.div<{ isBest?: boolean; isSelected?: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? '#f7f7fd' : '#fff')};
  border: ${({ isBest, isSelected }) =>
    isSelected
      ? '3px solid #202594'
      : isBest
      ? '2px solid #007BFF'
      : '1px solid #E0E0E0'};
  border-radius: 15px;
  padding: 20px;
  width: 290px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BestLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007bff;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
`;

const PassTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #202594;
  margin-bottom: 10px;
`;

const PassDescription = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.4;
  color: #000000;
  white-space: pre-wrap;
`;

const BenefitsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

const BenefitItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const PassIcon = styled.img`
  width: 180px;
  height: 140px;
  margin-bottom: 20px;
  align-self: center;
`;

// Props for PassCard component
interface PassCardProps {
  title: string;
  description: string;
  benefits: string[];
  isBest?: boolean;
  isSelected: boolean;
  iconSrc: string;
  onClick: () => void;
}

const PassCard: React.FC<PassCardProps> = ({
  title,
  description,
  benefits,
  isBest,
  isSelected,
  iconSrc,
  onClick,
}) => (
  <CardWrapper isBest={isBest} isSelected={isSelected} onClick={onClick}>
    {isBest && <BestLabel>Best</BestLabel>}
    <PassTitle>{title}</PassTitle>
    <PassIcon src={iconSrc} alt={`${title} icon`} />
    <PassDescription>{description}</PassDescription>
    <BenefitsList>
      {benefits.map((benefit, i) => (
        <BenefitItem key={i}>
          <StarIcon style={{ color: '#FFC107', marginRight: '5px' }} />
          {benefit}
        </BenefitItem>
      ))}
    </BenefitsList>
  </CardWrapper>
);

export default PassCard;
