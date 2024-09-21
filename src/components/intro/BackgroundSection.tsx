import React from "react";
import styled from "styled-components";
import BackgroundImage from "../../assets/images/intro/second-image.webp";

const SectionContainer = styled.div`
  background-color: #fff;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  display: flex;
  gap: 40px;
  align-items: flex-start;
  align-items: center;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
  color: #000;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.8;
  margin-bottom: 16px;
  color: #000;
`;

const HighlightedText = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: #000;
  line-height: 1.8;
`;

const ImageWrapper = styled.div`
  width: 340px;
  height: 550px;
  overflow: hidden;
`;

const BackgroundPhoto = styled.img`
  height: 100%;
  border-radius: 8px;
`;

function BackgroundSection() {
  return (
    <SectionContainer>
      <ContentContainer>
        <TextWrapper>
          <Description>
            저는 고등학교 시절, 많은 학생들처럼 입시 준비에서 큰 혼란을
            겪었습니다.
            <br />
            내신 성적도 나쁘지 않았고, 학교 생활도 성실하게 했지만,
            <br />
            막상 생활기록부를 받아본 뒤 느꼈던 실망감은 이루 말할 수 없었습니다.
          </Description>
          <HighlightedText>
            내가 열심히 노력하고, 모든 것을 쏟아부었는데도 불구하고
            <br /> 왜 이런 나열식의 질 낮은 생활기록부가 나왔을까?
          </HighlightedText>
          <Description>
            그때 깨달았습니다.
            <br />
            단지 열심히 하는 것만으로는 부족하다는 것을.
          </Description>
          <Description>
            생활기록부는 단순한 성실성만으로는 좋은 평가를 받을 수 없는 복잡한
            영역입니다.
            <br />
            그때부터 저는{" "}
            <HighlightedText>
              생활기록부 관리의 중요성과 학생부 종합 전형의 본질을 파악
            </HighlightedText>
            하기 위해 <br />
            체계화 공부를 했습니다.
            <br />
            많은 시행착오 끝에, 저는 결국 생활기록부를 철저히 관리하여 <br />
            연세대, 고려대, 성균관대에 합격할 수 있었습니다.
          </Description>
          <HighlightedText>
            하지만, 그 과정에서 느낀 점은 분명했습니다.
            <br />
            이 모든 정보를 미리 알았다면, 그리고 누군가가 나에게 올바른 방향을
            제시해주었다면,
            <br />
            훨씬 더 나은 결과를 얻었을 것이라는 확신이 들었습니다.
          </HighlightedText>
          <Description>
            <HighlightedText>
              왜 학생들은 스스로 준비하지 못할까? 왜 비싼 돈을 들여야만 중요한
              정보를 얻을 수 있을까?
            </HighlightedText>
          </Description>
        </TextWrapper>
        <ImageWrapper>
          <BackgroundPhoto src={BackgroundImage} alt="Notebook and glasses" />
        </ImageWrapper>
      </ContentContainer>
    </SectionContainer>
  );
}

export default BackgroundSection;
