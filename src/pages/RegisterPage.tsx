import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ColorPickerModal from '../components/common/ColorPickerModal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Step {
  label: string;
  isActive: boolean;
}

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StepItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 12px;
    left: calc(50% + 20px);
    right: calc(-50% + 20px);
    height: 2px;
    background-color: ${(props) => (props.isActive ? '#202594' : '#e0e0e0')};
    z-index: 1;
  }
`;

const StepCircle = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? '#202594' : '#e0e0e0')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  z-index: 2;
`;

const StepNumber = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const StepLabel = styled.span<{ isActive: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isActive ? '#202594' : '#888')};
  text-align: center;
`;

const RegisterContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 30px;
  background: white;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const Button = styled.button`
  background-color: #202594;
  color: white;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #181d75;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  margin-bottom: 20px;
  outline: none;
  width: 100%;
  appearance: none;

  &:focus {
    border-color: #202594;
    box-shadow: 0 0 0 3px rgba(32, 37, 148, 0.1);
  }
`;

const SelectIcon = styled(ArrowDropDownIcon)`
  position: absolute;
  top: 30%;
  right: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #202594;
`;

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

const ColorChangeButton = styled(Button)`
  background-color: transparent;
  color: #202594;
  border: 2px solid #202594;
  padding: 8px 15px;
  font-size: 14px;

  &:hover {
    background-color: #202594;
    color: white;
  }
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CheckDuplicateButton = styled(Button)`
  padding: 12px 15px;
  margin-bottom: 7px;
  font-size: 14px;
  flex-shrink: 0;
`;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profileName: '',
    profileColor: '#202594',
    name: '',
    school: '',
    grade: '1',
    gpa: '',
    customGpa: '',
    career: '',
  });
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const steps: Step[] = [
    { label: "계정 생성", isActive: step >= 1 },
    { label: "프로필 설정", isActive: step >= 2 },
    { label: "추가 정보", isActive: step >= 3 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (color: string) => {
    setFormData({
      ...formData,
      profileColor: color,
    });
    setIsColorPickerVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Form submitted:', formData);
      navigate('/login');
    }
  };

  const checkDuplicate = async () => {
    if (!formData.username) {
      alert('아이디를 입력해주세요.');
      return;
    }

    try {
      // 여기에 실제 중복 확인 로직을 구현해야 함
      alert('사용 가능한 아이디입니다.');
    } catch (error) {
      console.error('중복확인 중 오류 발생:', error);
      alert('중복확인 중 오류가 발생했습니다.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Label htmlFor="username">아이디</Label>
            <UsernameRow>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요"
                required
                style={{ flex: 1, marginBottom: 0 }}
              />
              <CheckDuplicateButton type="button" onClick={checkDuplicate}>
                중복확인
              </CheckDuplicateButton>
            </UsernameRow>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력해주세요"
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <ProfileSection>
              <ProfileCircle bgColor={formData.profileColor}>
                <ProfileText>
                  {formData.profileName ? formData.profileName.charAt(0).toUpperCase() : '?'}
                </ProfileText>
              </ProfileCircle>
              <ColorChangeButton type="button" onClick={() => setIsColorPickerVisible(true)}>
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
      case 3:
        return (
          <>
            <Label htmlFor="school">학교명</Label>
            <Input
              id="school"
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="현재 재학중인 학교명을 입력해주세요"
              required
            />
            <Label htmlFor="grade">학년</Label>
            <SelectWrapper>
              <Select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
              </Select>
              <SelectIcon />
            </SelectWrapper>
            <Label htmlFor="gpa">내신</Label>
            <SelectWrapper>
              <Select
                id="gpa"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                required
              >
                <option value="">내신을 선택해주세요</option>
                {[...Array(9)].map((_, i) => (
                  <option key={i} value={(i * 0.5 + 1).toFixed(1)}>
                    {(i * 0.5 + 1).toFixed(1)}
                  </option>
                ))}
                <option value="custom">직접 입력</option>
              </Select>
              <SelectIcon />
            </SelectWrapper>
            {formData.gpa === 'custom' && (
              <Input
                type="number"
                name="customGpa"
                value={formData.customGpa}
                onChange={handleChange}
                placeholder="내신을 입력해주세요 (1.0 ~ 5.0)"
                min="1.0"
                max="5.0"
                step="0.1"
                required
              />
            )}
            <Label htmlFor="career">희망진로</Label>
            <Input
              id="career"
              type="text"
              name="career"
              value={formData.career}
              onChange={handleChange}
              placeholder="희망 진로를 적어주세요 ex) 교사, 경영자 등"
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <RegisterContainer>
      <Title>회원가입</Title>
      <StepContainer>
        {steps.map((stepItem, index) => (
          <StepItem key={index} isActive={stepItem.isActive}>
            <StepCircle isActive={stepItem.isActive}>
              <StepNumber>{index + 1}</StepNumber>
            </StepCircle>
            <StepLabel isActive={stepItem.isActive}>{stepItem.label}</StepLabel>
          </StepItem>
        ))}
      </StepContainer>
      <Form onSubmit={handleSubmit}>
        {renderStepContent()}
        <Button type="submit">
          {step < 3 ? '다음' : '회원가입 완료'}
        </Button>
      </Form>
      <ColorPickerModal
        visible={isColorPickerVisible}
        onClose={() => setIsColorPickerVisible(false)}
        onSelectColor={handleColorChange}
      />
    </RegisterContainer>
  );
};

export default RegisterPage;
