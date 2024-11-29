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
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, #292bb3, #202594);
    border-radius: 16px 16px 0 0;
  }
`;

const ModalHeader = styled.div`
  padding: 28px 24px 24px;
  text-align: center;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
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
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #1a1a1a;
  }
`;

const ModalContent = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e5e7eb 15%, #e5e7eb 85%, transparent 100%);
  }
`;

const Section = styled.div`
  padding: 24px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    background: #f5f5f5;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  font-size: 15px;
  line-height: 1.5;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #1a1a1a;
  text-align: right;
  font-weight: 500;
`;

const MainInfoSection = styled(Section)`
  background-color: #fafafa;
`;

const StatusBadge = styled.span<{ status: PurchaseItemType['status'] }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'PURCHASED':
        return '#ecfdf5';
      case 'CANCEL_REQUESTED':
        return '#fff1f2';
      case 'REFUNDED':
        return '#f3f4f6';
      case 'REJECTED':
        return '#fef2f2';
      case 'WAITING_CONFIRMATION':
        return '#fffbeb';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PURCHASED':
        return '#059669';
      case 'CANCEL_REQUESTED':
        return '#be123c';
      case 'REFUNDED':
        return '#4b5563';
      case 'REJECTED':
        return '#dc2626';
      case 'WAITING_CONFIRMATION':
        return '#d97706';
      default:
        return '#4b5563';
    }
  }};
`;

const ContactSection = styled(Section)`
  background-color: white;
`;

const PaymentSection = styled(Section)`
  background: linear-gradient(to bottom, #fafafa, white);
`;

const TotalSection = styled(Section)`
  padding-top: 24px;
  padding-bottom: 28px;
  background: white;
`;

const TotalRow = styled(DetailRow)`
  padding: 0;
  font-size: 16px;
`;

const TotalLabel = styled(DetailLabel)`
  font-size: 16px;
  font-weight: 600;
`;

const TotalValue = styled(DetailValue)`
  font-size: 24px;
  font-weight: 700;
  background: #202594;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
        <ModalContent>
          <Section>
            <DetailRow>
              <DetailValue>로딩중...</DetailValue>
            </DetailRow>
          </Section>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
  if (error) return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>
          <Section>
            <DetailRow>
              <DetailValue style={{ color: '#ef4444' }}>{error}</DetailValue>
            </DetailRow>
          </Section>
        </ModalContent>
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
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <MainInfoSection>
            <DetailRow>
              <DetailLabel>구매 일시</DetailLabel>
              <DetailValue>{displayDateTime}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>상태</DetailLabel>
              <StatusBadge status={purchaseDetail.status}>
                {statusInKorean[purchaseDetail.status]}
              </StatusBadge>
            </DetailRow>
          </MainInfoSection>

          <ContactSection>
            <DetailRow>
              <DetailLabel>연락처</DetailLabel>
              <DetailValue>{purchaseDetail.contactInfo}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>이메일</DetailLabel>
              <DetailValue>{purchaseDetail.email}</DetailValue>
            </DetailRow>
          </ContactSection>

          <PaymentSection>
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
          </PaymentSection>

          <TotalSection>
            <TotalRow>
              <TotalLabel>결제 금액</TotalLabel>
              <TotalValue>{purchaseDetail.totalPrice.toLocaleString()}원</TotalValue>
            </TotalRow>
          </TotalSection>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default PurchaseModal;