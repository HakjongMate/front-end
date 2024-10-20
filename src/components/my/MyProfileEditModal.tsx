import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPickerModal from '../common/ColorPickerModal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  appearance: none;
`;

const SelectIcon = styled(ArrowDropDownIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
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
  const [customScore, setCustomScore] = useState<number | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => {
      if (!prevProfile) return null;

      // 학년을 숫자로 변환하여 저장
      if (name === 'grade') {
        return { ...prevProfile, [name]: Number(value) };
      }

      // 성적 입력 처리
      if (name === 'score') {
        if (value === 'custom') {
          return { ...prevProfile, score: customScore || 0 };  // 커스텀 점수 처리
        }
        return { ...prevProfile, score: Number(value) };
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

          <Label>프로필 이름</Label>
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
          <SelectWrapper>
            <Select
              id="grade"
              name="grade"
              value={profile.grade}
              onChange={handleInputChange}
            >
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
            </Select>
            <SelectIcon />
          </SelectWrapper>

          <Label>성적</Label>
          <SelectWrapper>
            <Select
              id="score"
              name="score"
              value={profile.score.toString()}
              onChange={handleInputChange}
            >
              <option value="1.0">1.0</option>
              <option value="2.0">2.0</option>
              <option value="3.0">3.0</option>
              <option value="custom">직접 입력</option>
            </Select>
            <SelectIcon />
          </SelectWrapper>

          {profile.score === 0 && (
            <Input
              type="number"
              name="customScore"
              value={customScore || ''}
              onChange={e => setCustomScore(parseFloat(e.target.value))}
              placeholder="내신을 입력해주세요 (1.0 ~ 5.0)"
              min="1.0"
              max="5.0"
              step="0.1"
            />
          )}

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
