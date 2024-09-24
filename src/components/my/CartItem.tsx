import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const CheckBox = styled.input`
  margin-right: 20px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ItemSubtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OriginalPrice = styled.p`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
  margin-right: 10px;
`;

const DiscountPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #202594;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  margin-left: 10px;
`;

const DeliveryInfo = styled.p`
  font-size: 14px;
  color: #888;
  margin-left: auto;
`;

const CartItem: React.FC<{ item: any }> = ({ item }) => {
  const originalPrice = parseInt(item.price.replace(',', ''));
  const discountPrice = originalPrice * (1 - item.discout);

  return (
    <ItemWrapper>
      <CheckBox type="checkbox" checked readOnly />
      <ItemImage src={item.image} alt={item.title} />
      <ItemDetails>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemSubtitle>{item.subtitle}</ItemSubtitle>
        <PriceContainer>
          <OriginalPrice>{originalPrice.toLocaleString()}원</OriginalPrice>
          <DiscountPrice>{discountPrice.toLocaleString()}원</DiscountPrice>
          <EditButton>✏️</EditButton>
        </PriceContainer>
      </ItemDetails>
      <DeliveryInfo>10:00 AM<br />이메일 전송</DeliveryInfo>
    </ItemWrapper>
  );
};

export default CartItem;