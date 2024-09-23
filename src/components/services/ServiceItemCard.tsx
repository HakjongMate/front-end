import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 330px;
  height: 450px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 425px) {
    width: 80%;
    height: 100%;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
  color: #000;
`;

const ItemSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #000;
  text-align: center;
  white-space: pre-wrap;
`;

interface ServiceItemCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  link?: string;
  showAlert?: boolean;
}

const ServiceItemCard: React.FC<ServiceItemCardProps> = ({
  imageSrc,
  title,
  subtitle,
  link,
  showAlert = false,
}) => {
  const handleClick = () => {
    if (showAlert) {
      alert("해당 서비스는 아직 준비 중입니다.");
    } else if (link) {
      window.location.href = link;
    }
  };

  return (
    <CardWrapper onClick={handleClick}>
      <ItemImage src={imageSrc} alt={title} />
      <ItemTitle>{title}</ItemTitle>
      <ItemSubtitle>{subtitle}</ItemSubtitle>
    </CardWrapper>
  );
};

export default ServiceItemCard;
