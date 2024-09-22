import React from 'react';
import styled from 'styled-components';
import WhiteHakjongMate from '../../assets/icons/HakjongMate_White.png';

const VisualContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
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
`;

const Logo = styled.img`
  width: 80px;
  height: 100px;
  margin-bottom: 20px;
`;

const CompanyName = styled.span`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

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
