import React, { useState } from "react";
import styled from "styled-components";

const QnAWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const QnACard = styled.div`
  background-color: #fbfbfc;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px 20px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    margin-bottom: 10px;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

const QuestionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: bold;
  color: #333;
  font-size: 20px;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    font-size: 18px;
  }
`;

const QuestionText = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ToggleIcon = styled.span`
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: transform 0.3s ease;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-left: 5px;
    margin-top: 5px;
  }
`;

const Answer = styled.div<{ isOpen: boolean }>`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: ${({ isOpen }) => (isOpen ? "16px" : "0")};
  padding-top: ${({ isOpen }) => (isOpen ? "16px" : "0")};
  border-top: ${({ isOpen }) => (isOpen ? "1px solid #eee" : "none")};

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

interface QnAItemProps {
  question: string;
  answer: string;
}

const QnAItemComponent: React.FC<QnAItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QnACard>
      <QuestionHeader>
        <QuestionInfo>
          <QuestionIcon>Q</QuestionIcon>
          <QuestionText>{question}</QuestionText>
        </QuestionInfo>
        <ToggleIcon
          onClick={() => setIsOpen(!isOpen)}
          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
        >
          ▼
        </ToggleIcon>
      </QuestionHeader>
      <Answer isOpen={isOpen}>{answer}</Answer>
    </QnACard>
  );
};

interface QnAComponentProps {
  qnaData: { id?: number; question: string; answer: string }[];
}

const QnAComponent: React.FC<QnAComponentProps> = ({ qnaData }) => {
  return (
    <QnAWrapper>
      {qnaData.map((item, index) => (
        <QnAItemComponent
          key={item.id || index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </QnAWrapper>
  );
};

export default QnAComponent;
