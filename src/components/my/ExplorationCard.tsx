import React from 'react';
import styled from 'styled-components';
import { Exploration } from '../../types'; // 타입 임포트

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StateTag = styled.span<{ state: string }>`
  background-color: ${({ state }) => (state === 'IN_PROGRESS' ? '#FFC700' : state === 'COMPLETED' ? '#30B700' : '#FF8C00')};
  color: #fff;
  padding: 5px 10px;
  border-radius: 8px;
  margin-right: 10px;
`;

const AIIcon = styled.span`
  background-color: #386bcd;
  color: #fff;
  padding: 5px 10px;
  border-radius: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
`;

const ExplorationCard: React.FC<Exploration> = ({ title, state, ai, contents }) => {
  return (
    <CardWrapper>
      <Title>{title}</Title>
      <div>
        {ai && <AIIcon>AI 추천</AIIcon>}
        <StateTag state={state}>{state === 'IN_PROGRESS' ? '탐구 진행 중' : state === 'COMPLETED' ? '탐구 완료' : '탐구 진행 전'}</StateTag>
      </div>
      <Description>{contents}</Description>
    </CardWrapper>
  );
};

export default ExplorationCard;
