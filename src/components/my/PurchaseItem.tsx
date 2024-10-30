import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 10px;
  background-color: #F5F6FB;
  margin-bottom: 20px;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
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
  justify-content: space-between;
  margin-right: 20px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;
`;

const ItemSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin-bottom: 5px;
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
  gap: 10px;
  margin: 15px 10px 20px 0;
`;

interface PurchaseItemProps {
  item: {
    service?: { title: string; subtitle: string; image: string };
    pass?: { title: string; description: string };
    purchasedDate: string;
    status: 'PURCHASED' | 'REFUNDED' | 'CANCELED' | 'WAITING';
  };
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item }) => {
  const { service, pass, purchasedDate, status } = item;
  
  const statusInKorean: { [key in PurchaseItemProps['item']['status']]: string } = {
    PURCHASED: "구매 완료",
    REFUNDED: "환불 완료",
    CANCELED: "취소 완료",
    WAITING: "전송 대기 중"
  };

  const renderActionButton = () => {
    if (service) {
      return <ActionButton>상세 내용 보기</ActionButton>;
    } else if (pass) {
      return <ActionButton>패스 보기</ActionButton>;
    }
    return null;
  };

  return (
    <ItemWrapper>
      {service && <ItemImage src={service.image} alt={service.title} />}
      <InfoSection>
        <ItemTitle>{service ? service.title : pass?.title}</ItemTitle>
        <ItemSubtitle>{service ? service.subtitle : pass?.description}</ItemSubtitle>
        <ButtonGroup>
          {renderActionButton()}
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
