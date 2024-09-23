import React, { useState } from 'react';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #202594;
  text-align: center;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #202594;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 30px;
  outline: none;
  flex: 1;

  &:focus {
    border-color: #202594;
  }
`;

const SubmitButton = styled.button`
  background-color: #202594;
  color: white;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0f3a8f;
  }
`;

const CheckDuplicateButton = styled.button`
  background-color: #202594;
  color: white;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0f3a8f;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const UsernameRow = styled(Row)`
  gap: 20px;
  margin-bottom: 30px;
`;

const AgreementText = styled.p`
  font-size: 14px;
  margin-top: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${props => props.active ? '#202594' : 'white'};
  color: ${props => props.active ? 'white' : '#202594'};
  border: 1px solid #202594;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  &:hover {
    background-color: #0f3a8f;
    color: white;
  }

  &:not(:last-child) {
    margin-right: 2px;
  }
`;

const Select = styled.select`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 30px;
  outline: none;

  &:focus {
    border-color: #202594;
  }
`;

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    school: '',
    grade: '1',
    gpa: '',
    customGpa: '', 
    career: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGradeToggle = (grade: string) => {
    setFormData({
      ...formData,
      grade,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 처리 로직
  };

  return (
    <RegisterContainer>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
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
            style={{ marginBottom: 0 }}
          />
          <CheckDuplicateButton type="button">중복확인</CheckDuplicateButton>
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

        <Label>학년</Label>
        <ToggleContainer>
          <ToggleButton 
            type="button"
            active={formData.grade === '1'} 
            onClick={() => handleGradeToggle('1')}
          >
            1학년
          </ToggleButton>
          <ToggleButton 
            type="button"
            active={formData.grade === '2'} 
            onClick={() => handleGradeToggle('2')}
          >
            2학년
          </ToggleButton>
          <ToggleButton 
            type="button"
            active={formData.grade === '3'} 
            onClick={() => handleGradeToggle('3')}
          >
            3학년
          </ToggleButton>
        </ToggleContainer>

        <Label htmlFor="gpa">내신</Label>
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

        <AgreementText>
          ※ 위의 개인정보 제공 및 활용 동의서에 대해 본인이 개인정보를 제공하는 것에 동의합니다.
        </AgreementText>

        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    </RegisterContainer>
  );
};

export default RegisterPage;
