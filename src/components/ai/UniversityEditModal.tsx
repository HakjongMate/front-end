import React, { useState } from "react";
import styled from "styled-components";

interface UniversityEditModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  university: string;
  major: string;
  onSave: (name: string, major: string) => void;
}

const UniversityEditModal: React.FC<UniversityEditModalProps> = ({
  modalVisible,
  setModalVisible,
  university,
  major,
  onSave,
}) => {
  const [universityName, setUniversityName] = useState(university);
  const [majorName, setMajorName] = useState(major);

  const handleSave = () => {
    onSave(universityName, majorName);
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>대학교와 학과 입력</ModalHeader>
            <ModalBody>
              <InputWrapper>
                <Label>대학교명</Label>
                <Input
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  placeholder="대학교명을 입력하세요"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>학과명</Label>
                <Input
                  value={majorName}
                  onChange={(e) => setMajorName(e.target.value)}
                  placeholder="학과명을 입력하세요"
                />
              </InputWrapper>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setModalVisible(false)}>
                취소
              </CancelButton>
              <SaveButton onClick={handleSave}>저장</SaveButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const ModalHeader = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #999;
  }
`;

const SaveButton = styled.button`
  background-color: #202594;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0009bd;
  }
`;

export default UniversityEditModal;
