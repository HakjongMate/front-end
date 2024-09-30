import React, { useState } from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const PointInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PointInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  text-align: right;
`;

const ApplyButton = styled.button`
  padding: 10px 15px;
  background-color: white;
  border: 1px solid #202594;
  color: #202594;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TotalPointWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
`;

const TotalPoint = styled.span`
  margin-left: 10px;
  font-weight: 600;
`;

const PurchasePointSection: React.FC = () => {
  const totalAvailablePoints = 1000;
  const [usedPoints, setUsedPoints] = useState<string>('0');

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setUsedPoints(value);
  };

  const handleApplyPoints = () => {
    setUsedPoints(totalAvailablePoints.toString());
  };

  return (
    <SectionWrapper>
      <SectionTitle>포인트</SectionTitle>
      <PointInputWrapper>
        <PointInput
          type="text"
          value={usedPoints}
          onChange={handlePointChange}
          placeholder="0"
        />
        <ApplyButton onClick={handleApplyPoints}>전액사용</ApplyButton>
      </PointInputWrapper>
      <TotalPointWrapper>
        <span>보유 포인트</span>
        <TotalPoint>{totalAvailablePoints.toLocaleString()}</TotalPoint>
      </TotalPointWrapper>
    </SectionWrapper>
  );
};

export default PurchasePointSection;