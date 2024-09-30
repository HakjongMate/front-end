import React, { useState } from 'react';
import styled from 'styled-components';

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

const GuideText = styled.div`
  font-size: 14px;
  background-color: #F8F9FA;
  border-radius: 8px;
  padding: 20px;
  color: #000;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const RadioButtonWrapper = styled.div`
  margin-bottom: 15px;
`;

const RadioButtonLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const PaymentInfoWrapper = styled.div`
  margin-top: 10px;
`;

const BankTransferInfo = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 20px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
`;

const PurchasePaymentSection: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('무통장입금');

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <SectionWrapper>
      <SectionTitle>결제수단</SectionTitle>

      <GuideText>
        1. 학종메이트는 학생부 종합 전형 합격을 위한 경쟁력을 스스로 기를 수 있는 '방향성'을 제공합니다.<br />
        2. 입금 확인 후, 익일 오전 10시에 작성해주신 메일로 일괄 방송됩니다.<br />
        3. 무통장 입금 시 입금자 명과 주문자 명을 동일하게 작성해 주시기 바랍니다.
      </GuideText>

      <RadioButtonWrapper>
        <RadioButtonLabel>
          <RadioButton
            type="radio"
            value="무통장입금"
            checked={selectedPaymentMethod === '무통장입금'}
            onChange={handlePaymentMethodChange}
          />
          무통장입금
        </RadioButtonLabel>
        {selectedPaymentMethod === '무통장입금' && (
          <BankTransferInfo>
            신한투자증권 27078562827 이건우
          </BankTransferInfo>
        )}
      </RadioButtonWrapper>

      <RadioButtonWrapper>
        <RadioButtonLabel>
          <RadioButton
            type="radio"
            value="실시간 계좌이체"
            checked={selectedPaymentMethod === '실시간 계좌이체'}
            onChange={handlePaymentMethodChange}
          />
          실시간 계좌이체
        </RadioButtonLabel>
        {selectedPaymentMethod === '실시간 계좌이체' && (
          <PaymentInfoWrapper>
            <InputWrapper>
              <Input type="text" placeholder="입금 시간을 입력하세요" />
              <Input type="text" placeholder="입금자명을 입력하세요" />
            </InputWrapper>
          </PaymentInfoWrapper>
        )}
      </RadioButtonWrapper>
    </SectionWrapper>
  );
};

export default PurchasePaymentSection;