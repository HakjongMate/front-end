import React from "react";
import styled from "styled-components";

const GradientContainer = styled.div`
  flex: 1;
  width: 100%;
  background: linear-gradient(to bottom, #0f4abe, #002368);
  padding: 50px 0;
  text-align: center;
`;

const GradientText = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 30px;
  color: white;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Subtitle = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 20px;
  color: white;
  line-height: 1.5;
`;

const GradationIntro = () => {
  return (
    <GradientContainer>
      <GradientText>
        학종메이트 서비스 후기
      </GradientText>
      <Subtitle>
        실제 서비스를 사용하신 후 작성해주신 소중한 후기들입니다.
      </Subtitle>
    </GradientContainer>
  );
};

export default GradationIntro;
