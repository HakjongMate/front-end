import React from 'react';
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

const AccountCreationStep: React.FC<AccountCreationStepProps> = ({
  formData,
  handleChange,
  checkDuplicate,
}) => {
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
};

export default AccountCreationStep;
