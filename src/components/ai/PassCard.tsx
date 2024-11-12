import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';

const CardWrapper = styled.div<{ isBest?: boolean; isSelected?: boolean; disabled?: boolean }>`
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 6px 12px rgba(0, 0, 0, 0.15)')};
  }

  @media (max-width: 1024px) {
    width: 260px;
  }

  @media (max-width: 768px) {
    width: 240px;
  }

  @media (max-width: 480px) {
    width: 220px;
    padding: 15px;
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

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 2px 8px;
  }
`;

const PassTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #202594;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const PassIcon = styled.img`
  width: 180px;
  height: 140px;
  margin-bottom: 20px;
  align-self: center;

  @media (max-width: 768px) {
    width: 160px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 100px;
  }
`;

const PassDescription = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.4;
  color: #000000;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
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
  white-space: pre-wrap;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const PriceSection = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
`;

const PriceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DiscountBadge = styled.div`
  background: linear-gradient(135deg, #EEF2FF 0%, #E6EFFE 100%);
  padding: 6px 12px;
  border-radius: 20px;
  color: #202594;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(32, 37, 148, 0.1);

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 10px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OriginalPrice = styled.div`
  font-size: 14px;
  color: #6B7280;
  text-decoration: line-through;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const DiscountedPriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const DiscountedPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #202594;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const PriceUnit = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #202594;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

interface PassCardProps {
  title: string;
  description: string;
  benefits: string[];
  price: number;
  discountRate: number;
  isBest?: boolean;
  isSelected: boolean;
  iconSrc: string;
  onClick: () => void;
  disabled?: boolean;
}

const PassCard: React.FC<PassCardProps> = ({
  title,
  description,
  benefits,
  price,
  discountRate,
  isBest,
  isSelected,
  iconSrc,
  onClick,
  disabled = false,
}) => {
  const discountedPrice = price - price * discountRate;
  const discountPercent = Math.round(discountRate * 100);

  return (
    <CardWrapper
      isBest={isBest}
      isSelected={isSelected}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
    >
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
      <PriceSection>
        <PriceHeader>
          <DiscountBadge>{discountPercent}% 할인</DiscountBadge>
          <PriceContainer>
            <OriginalPrice>{price.toLocaleString()}원</OriginalPrice>
            <DiscountedPriceContainer>
              <DiscountedPrice>{discountedPrice.toLocaleString()}</DiscountedPrice>
              <PriceUnit>원</PriceUnit>
            </DiscountedPriceContainer>
          </PriceContainer>
        </PriceHeader>
      </PriceSection>
    </CardWrapper>
  );
};

export default PassCard;
