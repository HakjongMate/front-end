import React, { useState } from 'react';
import styled from 'styled-components';
import { usePurchase } from '../../contexts/PurchaseContext';

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const GuideText = styled.div`
  font-size: 14px;
  background-color: #F8F9FA;
  border-radius: 8px;
  padding: 20px;
  color: #000;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;

const RadioButtonWrapper = styled.div`
  margin-bottom: 15px;
`;

const RadioButtonLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
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

  @media (max-width: 768px) {
    margin: 10px 15px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    margin: 10px 10px;
    font-size: 12px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 10px 15px;
  }

  @media (max-width: 480px) {
    margin: 10px 10px;
    gap: 5px;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 12px;
  }
`;

const PurchasePaymentSection: React.FC = () => {
  const {
    paymentMethod,
    setPaymentMethod,
    depositor,
    setDepositor,
    depositBank,
    setDepositBank,
    depositBankAccount,
    setDepositBankAccount,
  } = usePurchase();

  // const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value === '계좌 이체' ? 'ACCOUNT_TRANSFER' : '';
  //   setPaymentMethod(value);
  //   setDepositor('');
  //   setDepositBank('');
  //   setDepositBankAccount('');
  // };

  const [errors, setErrors] = useState({
    depositor: '',
    depositBank: '',
    depositBankAccount: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'depositor' | 'depositBank' | 'depositBankAccount'
  ) => {
    const { value } = e.target;
    if (field === 'depositor') setDepositor(value);
    if (field === 'depositBank') setDepositBank(value);
    if (field === 'depositBankAccount') setDepositBankAccount(value);

    // 입력값 변경 시 에러 초기화
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateInputs = () => {
    const newErrors = {
      depositor: depositor ? '' : '입금자명을 입력하세요.',
      depositBank: depositBank ? '' : '입금한 은행을 입력하세요.',
      depositBankAccount: depositBankAccount ? '' : '입금한 계좌번호를 입력하세요.',
    };

    setErrors(newErrors);

    // 에러가 있으면 false 반환
    return Object.values(newErrors).every((error) => !error);
  };

  const getDisplayPaymentMethod = (method: string) => {
    return method === 'ACCOUNT_TRANSFER' ? '계좌 이체' : '';
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
            value="계좌 이체"
            checked={true}
          // disabled={true}
          />
          {getDisplayPaymentMethod('ACCOUNT_TRANSFER')}
        </RadioButtonLabel>
        {/* {paymentMethod === 'ACCOUNT_TRANSFER' && ( */}
        <BankTransferInfo>
          신한투자증권 27078562827 이건우
        </BankTransferInfo>
        {/* )} */}
        <PaymentInfoWrapper>

          <InputWrapper>
            <Input
              type="text"
              placeholder="입금자명을 입력하세요"
              value={depositor}
              onChange={(e) => handleInputChange(e, 'depositor')}
            />
            <Input
              type="text"
              placeholder="입금한 은행을 입력하세요"
              value={depositBank}
              onChange={(e) => handleInputChange(e, 'depositBank')}
            />
            <Input
              type="text"
              placeholder="입금한 계좌번호를 입력하세요"
              value={depositBankAccount}
              onChange={(e) => handleInputChange(e, 'depositBankAccount')}
            />
          </InputWrapper>
        </PaymentInfoWrapper>
      </RadioButtonWrapper>

      {/* <RadioButtonWrapper>
        <RadioButtonLabel>
          <RadioButton
            type="radio"
            value="실시간 계좌이체"
            checked={paymentMethod === 'REAL_TIME_ACCOUNT_TRANSFER'}
            onChange={handlePaymentMethodChange}
          />
          {getDisplayPaymentMethod('REAL_TIME_ACCOUNT_TRANSFER')}
        </RadioButtonLabel>
        {paymentMethod === 'REAL_TIME_ACCOUNT_TRANSFER' && (
          <PaymentInfoWrapper>
            <InputWrapper>
              <Input 
                type="text" 
                placeholder="입금 시간을 입력하세요" 
                value={depositTime}
                onChange={handleDepositTimeChange}
              />
              <Input 
                type="text" 
                placeholder="입금자명을 입력하세요" 
                value={depositor}
                onChange={handleDepositorChange}
              />
            </InputWrapper>
          </PaymentInfoWrapper>
        )}
      </RadioButtonWrapper> */}
    </SectionWrapper>
  );
};

export default PurchasePaymentSection;
