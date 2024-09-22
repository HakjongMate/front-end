import React from 'react';
import styled from 'styled-components';
import WhiteHakjongMate from '../../assets/icons/HakjongMate_White.png';

const VisualContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;

  @media (max-width: 1024px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(to top, #202594 0%, #7C7FC0 40%, #F5F6FB 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;

  @media (max-width: 1024px) {
    border: none;
  }

  @media (max-width: 480px) {
    border: none;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 100px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 60px;
    height: 80px;
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 70px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 60px;
    margin-bottom: 8px;
  }
`;

const CompanyName = styled.span`
  color: white;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

// Badge 컴포넌트로 분리
interface BadgeProps {
  color: string;
  textColor: string;
  text: string;
  angle: number;
}

const Badge = styled.div<BadgeProps>`
  position: absolute;
  padding: 12px 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  min-width: 100px;
  text-align: center;
  background-color: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  top: ${({ angle }) => `${200 - 210 * Math.cos(angle * Math.PI / 180)}px`};
  left: ${({ angle }) => `${200 + 210 * Math.sin(angle * Math.PI / 180)}px`};
  transform: translate(-50%, -50%);
  border: ${({ color }) => (color === '#fff' ? '1px solid #9C9C9C' : 'none')};

  @media (max-width: 1024px) {
    top: ${({ angle }) => `${150 - 160 * Math.cos(angle * Math.PI / 180)}px`};
    left: ${({ angle }) => `${150 + 160 * Math.sin(angle * Math.PI / 180)}px`};
    padding: 10px 25px;
    font-size: 14px;
    min-width: 80px;
  }

  @media (max-width: 768px) {
    top: ${({ angle }) => `${125 - 130 * Math.cos(angle * Math.PI / 180)}px`};
    left: ${({ angle }) => `${125 + 130 * Math.sin(angle * Math.PI / 180)}px`};
    padding: 8px 20px;
    font-size: 12px;
    min-width: 70px;
  }

  @media (max-width: 480px) {
    top: ${({ angle }) => `${100 - 100 * Math.cos(angle * Math.PI / 180)}px`};
    left: ${({ angle }) => `${100 + 100 * Math.sin(angle * Math.PI / 180)}px`};
    padding: 6px 15px;
    font-size: 10px;
    min-width: 60px;
  }
`;

interface VisualContentProps {
  badges: Array<{
    text: string;
    color: string;
    textColor: string;
    angle: number;
  }>;
}

const VisualContent: React.FC<VisualContentProps> = ({ badges }) => {
  return (
    <VisualContainer>
      <Circle>
        <Logo src={WhiteHakjongMate} alt="HakjongMate Logo" />
        <CompanyName>HakjongMate</CompanyName>
      </Circle>
      {badges.map((badge, index) => (
        <Badge key={index} {...badge}>
          {badge.text}
        </Badge>
      ))}
    </VisualContainer>
  );
};

export default VisualContent;
