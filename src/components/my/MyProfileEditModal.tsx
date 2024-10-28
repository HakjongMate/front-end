import React, { useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
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
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 450px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
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
  background-color: ${(props) => props.bgColor};
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
    setProfile((prevProfile) => {
      if (!prevProfile) return null;

      if (name === 'grade') {
        return { ...prevProfile, [name]: Number(value) };
      }

      if (name === 'score') {
        if (value === 'custom') {
          return { ...prevProfile, score: customScore || 0 };
        }
        return { ...prevProfile, score: Number(value) };
      }

      return { ...prevProfile, [name]: value };
    });
  };

  const handleColorChange = (color: string) => {
    setProfile((prevProfile) =>
      prevProfile ? { ...prevProfile, profileColor: color } : null
    );
    setIsColorPickerVisible(false);
  };

  const handleSave = async () => {
    if (profile) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify(profile),
        });
  
        if (response.ok) {
          const updatedProfile = await response.json();
          onSave(updatedProfile.data);
  
          onClose();
          setTimeout(() => {
            toast.success('프로필이 성공적으로 저장되었습니다!', {
              style: {
                maxWidth: '1000px',
                width: '300px',
                fontSize: '16px',
              },
            });
          }, 100);
        } else {
          toast.error('프로필 저장에 실패했습니다. 잠시 뒤에 시도해주세요.', {
            style: {
              maxWidth: '1000px',
              width: '300px',
              fontSize: '16px',
            },
          });
        }
      } catch (error) {
        toast.error('프로필 저장에 실패했습니다. 잠시 뒤에 시도해주세요.', {
          style: {
            maxWidth: '1000px',
            width: '300px',
            fontSize: '16px',
          },
        });
        console.error('API 호출 중 오류 발생:', error);
      }
    }
  };
  

  if (!profile) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>프로필 수정</Title>
        <ProfileCircle bgColor={profile.profileColor}>
          <ProfileText>{profile.profileName}</ProfileText>
        </ProfileCircle>
        <ColorChangeButton onClick={() => setIsColorPickerVisible(true)}>
          색상 변경
        </ColorChangeButton>
        <Form>
          <Label>이름</Label>
          <Input
            type="text"
            name="realName"
            value={profile.realName}
            onChange={handleInputChange}
            disabled
          />

          <Label>프로필 이름</Label>
          <Input
            type="text"
            name="profileName"
            value={profile.profileName}
            onChange={handleInputChange}
          />

          <Label>학교</Label>
          <Input
            type="text"
            name="schoolName"
            value={profile.schoolName}
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
              onChange={(e) => setCustomScore(parseFloat(e.target.value))}
              placeholder="내신을 입력해주세요. ex) 1.4와 같이 대략적인 숫자로 적어주세요."
              min="1.0"
              max="9.0"
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
