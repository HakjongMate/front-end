import React from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/images/home/hooking-bg.jpg";

const HookingSectionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 480px;
  overflow: hidden;
  text-align: center;
  padding: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

const HookingTextContainer = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1440px;
  margin: 0 auto;
  color: white;
`;

const HookingText = styled.h1`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const EmphasizedText = styled.span`
  font-size: 28px;
  font-weight: 700;
  display: block;
  margin-bottom: 20px;
  line-height: 1.8;

  & u {
    text-decoration: underline;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: #0f4abe;
  margin-top: 20px;
  color: white;
  padding: 15px 40px;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 20px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #6c9dff;
  }
`;

function HookingSection() {
  // 서비스 섹션이 있는 곳으로 스크롤 이동
  // 추후 수정 필요
  const scrollToServiceSection = () => {
    document
      .getElementById("service-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HookingSectionContainer>
      <Overlay />
      <HookingTextContainer>
        <HookingText>
          왜 학생부 종합전형은 비싼 돈 주고,
          <br />
          고액의 컨설팅을 받아가며 준비해야 하나요?
        </HookingText>
        <HookingText>진정한 경쟁력은, 스스로에서 나옵니다.</HookingText>
        <EmphasizedText>
          세상에서 단 하나뿐인 나만의 생활기록부,
          <br />
          <u>“학종메이트”와 함께라면 가능합니다.</u>
        </EmphasizedText>
        <CTAButton onClick={scrollToServiceSection}>
          어떤 서비스를 제공하나요?
        </CTAButton>
      </HookingTextContainer>
    </HookingSectionContainer>
  );
}

export default HookingSection;
