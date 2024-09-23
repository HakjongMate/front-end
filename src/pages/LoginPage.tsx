import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons/HakjongMate_Blue.png';
import users from '../assets/data/users.json'; // users.json 파일을 임포트합니다.

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #202594;
  margin-bottom: 10px;
`;

const Slogan = styled.p`
  font-size: 18px;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #202594;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  outline: none;

  &:focus {
    border-color: #202594;
  }
`;

const ButtonGroup = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SubmitButton = styled.button`
  background-color: #202594;
  color: white;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0f3a8f;
  }
`;

const SignUpText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #000;
  text-align: center;
  cursor: pointer;

  & > span {
    color: #202594;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // users.json의 id가 '1'인 유저의 데이터를 저장
    const userData = users.find((user) => user.id === '1');

    if (userData) {
      // 유저 데이터를 로컬 스토리지에 저장 임시용
      localStorage.setItem('user', JSON.stringify(userData));
      // 홈 페이지로 이동
      navigate('/');
    } else {
      setError('유저 정보를 찾을 수 없습니다.');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <LoginContainer>
      <Header>
        <Logo src={logo} alt="HakjongMate Logo" />
        <Title>학종메이트</Title>
        <Slogan>스스로 준비하는 생활기록부의 시작</Slogan>
      </Header>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Label htmlFor="username">아이디</Label>
        <Input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요"
          required
        />

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

        <SignUpText onClick={handleSignUp}>
          학종메이트와 함께 대학가기 <span>회원가입</span>
        </SignUpText>

        <ButtonGroup>
          <SubmitButton type="submit">로그인</SubmitButton>
        </ButtonGroup>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
