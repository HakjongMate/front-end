import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPickerModal from '../common/ColorPickerModal';

interface UserProfile {
  id: string;
  username: string;
  high_school: string;
  grade: number;
  score: number;
  dream: string;
  profile_color: string;
  profile_name: string;
}

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

@media (max-width: 768px) {
  max-width: 90%;
}

@media (max-width: 480px) {
  max-width: 80%;
}
`;

const ProfileCircle = styled.div<{ bgColor: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
`;

const ProfileText = styled.span`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const ColorChangeButton = styled.button`
  background: none;
  border: none;
  color: #202594;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  display: block;
  margin: 0 auto 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #202594;
  margin-bottom: 20px;
  text-align: center;
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
  flex: 1;
`;

const SaveButton = styled(Button)`
  background-color: #202594;
  color: white;
  margin-left: 10px;
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

const MyProfileEditModal: React.FC<MyProfileEditModalProps> = ({
  userProfile,
  onClose,
  onSave,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(userProfile);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => {
      if (!prevProfile) return null;
      
      // Handle numeric inputs
      if (name === 'grade' || name === 'score') {
        return { ...prevProfile, [name]: Number(value) };
      }
      
      // Update both username and profile_name if username changes
      if (name === 'username') {
        return { ...prevProfile, username: value, profile_name: value };
      }
      
      return { ...prevProfile, [name]: value };
    });
  };

  const handleColorChange = (color: string) => {
    setProfile(prevProfile => 
      prevProfile ? { ...prevProfile, profile_color: color } : null
    );
    setIsColorPickerVisible(false);
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
        <ProfileCircle bgColor={profile.profile_color}>
          <ProfileText>{profile.profile_name}</ProfileText>
        </ProfileCircle>
        <ColorChangeButton onClick={() => setIsColorPickerVisible(true)}>
          색상 변경
        </ColorChangeButton>
        <Form>
          <Label>이름</Label>
          <Input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleInputChange}
          />

          <Label>프로필이름</Label>
          <Input
            type="text"
            name="profile_name"
            value={profile.profile_name}
            onChange={handleInputChange}
          />

          <Label>학교</Label>
          <Input
            type="text"
            name="high_school"
            value={profile.high_school}
            onChange={handleInputChange}
          />

          <Label>학년</Label>
          <Input
            type="number"
            name="grade"
            value={profile.grade}
            onChange={handleInputChange}
            min={1}
            max={3}
          />

          <Label>등급</Label>
          <Input
            type="number"
            name="score"
            value={profile.score}
            onChange={handleInputChange}
            step={0.1}
            min={1}
            max={9}
          />

          <Label>꿈</Label>
          <Input
            type="text"
            name="dream"
            value={profile.dream}
            onChange={handleInputChange}
          />

          <ButtonContainer>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
            <SaveButton type="button" onClick={handleSave}>
              저장
            </SaveButton>
          </ButtonContainer>
        </Form>

        <ColorPickerModal
          visible={isColorPickerVisible}
          onClose={() => setIsColorPickerVisible(false)}
          onSelectColor={handleColorChange}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyProfileEditModal;