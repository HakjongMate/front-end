import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled.div`
  width: calc(100% - 40px);
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  margin: 10px auto;
  border: 1px solid #CECECE;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
`;

const AddIcon = styled.div`
  font-size: 48px;
  color: #CECECE;
`;

const AddText = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const InterAddCard: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ai/exploration/add');
  };

  return (
    <CardWrapper onClick={handleClick}>
      <AddIcon>+</AddIcon>
      <AddText>새로운 관심사 추가</AddText>
    </CardWrapper>
  );
};

export default InterAddCard;