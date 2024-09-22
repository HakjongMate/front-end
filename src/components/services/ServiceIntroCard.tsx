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
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  height: 140px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: #000;
  margin-bottom: 0px;
  white-space: pre-wrap;
`;

const MoreLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #000;
  text-decoration: none;
  display: inline-block;
  margin-top: auto;
  align-self: flex-end;
  &:hover {
    color: #0d3a8f;
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
