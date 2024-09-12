import React from "react";
import styled from "styled-components";

interface WhyCardProps {
  Icon: React.ComponentType;
  title: string;
  description: string;
}

const WhyCardContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 20px;
  width: 330px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: #0f4abe;
    margin-bottom: 30px;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    color: #333;
    margin-bottom: 15px;
    line-height: 1.6;
    white-space: pre-line;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    font-size: 80px;
    fill: url(#blue-gradient);
  }
`;

const WhyCard: React.FC<WhyCardProps> = ({ Icon, title, description }) => {
  return (
    <WhyCardContainer>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <h3>{title}</h3>
      <p>{description}</p>
    </WhyCardContainer>
  );
};

export default WhyCard;
