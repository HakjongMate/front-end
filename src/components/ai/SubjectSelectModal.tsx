import React, { useState } from 'react';
import styled from 'styled-components';
import subjectData from '../../assets/data/subject.json';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 90%;
  max-width: 900px;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 400px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const SubjectsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TableHeader = styled.th`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 12px 50px;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    padding: 10px 30px;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SubjectButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#1a237e" : "transparent")};
  color: ${(props) => (props.isSelected ? "white" : "#333")};
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#0d47a1" : "#e8eaf6")};
  }

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SaveButton = styled.button`
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

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 25px;
  }
`;

const CancelButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#e0e0e0" : "#ffffff")};
  color: ${(props) => (props.disabled ? "#aaa" : "#000")};
  border: 1px solid ${(props) => (props.disabled ? "#aaa" : "#666")};
  padding: 10px 40px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 400;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  margin-right: 20px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ffffff" : "#f5f5f5")};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 25px;
  }
`;

interface SubjectSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subject: string) => void;
}

const SubjectSelectModal: React.FC<SubjectSelectModalProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  if (!isOpen) return null;

  const handleSaveClick = () => {
    onSave(selectedSubject);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>과목 선택</Title>
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
                        onClick={() => setSelectedSubject(subject.detail)}
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
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SaveButton onClick={handleSaveClick} disabled={!selectedSubject}>
            저장
          </SaveButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SubjectSelectModal;
