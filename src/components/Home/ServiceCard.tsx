import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ServiceCardContainer = styled.div<{ isBest?: boolean }>`
  background-color: #fff;
  border: ${({ isBest }) => (isBest ? "2px solid #007BFF" : "1px solid #ccc")};
  border-radius: 10px;
  padding: 40px 20px 20px;
  width: 290px;
  height: 440px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  position: relative;

  ${({ isBest }) =>
    isBest &&
    `
    margin-top: -20px;
    
    @media (max-width: 768px) {
      margin-top: 0;
      order: -1;
    }
  `}

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    width: 260px;
    height: 400px;
    padding: 30px 15px 15px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-top: 0 !important;
  }

  @media (max-width: 480px) {
    margin: 0 20px;
    padding: 30px 10px 10px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
  line-height: 1.8;
  color: #000000;
  white-space: pre-line;

  @media (max-width: 1024px) {
    font-size: 13px;
    margin-bottom: 30px;
  }
`;

const ServiceLink = styled(Link)`
  font-size: 14px;
  display: block;
  text-align: right;
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ServiceIcon = styled.img`
  width: 200px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 180px;
    height: 135px;
  }
`;

const BestText = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
  text-align: center;
  background-color: #fff;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 20px;
    top: -10px;
  }
`;

interface ServiceCardProps {
  title: string;
  description: string;
  iconSrc: string;
  link: string;
  isBest?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, iconSrc, link, isBest }) => {
  return (
    <ServiceCardContainer isBest={isBest}>
      {isBest && <BestText>Best</BestText>}
      <ServiceTitle>{title}</ServiceTitle>
      <ServiceIcon src={iconSrc} alt={title} />
      <ServiceDescription>{description}</ServiceDescription>
      <ServiceLink to={link}>더 알아보기 &gt;</ServiceLink>
    </ServiceCardContainer>
  );
};

export default ServiceCard;
