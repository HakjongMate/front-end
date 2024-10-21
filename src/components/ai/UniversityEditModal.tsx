import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface UniversityEditModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  university: string;
  major: string;
  onSave: (name: string, major: string) => void;
}

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

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;

const ModalHeader = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
  }
  
  @media (max-width: 320px) {
    padding: 5px;
    font-size: 10px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
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

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
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

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

const UniversityEditModal: React.FC<UniversityEditModalProps> = ({
  modalVisible,
  setModalVisible,
  university,
  major,
  onSave,
}) => {
  const [universityName, setUniversityName] = useState(university);
  const [majorName, setMajorName] = useState(major);

  useEffect(() => {
    setUniversityName(university);
    setMajorName(major);
  }, [university, major, modalVisible]);

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
                  placeholder="희망 대학교의 정확한 이름을 입력하세요 ex) 서울대학교"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>학과명</Label>
                <Input
                  value={majorName}
                  onChange={(e) => setMajorName(e.target.value)}
                  placeholder="희망 학과명을 입력하세요 ex) 컴퓨터공학과"
                />
              </InputWrapper>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setModalVisible(false)}>취소</CancelButton>
              <SaveButton onClick={handleSave}>저장</SaveButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default UniversityEditModal;
