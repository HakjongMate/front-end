import React from 'react';
import styled from 'styled-components';

interface ProfileSettingStepProps {
  formData: {
    profileName: string;
    profileColor: string;
    name: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setIsColorPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileCircle = styled.div<{ bgColor: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ProfileText = styled.span`
  color: white;
  font-size: 36px;
  font-weight: bold;
`;

const ColorChangeButton = styled.button`
  background-color: transparent;
  color: #202594;
  border: 2px solid #202594;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #202594;
    color: white;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  margin-bottom: 20px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #202594;
    box-shadow: 0 0 0 3px rgba(32, 37, 148, 0.1);
  }
`;

const ProfileSettingStep: React.FC<ProfileSettingStepProps> = ({
  formData,
  handleChange,
  setIsColorPickerVisible,
}) => {
  return (
    <>
      <ProfileSection>
        <ProfileCircle bgColor={formData.profileColor}>
          <ProfileText>
            {formData.profileName
              ? formData.profileName.charAt(0).toUpperCase()
              : '?'}
          </ProfileText>
        </ProfileCircle>
        <ColorChangeButton onClick={() => setIsColorPickerVisible(true)}>
          프로필 색상 변경
        </ColorChangeButton>
      </ProfileSection>
      <Label htmlFor="profileName">프로필 이름</Label>
      <Input
        id="profileName"
        type="text"
        name="profileName"
        value={formData.profileName}
        onChange={handleChange}
        placeholder="프로필에 표시될 이름을 입력해주세요"
        required
      />
      <Label htmlFor="name">성함</Label>
      <Input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="고객님의 성함을 입력해주세요"
        required
      />
    </>
  );
};

export default ProfileSettingStep;