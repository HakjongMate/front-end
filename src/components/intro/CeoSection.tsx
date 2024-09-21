import React from "react";
import styled from "styled-components";
import CeoImage from "../../assets/images/intro/first-image.webp";

const SectionContainer = styled.div`
  background-color: #fff;
  padding: 60px 20px 20px;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: auto;
  flex-shrink: 0;
  margin-right: 5px;
`;

const CeoPhoto = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
  color: #000;
`;

const SubTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.8;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.8;
  margin-bottom: 16px;
  color: #000;
`;

function CeoSection() {
  return (
    <SectionContainer>
      <ContentContainer>
        <ImageWrapper>
          <CeoPhoto src={CeoImage} alt="CEO" />
        </ImageWrapper>
        <TextWrapper>
          <SubTitle>안녕하세요.</SubTitle>
          <SubTitle>
            스스로 준비하는 생활기록부의 시작,
            <br />
            학종메이트 대표 이건우입니다.
          </SubTitle>
          <Description>
            학종메이트는 모든 학생이 스스로의 차별점을 발견하고,
            <br />
            이를 극대화해 목표 대학이 원하는 '인재'로 만들어드립니다.
          </Description>
          <Description>
            학생부 종합 전형은 상대적으로 부족한 내신을 뒤집고 더 높은 대학에
            진학할 수 있는 매력적인 전형입니다. <br /> 그렇기에 많은 학생들이
            학생부 종합 전형을 준비하지만, 제대로 준비하는 학생은 정말 드뭅니다.
          </Description>
          <Description>
            "학생부 종합 전형을 어떻게 준비해야 하는지"에 대한 명확한 솔루션을
            모르기 때문이죠.
            <br />
            이러한 정보는 너무나도 방대하고, 각자 하는 말도 달라서 정확한 정보를
            얻기가 힘듭니다.
          </Description>
        </TextWrapper>
      </ContentContainer>
    </SectionContainer>
  );
}

export default CeoSection;
