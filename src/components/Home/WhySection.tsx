import React from "react";
import styled from "styled-components";
import { GroupAdd, TrendingUp, EmojiEvents } from "@mui/icons-material";
import WhyCard from "./WhyCard";
import GradientSVG from "../common/GradientSVG";

const SectionWrapper = styled.div`
  background-color: #f5f6fb;
  padding: 20px 0 90px;
  display: flex;
  justify-content: center;
`;

const SectionContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 34px;
  font-weight: 700;
  color: #000;
  margin-bottom: 30px;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.7;
`;

const SectionDescriptionBold = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.7;
  margin-bottom: 40px;
`;

const ServiceGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const CTAButton = styled.a`
  position: absolute;
  right: 0px;
  background-color: #0f4abe;
  color: #fff;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #0d3a8f;
  }
`;

function WhySection() {
  const services = [
    {
      Icon: GroupAdd,
      title: "진짜 실력을 키우는 서비스",
      description: `학종메이트는 진정한 경쟁력은 \n 스스로에서 나온다고 믿습니다. \n 맞춤형 솔루션을 통해 실력을 키워보세요.`,
    },
    {
      Icon: TrendingUp,
      title: "합리적인 가격의 올인원 케어",
      description: `이제는 비싼 가격의 컨설팅 대신, \n 누구나 접근 가능한 서비스로 \n 학생 스스로의 역할을 강화하세요.`,
    },
    {
      Icon: EmojiEvents,
      title: "찍어내는 생활기록부는 잊으세요",
      description: `학생마다 고유의 개성과 목표를 담은 \n 생활기록부를 만들 수 있도록 돕습니다. \n 당신만의 이야기를 담아내는\n 생활기록부를 만듭니다.`,
    },
  ];

  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>왜 학종메이트인가요?</SectionTitle>
        <SectionDescription>
          생활기록부의 핵심은 '유기적인 구성'입니다. <br />
          이를 위해서는 3개년을 미리 기획하고 학교생활을 하시는 것이
          '압도적으로' 유리합니다.
        </SectionDescription>
        <SectionDescriptionBold>
          학종메이트는 학생부 종합전형의 열쇠인 '생활기록부' 브랜딩 및 관리를
          도와
          <br />
          스스로 실력을 키울 수 있는 모든 솔루션을 제공합니다.
        </SectionDescriptionBold>

        <ServiceGrid>
          {services.map(({ Icon, title, description }, index) => (
            <WhyCard
              key={index}
              Icon={Icon}
              title={title}
              description={description}
            />
          ))}
        </ServiceGrid>

        <CTAButton href="/intro">학종메이트에 대해 더 알아보기 &gt;</CTAButton>
      </SectionContainer>

      <GradientSVG />
    </SectionWrapper>
  );
}

export default WhySection;