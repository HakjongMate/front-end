import React from 'react';
import styled from 'styled-components';

interface Step {
  label: string;
  isActive: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StepItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 12px;
    left: calc(50% + 20px);
    right: calc(-50% + 20px);
    height: 2px;
    background-color: ${(props) => (props.isActive ? '#202594' : '#e0e0e0')};
    z-index: 1;
  }
`;

const StepCircle = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? '#202594' : '#e0e0e0')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  z-index: 2;
`;

const StepNumber = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const StepLabel = styled.span<{ isActive: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isActive ? '#202594' : '#888')};
  text-align: center;
`;

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps }) => {
  return (
    <StepContainer>
      {steps.map((stepItem, index) => (
        <StepItem key={index} isActive={stepItem.isActive}>
          <StepCircle isActive={stepItem.isActive}>
            <StepNumber>{index + 1}</StepNumber>
          </StepCircle>
          <StepLabel isActive={stepItem.isActive}>{stepItem.label}</StepLabel>
        </StepItem>
      ))}
    </StepContainer>
  );
};

export default StepIndicator;
