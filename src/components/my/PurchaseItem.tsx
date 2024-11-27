import React, { useState } from 'react';
import styled from 'styled-components';
import PurchaseModal from './PurchaseModal';
import { PurchaseItemType } from '../../types';

const ItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 10px;
  background-color: #F5F6FB;
  margin-bottom: 20px;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ItemImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  margin: 10px 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
`;

const InfoSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;

  @media (max-width: 480px) {
    align-items: center;
    margin-right: 0;
    text-align: center;
  }
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ItemSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

const StatusSection = styled.div`
  text-align: right;
  font-size: 14px;
  color: #888;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 10px 20px 0;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 10px;
  }
`;

interface PurchaseItemProps {
  item: PurchaseItemType;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const displayDate = item.purchaseDate
    ? new Date(item.purchaseDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '날짜 없음';

  const statusInKorean: Record<PurchaseItemType['status'], string> = {
    PURCHASED: '구매 완료',
    CANCEL_REQUESTED: '구매 취소 요청',
    REFUNDED: '환불 완료',
    REJECTED: '취소 반려',
    WAITING_CONFIRMATION: '입금 확인 대기 중',
  };

  const handleDetailClick = () => {
    setSelectedItemId(item.id);
    setModalOpen(true);
  };

  return (
    <>
      <ItemWrapper>
        {item.service && <ItemImage src={item.service.image} alt={item.service.title} />}
        <InfoSection>
          <ItemTitle>{item.service ? item.service.title : item.pass?.title}</ItemTitle>
          <ItemSubtitle>{item.service ? item.service.subtitle : item.pass?.description}</ItemSubtitle>
          <ButtonGroup>
            <ActionButton onClick={handleDetailClick}>상세 내용 보기</ActionButton>
          </ButtonGroup>
        </InfoSection>
        <StatusSection>
          <span>{displayDate}</span>
          <span>{statusInKorean[item.status]}</span>
        </StatusSection>
      </ItemWrapper>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        purchaseId={selectedItemId}
      />
    </>
  );
};

export default PurchaseItem;
