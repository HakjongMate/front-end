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
    realName: '',
    dream: '',
    schoolName: '',
    grade: '1',
    gpa: '',
    customGpa: '',
  });

  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<string | null>(null);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

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
      setUsernameStatus(null);
    }
  };

  const handleColorChange = (color: string) => {
    setFormData({
      ...formData,
      profileColor: color,
    });
    setIsColorPickerVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 아이디 중복 확인, 비밀번호 유효성 검사, 비밀번호 일치 여부 확인 후 진행
    if (step === 1) {
      if (!isUsernameChecked || usernameStatus !== '사용 가능한 아이디입니다.') {
        alert('아이디 중복 확인을 해주세요.');
        return;
      }

      if (!isPasswordValid) {
        alert('유효한 비밀번호를 입력해주세요.');
        return;
      }

      if (!isPasswordMatch) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('회원가입 데이터:', formData);

      const score = formData.gpa === 'custom' ? formData.customGpa : formData.gpa;

      const requestData = {
        username: formData.username,
        password: formData.password,
        realName: formData.realName,
        profileName: formData.profileName,
        profileColor: formData.profileColor,
        dream: formData.dream,
        schoolName: formData.schoolName,
        grade: parseInt(formData.grade, 10),
        score: parseFloat(score),
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('회원가입 성공:', result);
          navigate('/login');
        } else {
          console.error('회원가입 실패:', result);
          alert('회원가입 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    }
  };

  const checkDuplicate = async () => {
    if (!formData.username) {
      alert('아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/check-username?username=${formData.username}`, {
        method: 'GET',
      });
      const result = await response.json();

      if (result.data) {
        setUsernameStatus('이미 사용 중인 아이디입니다.');
      } else {
        setUsernameStatus('사용 가능한 아이디입니다.');
        setIsUsernameChecked(true);
      }
    } catch (error) {
      setUsernameStatus('중복 확인 중 오류가 발생했습니다.');
      console.error('중복 확인 중 오류 발생:', error);
    }
  };

  const handlePasswordValidity = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };

  const handlePasswordMatch = (isMatch: boolean) => {
    setIsPasswordMatch(isMatch);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <AccountCreationStep
            formData={formData}
            handleChange={handleChange}
            checkDuplicate={checkDuplicate}
            usernameStatus={usernameStatus}
            onPasswordValidityChange={handlePasswordValidity}
            onPasswordMatchChange={handlePasswordMatch}
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
