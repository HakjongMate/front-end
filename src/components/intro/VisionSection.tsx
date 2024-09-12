import React from 'react';
import styled from 'styled-components';
import WhiteHakjongMate from '../../assets/icons/HakjongMate_White.png';

const FullWidthSection = styled.div`
  background-color: #F5F6FB;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 64px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContent = styled.div`
  margin-bottom: 32px;
  width: 650px;
`;

const Title = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 1.8;
`;

const Subtitle = styled.h3`
  color: black;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #202594;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.8;
`;

const VisualContent = styled.div`
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

const Badge = styled.div<{ color: string }>`
  position: absolute;
  padding: 12px 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  min-width: 100px;
  text-align: center;
  border: ${({ color }) => (color === '#fff' ? '1px solid #9C9C9C' : 'none')};
`;

const VisionSection = () => {
  const badges = [
    { text: '새로운 기준', color: '#fff', textColor: '#565656', angle: 30 },
    { text: '학생부 종합 전형', color: '#fff', textColor: '#565656', angle: 75.4 },
    { text: 'AI 탐구 주제 추천', color: '#FFC107', textColor: '#fff', angle: 112.8 },
    { text: 'SUCCESS 공식', color: '#fff', textColor: '#565656', angle: 154.2 },
    { text: '학종 가이드북', color: '#28A745', textColor: '#fff', angle: 225.6 },
    { text: '세특', color: '#fff', textColor: '#565656', angle: 277 },
    { text: '생활기록부 진단 서비스', color: '#007BFF', textColor: '#fff', angle: 318.4 },
  ];

  return (
    <FullWidthSection>
      <Container>
        <TextContent>
          <Subtitle>막막한 생활기록부의 명쾌한 솔루션</Subtitle>
          <Title>
            학종메이트는<br />
            세상에 단 하나뿐인<br />
            차별화된 생활기록부를 위한 길잡이입니다.
          </Title>
          <Description>
            학종메이트와 함께라면,<br />
            더 이상 학생부 종합 전형은 어렵지 않습니다.
          </Description>
        </TextContent>
        <VisualContent>
          <Circle>
            <Logo src={WhiteHakjongMate} alt="HakjongMate Logo" />
            <CompanyName>HakjongMate</CompanyName>
          </Circle>
          {badges.map((badge, index) => (
            <Badge
              key={index}
              color={badge.color}
              style={{
                background: badge.color,
                color: badge.textColor,
                top: `${200 - 210 * Math.cos(badge.angle * Math.PI / 180)}px`,
                left: `${200 + 210 * Math.sin(badge.angle * Math.PI / 180)}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {badge.text}
            </Badge>
          ))}
        </VisualContent>
      </Container>
    </FullWidthSection>
  );
};

export default VisionSection;
