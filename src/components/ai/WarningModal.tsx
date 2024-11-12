import React from "react";
import styled from "styled-components";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  text-align: left;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
`;

const WarningIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FEF2F2;
  color: #DC2626;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ModalText = styled.div`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.6;
  margin-bottom: 25px;
  white-space: pre-wrap;

  strong {
    color: #DC2626;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CloseButton = styled.button`
  background-color: #202594;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(32, 37, 148, 0.2);

  &:hover {
    background-color: #181d75;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <WarningIcon>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </WarningIcon>
          <ModalTitle>서비스 이용 안내</ModalTitle>
        </ModalHeader>
        <ModalText>
          <strong>본 서비스는 불법 대필 서비스가 아닙니다.</strong>{'\n\n'}
          AI가 제공하는 서비스는 다음과 같습니다:{'\n'}
          • 탐구 주제 추천{'\n'}
          • 보고서 초안 생성{'\n'}
          • 연구 방향 제시{'\n\n'}
          모든 발표와 보고서 작성 등의 실제 활동은 반드시 본인이 직접 수행해야 합니다.
        </ModalText>
        <ButtonWrapper>
          <CloseButton onClick={onClose}>
            확인했습니다
          </CloseButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default WarningModal;