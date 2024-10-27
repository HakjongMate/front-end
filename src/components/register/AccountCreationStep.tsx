import React, { useState } from 'react';
import styled from 'styled-components';

interface AccountCreationStepProps {
  formData: {
    username: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  checkDuplicate: () => void;
  usernameStatus: string | null;
}

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

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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

const CheckDuplicateButton = styled(Button)`
  padding: 12px 15px;
  margin-bottom: 7px;
  font-size: 14px;
  flex-shrink: 0;
`;

const StatusMessage = styled.p<{ isError: boolean }>`
  color: ${(props) => (props.isError ? 'red' : 'green')};
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 20px;
`;

const AccountCreationStep: React.FC<AccountCreationStepProps> = ({
  formData,
  handleChange,
  checkDuplicate,
  usernameStatus
}) => {
  // 유효성 검사 상태 관리
  const [invalidUsernameMessage, setInvalidUsernameMessage] = useState<string | null>(null);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState<string | null>(null);
  const [passwordMismatchMessage, setPasswordMismatchMessage] = useState<string | null>(null);

  const validateUsername = (username: string) => {
    const isValid = /^[a-z]+$/.test(username); 
    if (!isValid) {
      setInvalidUsernameMessage('아이디는 영어 소문자만 입력 가능합니다.');
    } else {
      setInvalidUsernameMessage(null);
    }
  };

  const validatePassword = (password: string) => {
    const isValid = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    if (!isValid) {
      setInvalidPasswordMessage('비밀번호는 최소 8자 이상, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.');
    } else {
      setInvalidPasswordMessage(null);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e);
    validateUsername(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e);

    // 비밀번호 일치 여부 검사
    if (value !== formData.password) {
      setPasswordMismatchMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMismatchMessage(null);
    }
  };

  return (
    <>
      <Label htmlFor="username">아이디</Label>
      <UsernameRow>
        <Input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleUsernameChange}
          placeholder="아이디를 입력해주세요 (영어 소문자만 사용)"
          required
          style={{ flex: 1, marginBottom: 0 }}
        />
        <CheckDuplicateButton type="button" onClick={checkDuplicate} disabled={!!invalidUsernameMessage}>
          중복확인
        </CheckDuplicateButton>
      </UsernameRow>

      {invalidUsernameMessage && (
        <ErrorMessage>{invalidUsernameMessage}</ErrorMessage>
      )}

      {usernameStatus && (
        <StatusMessage isError={usernameStatus === '이미 사용 중인 아이디입니다.'}>
          {usernameStatus}
        </StatusMessage>
      )}

      <Label htmlFor="password">비밀번호</Label>
      <Input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력해주세요"
        required
      />

      {invalidPasswordMessage && (
        <ErrorMessage>{invalidPasswordMessage}</ErrorMessage>
      )}

      <Label htmlFor="confirmPassword">비밀번호 확인</Label>
      <Input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="비밀번호를 다시 입력해주세요"
        required
      />

      {passwordMismatchMessage && (
        <ErrorMessage>{passwordMismatchMessage}</ErrorMessage>
      )}
    </>
  );
};

export default AccountCreationStep;
