
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { PurchaseItemType } from '../../types';

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
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  
  &:hover {
    color: #1a1a1a;
  }
`;

const ModalContent = styled.div`
  padding: 0 24px;
`;

const Section = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  color: #1a1a1a;
  font-weight: 500;
  text-align: right;
`;

const PriceSection = styled(Section)`
  padding-bottom: 24px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseId: number | null;
}

const statusInKorean: Record<PurchaseItemType['status'], string> = {
  PURCHASED: '구매 완료',
  CANCEL_REQUESTED: '구매 취소 요청',
  REFUNDED: '환불 완료',
  REJECTED: '취소 반려',
  WAITING_CONFIRMATION: '입금 확인 대기 중',
};

export const PurchaseModal: React.FC<ModalProps> = ({ isOpen, onClose, purchaseId }) => {
  const [purchaseDetail, setPurchaseDetail] = useState<PurchaseItemType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchaseDetail = async () => {
      if (!purchaseId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/buy/item/detail/${purchaseId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('구매 정보를 불러오는데 실패했습니다.');
        }

        const result = await response.json();
        setPurchaseDetail(result.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : '오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && purchaseId) {
      fetchPurchaseDetail();
    }
  }, [isOpen, purchaseId]);

  if (!isOpen) return null;
  if (isLoading) return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>로딩중...</ModalContent>
      </ModalContainer>
    </Overlay>
  );
  if (error) return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>{error}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
  if (!purchaseDetail) return null;

  const displayDateTime = new Date(purchaseDetail.purchaseDate).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace('시', ':').replace('분', '');

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>구매 상세 정보</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <Section>
            <DetailRow>
              <DetailLabel>상품명</DetailLabel>
              <DetailValue>
                {purchaseDetail.service?.title || purchaseDetail.pass?.title || ''}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>구매 일시</DetailLabel>
              <DetailValue>{displayDateTime}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>상태</DetailLabel>
              <DetailValue>{statusInKorean[purchaseDetail.status]}</DetailValue>
            </DetailRow>
          </Section>

          <Section>
            <DetailRow>
              <DetailLabel>연락처</DetailLabel>
              <DetailValue>{purchaseDetail.contactInfo}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>이메일</DetailLabel>
              <DetailValue>{purchaseDetail.email}</DetailValue>
            </DetailRow>
          </Section>

          <Section>
            <DetailRow>
              <DetailLabel>결제 방식</DetailLabel>
              <DetailValue>계좌 이체</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>은행</DetailLabel>
              <DetailValue>{purchaseDetail.bankTransferInfo?.bank}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>예금주</DetailLabel>
              <DetailValue>{purchaseDetail.bankTransferInfo?.holderName}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>계좌번호</DetailLabel>
              <DetailValue>{purchaseDetail.bankTransferInfo?.account}</DetailValue>
            </DetailRow>
          </Section>

          <PriceSection>
            <DetailRow>
              <DetailLabel>결제 금액</DetailLabel>
              <DetailValue>{purchaseDetail.totalPrice.toLocaleString()}원</DetailValue>
            </DetailRow>
          </PriceSection>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default PurchaseModal;
