import React from "react";
import styled from "styled-components";

interface ButtonContainerProps {
  onPreviousClick?: () => void;
  onNextClick: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  previousText?: string;
  nextText?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const PreviewButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? "#e0e0e0" : "#ffffff")};
  color: ${(props) => (props.disabled ? "#aaa" : "#000")};
  border: 1px solid ${(props) => (props.disabled ? "#aaa" : "#666")};
  padding: 10px 40px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 400;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ffffff" : "#f5f5f5")};
  }
`;

const NextButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? "#e0e0e0" : "#1a237e")};
  color: ${(props) => (props.disabled ? "#aaa" : "white")};
  border: none;
  padding: 10px 40px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 400;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#e0e0e0" : "#0d47a1")};
  }
`;

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  onPreviousClick,
  onNextClick,
  isPreviousDisabled = false,
  isNextDisabled = false,
  previousText = "이전",
  nextText = "다음",
}) => {
  return (
    <Container>
      {onPreviousClick && (
        <PreviewButton onClick={onPreviousClick} disabled={isPreviousDisabled}>
          {previousText}
        </PreviewButton>
      )}
      <NextButton onClick={onNextClick} disabled={isNextDisabled}>
        {nextText}
      </NextButton>
    </Container>
  );
};

export default ButtonContainer;
