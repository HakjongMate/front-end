import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ColorPickerModal from '../components/common/ColorPickerModal';
import StepIndicator from '../components/register/StepIndicator';
import AccountCreationStep from '../components/register/AccountCreationStep';
import ProfileSettingStep from '../components/register/ProfileSettingStep';
import AdditionalInfoStep from '../components/register/AdditionalInfoStep';

interface Step {
  label: string;
  isActive: boolean;
}

const RegisterContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 30px;
  background: white;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    max-width: 600px;
    padding: 40px 25px;
  }

  @media (max-width: 768px) {
    max-width: 500px;
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    padding: 30px 15px;
  }

  @media (max-width: 320px) {
    max-width: 280px;
    padding: 20px 10px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 0;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 0;
  }
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
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const steps: Step[] = [
    { label: '계정 생성', isActive: step >= 1 },
    { label: '프로필 설정', isActive: step >= 2 },
    { label: '추가 정보', isActive: step >= 3 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // 아이디 변경 시 중복 확인 상태를 리셋
    if (e.target.name === 'username') {
      setIsUsernameChecked(false);
    }
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

    if (step === 1 && !isUsernameChecked) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }

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
      alert('사용 가능한 아이디입니다.');
      setIsUsernameChecked(true);
    } catch (error) {
      alert('중복 확인 중 오류가 발생했습니다.');
      console.error('중복 확인 중 오류 발생:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <AccountCreationStep
            formData={formData}
            handleChange={handleChange}
            checkDuplicate={checkDuplicate}
          />
        );
      case 2:
        return (
          <ProfileSettingStep
            formData={formData}
            handleChange={handleChange}
            setIsColorPickerVisible={setIsColorPickerVisible}
          />
        );
      case 3:
        return (
          <AdditionalInfoStep
            formData={formData}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <RegisterContainer>
      <Title>회원가입</Title>
      <StepIndicator steps={steps} />
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
