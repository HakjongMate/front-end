import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AIContext from "../../contexts/AIContext";
import StepIndicator from "../../components/ai/StepIndicator";
import subjectData from "../../assets/data/subject.json";
import ButtonContainer from "../../components/ai/ButtonContainer";

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const SubjectsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

const TableHeader = styled.th`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 12px 40px;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  &:first-child {
    text-align: center;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dee2e6;
  padding: 12px;
  vertical-align: middle;
  text-align: center;
  &:last-child {
    text-align: left;
    padding-left: 16px;
  }
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
`;

const SubjectButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#1a237e" : "transparent")};
  color: ${(props) => (props.isSelected ? "white" : "#333")};
  border: none;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#0d47a1" : "#e8eaf6")};
  }
`;

const AISubjectPage: React.FC = () => {
  const { selectedSubject, setSelectedSubject } = useContext(AIContext);
  const navigate = useNavigate();

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleNextClick = () => {
    if (selectedSubject) {
      navigate("/ai/university");
    } else {
      alert("과목을 선택해주세요.");
    }
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={1} />
      <PageTitle>세특 주제이 필요한 과목을 선택해주세요</PageTitle>
      <SubjectsTable>
        <thead>
          <tr>
            <TableHeader>교과군</TableHeader>
            <TableHeader>세부과목</TableHeader>
          </tr>
        </thead>
        <tbody>
          {subjectData.map((category) => (
            <tr key={category.id}>
              <TableCell>{category.area}</TableCell>
              <TableCell>
                <SubjectGrid>
                  {category.details.map((subject) => (
                    <SubjectButton
                      key={subject.id}
                      isSelected={selectedSubject === subject.detail}
                      onClick={() => handleSubjectClick(subject.detail)}
                    >
                      {subject.detail}
                    </SubjectButton>
                  ))}
                </SubjectGrid>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </SubjectsTable>

      <ButtonContainer
        onNextClick={handleNextClick}
        isNextDisabled={!selectedSubject}
      />
    </PageWrapper>
  );
};

export default AISubjectPage;
