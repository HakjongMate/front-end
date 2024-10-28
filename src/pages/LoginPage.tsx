import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons/HakjongMate_Blue.png';
import toast, { Toaster } from 'react-hot-toast';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 20px;
  min-height: 70vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 15px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
    max-width: 300px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    width: 80px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #202594;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Slogan = styled.p`
  font-size: 18px;
  color: #555;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
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

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
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

@media (max-width: 768px) {
  padding: 12px;
  font-size: 14px;
}

@media (max-width: 480px) {
  padding: 10px;
  font-size: 12px;
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

  @media (max-width: 768px) {
    padding: 12px 0;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
    font-size: 14px;
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // 로그인 성공
        localStorage.setItem('accessToken', result.data.accessToken);
        toast.success('로그인에 성공했습니다!', {
          style: {
            maxWidth: "1000px",
            width: "300px",
            fontSize: "20px",
          },
        });
        navigate('/');
      } else {
        // 로그인 실패
        setError(result.message || '로그인에 실패했습니다.');
        toast.error('로그인에 실패했습니다. 다시 시도해주세요.', {
          style: {
            maxWidth: "1000px",
            width: "300px",
            fontSize: "20px",
          },
        });
      }
    } catch (error) {
      setError('서버와의 통신 중 오류가 발생했습니다.');
      toast.error('서버와의 통신 중 오류가 발생했습니다.', {
        style: {
          maxWidth: "1000px",
          width: "300px",
          fontSize: "20px",
        },
      });
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
        {error && <ErrorMessage>아이디 및 비밀번호를 확인해주세요.</ErrorMessage>}

        <SignUpText onClick={handleSignUp}>
          학종메이트와 함께 대학가기 <span>회원가입</span>
        </SignUpText>

        <ButtonGroup>
          <SubmitButton type="submit">로그인</SubmitButton>
        </ButtonGroup>
      </Form>
      <Toaster />
    </LoginContainer>
  );
};

export default LoginPage;
