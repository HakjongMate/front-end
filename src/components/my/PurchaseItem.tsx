import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 10px;
  background-color: #F5F6FB;
  margin-bottom: 20px;
  align-items: flex-start;
`;

const ItemImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  margin: 10px 20px;
  border-radius: 10px;
`;

const InfoSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 0px;
`;

const ItemSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin-bottom: 0px;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff; 
  cursor: pointer;
`;

const StatusSection = styled.div`
  text-align: right;
  font-size: 14px;
  color: #888;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  margin: 15px 10px 20px 0;
`;

// 타입 정의
interface Service {
  title: string;
  subtitle: string;
  image: string;
}

interface PurchaseItemProps {
  item: {
    service: Service;
    purchasedDate: string;
    status: 'PURCHASED' | 'REFUNDED' | 'CANCELED' | 'WAITING';
    description?: string[];
  };
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item }) => {
  const { service, purchasedDate, status, description } = item;
  const formattedDescription = description ? description.join(' | ') : '';

  const statusInKorean: { [key in PurchaseItemProps['item']['status']]: string } = {
    PURCHASED: "구매 완료",
    REFUNDED: "환불 완료",
    CANCELED: "취소 완료",
    WAITING: "구매 대기 중"
  };

  // 서비스에 따라 버튼을 다르게 렌더링
  const renderActionButton = () => {
    if (service.title.includes('AI 주제 추천 서비스')) {
      return <ActionButton>상세 내용 보기</ActionButton>;
    }
    if (service.title.includes('학종 가이드북')) {
      return (
        <ActionButton onClick={() => window.location.href = '/service/book'}>
          서비스 보기
        </ActionButton>
      );
    }
    if (service.title.includes('생활기록부 분석 서비스')) {
      return (
        <ActionButton onClick={() => window.location.href = '/service/analyze'}>
          서비스 보기
        </ActionButton>
      );
    }
    return null;
  };

  // 구매 취소 버튼 렌더링은 status가 'WAITING'일 때만
  const renderCancelButton = () => {
    if (status === 'WAITING') {
      return <ActionButton>구매 취소</ActionButton>;
    }
    return null;
  };

  return (
    <ItemWrapper>
      <ItemImage src={service.image} alt={service.title} />
      <InfoSection>
        <ItemTitle>{service.title}</ItemTitle>
        <ItemSubtitle>{service.subtitle}</ItemSubtitle>
        <Description>{formattedDescription}</Description>
        <ButtonGroup>
          {renderActionButton()}
          {renderCancelButton()}
        </ButtonGroup>
      </InfoSection>
      <StatusSection>
        <span>{new Date(purchasedDate).toLocaleDateString()}</span>
        <span>{statusInKorean[status]}</span>
      </StatusSection>
    </ItemWrapper>
  );
};

export default PurchaseItem;
