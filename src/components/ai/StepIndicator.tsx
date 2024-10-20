import React from 'react';
import styled from 'styled-components';

interface Step {
  label: string;
  isActive: boolean;
}

interface StepIndicatorProps {
  currentStep: number;
}

const steps: Step[] = [
  { label: "과목 선택", isActive: false },
  { label: "목표 대학 및 학과 선택", isActive: false },
  { label: "관심사 선택", isActive: false },
  { label: "이용권 선택", isActive: false },
  { label: "결과확인", isActive: false },
];

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const StepItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 60px;

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

    @media (max-width: 480px) {
      min-width: 40px;
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

  @media (max-width: 480px) {
      width: 20px;
      height: 20px;
    }
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

  @media (max-width: 480px) {
    font-size: 10px;
    max-width: none;
  max-width: 80px;
  word-break: keep-all;
  line-height: 1.2;
  }
`;

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const updatedSteps = steps.map((step, index) => ({
    ...step,
    isActive: index < currentStep
  }));

  return (
    <StepContainer>
      {updatedSteps.map((step, index) => (
        <StepItem key={index} isActive={step.isActive}>
          <StepCircle isActive={step.isActive}>
            <StepNumber>{index + 1}</StepNumber>
          </StepCircle>
          <StepLabel isActive={step.isActive}>{step.label}</StepLabel>
        </StepItem>
      ))}
    </StepContainer>
  );
};

export default StepIndicator;