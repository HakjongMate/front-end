import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }
`;

const GuideText = styled.p`
  font-size: 12px;
  color: #e74c3c;
  grid-column: 1 / -1;
`;

function PurchaseInfoSection() {
  const [userProfile, setUserProfile] = useState<{ username: string } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // 유저 이름을 로컬스토리지에서 가져와서 userProfile 상태에 저장
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }
  }, []);

  // 전화번호 입력 시 자동으로 하이픈(-)을 추가하는 함수
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result = "";
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }
    setPhoneNumber(result);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <SectionWrapper>
      <SectionTitle>주문자 정보</SectionTitle>
      <InputGrid>
        <InputWrapper>
          <Input type="text" value={userProfile?.username || ""} placeholder="김도현" readOnly />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="tel"
            placeholder="연락처"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength={13}
          />
        </InputWrapper>
        <InputWrapper style={{ gridColumn: "1 / -1" }}>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
          />
        </InputWrapper>
        <GuideText>
          * 이메일 주소로 전자책이 전송될 예정이니 반드시 정확히 기입해주시길 바랍니다.
        </GuideText>
      </InputGrid>
    </SectionWrapper>
  );
}

export default PurchaseInfoSection;