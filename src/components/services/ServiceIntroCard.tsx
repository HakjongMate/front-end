import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px 20px;
  width: 280px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1024px) {
    width: 260px;
    padding: 25px 15px;
  }

  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 15px 10px;
  }
`;

const CardImage = styled.img`
  height: 140px;
  margin-bottom: 20px;
  object-fit: contain;

  @media (max-width: 1024px) {
    height: 130px;
    margin-bottom: 18px;
  }

  @media (max-width: 768px) {
    height: 120px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    height: 100px;
    margin-bottom: 14px;
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 17px;
    margin-bottom: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 14px;
  }
`;

const CardDescription = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: #000;
  margin-bottom: 20px;
  white-space: pre-wrap;

  @media (max-width: 1024px) {
    font-size: 15px;
    margin-bottom: 18px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 0px;
  }
`;

const MoreLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #0d3a8f;
  text-decoration: none;
  display: inline-block;
  margin-top: auto;
  align-self: center;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0a2a6a;
  }

  @media (max-width: 1024px) {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

interface ServiceIntroCardProps {
  imageSrc: string;
  description: string;
  title: string;
  link: string;
}

const ServiceIntroCard: React.FC<ServiceIntroCardProps> = ({
  imageSrc,
  description,
  title,
  link,
}) => {
  const location = useLocation();
  const isCurrentPage = location.pathname === link;

  return (
    <ServiceCard>
      <CardImage src={imageSrc} alt={title} loading="lazy" />
      <CardDescription>{description}</CardDescription>
      <CardTitle>{title}</CardTitle>
      <MoreLink
        to={isCurrentPage ? `${link}#details` : link}
        onClick={(e) => {
          if (isCurrentPage) {
            e.preventDefault();
            document.querySelector('#details')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        더 알아보기 &gt;
      </MoreLink>
    </ServiceCard>
  );
};

export default ServiceIntroCard;
