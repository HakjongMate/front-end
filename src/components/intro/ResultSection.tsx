import React from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/images/intro/result-bg.webp";

const ResultSectionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 500px;
  overflow: hidden;
  text-align: center;
  padding: 60px 20px;

  @media (max-width: 768px) {
    min-height: 600px;
    padding: 40px 10px;
  }

  @media (max-width: 480px) {
    min-height: 700px;
    padding: 30px 5px;
    min-height: 500px;
  }

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

    @media (max-width: 768px) {
      background: rgba(0, 0, 0, 0.6);
    }
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

const ResultTextContainer = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  color: white;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const ResultText = styled.h1`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.8;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 12px;
    white-space: pre-line;
  }
`;

const ListText = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 1.8;
  margin: 25px 0;

  @media (max-width: 768px) {
    font-size: 22px;
    margin: 20px 0;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin: 15px 0;
    white-space: pre-line;
  }
`;

function ResultSection() {
  return (
    <ResultSectionContainer>
      <Overlay />
      <ResultTextContainer>
        <ResultText>
          수많은 입시 관련 자료를 공부하고, 컨설팅 수업을 하고, <br />
          업계 종사자, 고등 교사 등에게 자문을 구하며 {"\n"} 
          내린 결론은 아래와 같습니다.
        </ResultText>
        <ListText>
          1. 학생부 종합 전형은 누구나 스스로 준비할 수 있다.
          <br /> 다만 구체적인 방법을 몰라서 하지 못하는 것이다.
        </ListText>
        <ListText>
          2. 고액 컨설팅을 받아야 하는 이유는 어디에도 없다. <br />
          학생부 종합전형을 준비할 수 있는 공식은 정해져 있다.
        </ListText>
        <ResultText>
          학종메이트는 여러분들이 가장 어려워하는
          <br />
          '학생부 종합 전형을 어떻게 준비해야 하는지'에 대한 {"\n"} 
          명확한 공식을 전달합니다.
          <br />
          <br />
          여러분의 성공적인 입시,  {"\n"} 
          더 나아가 진정으로 '우수한 학생'이 되는 여정을 {"\n"} 
          학종메이트가 돕겠습니다.
          <br />
          여러분의 '성공'을 진심으로 응원합니다. 감사합니다.
          <br />
          <br />
          학종메이트 대표 이건우 드림.
        </ResultText>
      </ResultTextContainer>
    </ResultSectionContainer>
  );
}

export default ResultSection;
