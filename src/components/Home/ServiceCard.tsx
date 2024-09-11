import React from "react";
import styled from "styled-components";

const ServiceCardContainer = styled.div<{ isBest?: boolean }>`
  background-color: #fff;
  border: ${({ isBest }) => (isBest ? "2px solid #007BFF" : "1px solid #ccc")};
  border-radius: 10px;
  padding: 40px 20px 0px;
  width: 290px;
  height: 440px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  // 중간 카드일 경우 마진으로 내리기
  ${({ isBest }) =>
    isBest &&
    `
    margin-top: 40px;
  `}

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 40px;
    line-height: 1.8;
    color: #000000;
    white-space: pre-line;
  }

  a {
    font-size: 14px;
    display: block;
    text-align: right;
    color: #000000;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ServiceIcon = styled.img`
  width: 200px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const BestText = styled.div`
  position: absolute;
  top: 0px;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
  text-align: center;
`;

interface ServiceCardProps {
  title: string;
  description: string;
  iconSrc: string;
  isBest?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconSrc,
  isBest,
}) => {
  return (
    <ServiceCardContainer isBest={isBest}>
      {isBest && <BestText>Best</BestText>}
      <h3>{title}</h3>
      <ServiceIcon src={iconSrc} alt={title} />
      <p>{description}</p>
      <a href="#">더 알아보기 &gt;</a>
    </ServiceCardContainer>
  );
};

export default ServiceCard;
