// src/components/register/RegisterPage.tsx
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
    { label: '계정 생성', isActive: step >= 1 },
    { label: '프로필 설정', isActive: step >= 2 },
    { label: '추가 정보', isActive: step >= 3 },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
