import React from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/images/home/hooking-bg.webp";

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

  @media (max-width: 768px) {
    height: 380px;
    padding: 5px;
  }

  @media (max-width: 425px) {
    height: 300px;
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
  padding: 0 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 425px) {
    padding: 0 5px;
  }
`;

const HookingText = styled.h1`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.6;
  }

  @media (max-width: 425px) {
    font-size: 16px;
    line-height: 1.4;
  }
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

  @media (max-width: 768px) {
    font-size: 22px;
    line-height: 1.6;
  }

  @media (max-width: 425px) {
    font-size: 18px;
    line-height: 1.4;
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

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 18px;
  }

  @media (max-width: 425px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

function HookingSection() {
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
