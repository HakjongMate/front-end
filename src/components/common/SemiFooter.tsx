import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  width: 100%;
  background-color: #0f4abe;
  padding: 100px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: 80px 0px;
  }

  @media (max-width: 768px) {
    padding: 50px 0px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }

  @media (max-width: 320px) {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  width: 150px;
  padding: 8px 16px;
  margin-top: 50px;
  background-color: white;
  color: #0f4abe;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    width: 100px;
    padding: 6px 12px;
    margin-top: 20px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
    width: 90px;
    padding: 5px 10px;
    margin-top: 15px;
  }
`;

function SemiFooter() {
  return (
    <FooterContainer>
      <FooterContent>
        <Title>생기부 컨설팅의 새로운 기준,</Title>
        <Title>학종 메이트와 함께 원하는 대학가기</Title>
        <StyledButton to="/apply">수업 신청하기</StyledButton>
      </FooterContent>
    </FooterContainer>
  );
}

export default SemiFooter;
