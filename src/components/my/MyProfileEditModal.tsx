import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserProfile } from '../../types';

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

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #202594;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background-color: #202594;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  color: white;
`;

interface MyProfileEditModalProps {
  userProfile: UserProfile | null;
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

const MyProfileEditModal: React.FC<MyProfileEditModalProps> = ({ userProfile, onClose, onSave }) => {
  const [profile, setProfile] = useState<UserProfile | null>(userProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => prevProfile ? { ...prevProfile, [name]: value } : null);
  };

  const handleSave = () => {
    if (profile) {
      onSave(profile);
      onClose();
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>프로필 수정</Title>
        <Form>
          <Label>이름</Label>
          <Input type="text" name="username" value={profile.username} onChange={handleInputChange} />

          <Label>학교</Label>
          <Input type="text" name="high_school" value={profile.high_school} onChange={handleInputChange} />

          <Label>학년</Label>
          <Input type="text" name="grade" value={profile.grade} onChange={handleInputChange} />

          <Label>등급</Label>
          <Input type="text" name="score" value={profile.score} onChange={handleInputChange} />

          <Label>꿈</Label>
          <Input type="text" name="dream" value={profile.dream} onChange={handleInputChange} />

          <ButtonContainer>
            <CancelButton type="button" onClick={onClose}>취소</CancelButton>
            <SaveButton type="button" onClick={handleSave}>저장</SaveButton>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyProfileEditModal;
