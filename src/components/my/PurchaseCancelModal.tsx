import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #EAEAEA;
  position: relative;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #202594;
  margin: 0;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #CECECE;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.2s;
  
  &:hover {
    color: #6E95DF;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  min-height: 120px;
  padding: 16px;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #202594;
  }
  
  &::placeholder {
    color: #CECECE;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: #202594;
    color: white;
    border: none;
    
    &:hover {
      background: #0F4ABE;
    }
  ` : `
    background: white;
    color: #202594;
    border: 1px solid #202594;
    
    &:hover {
      background: #F5F6FB;
    }
  `}
  
  &:disabled {
    background: #CECECE;
    border-color: #CECECE;
    cursor: not-allowed;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const PurchaseCancelModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = React.useState('');

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>구매 취소 요청</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <StyledTextArea
            placeholder="취소 사유를 입력해주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <ButtonGroup>
            <Button onClick={onClose}>취소</Button>
            <Button 
              variant="primary" 
              onClick={() => {
                onConfirm(reason);
                setReason('');
              }}
              disabled={!reason.trim()}
            >
              확인
            </Button>
          </ButtonGroup>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default PurchaseCancelModal;