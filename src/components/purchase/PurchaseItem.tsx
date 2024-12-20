import React from "react";
import styled from "styled-components";
import { CartItem } from "../../types";

interface PurchaseItemProps {
  item: CartItem;
}

const ItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-bottom: 0px;
`;

const ItemSubtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #000;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #555;
  margin-top: 5px;
`;

const PriceDetails = styled.div`
  align-self: center;
  text-align: center;
  min-width: 80px;
`;

const OriginalPrice = styled.p`
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
  margin: 0 0 2px 0;
`;

const DiscountPrice = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item }) => {
  // 숫자를 3자리마다 콤마를 찍어주는 함수
  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  // 할인된 가격 계산 함수
  const calculateDiscountedPrice = (price: number, discountRate: number) => {
    return Math.round(price * (1 - discountRate));
  };

  // 아이템의 가격과 할인을 결정
  const { price, discountRate } = item.pass
    ? { price: item.pass.price, discountRate: item.pass.discountRate }
    : { price: item.service.price, discountRate: item.service.discount };

  const finalPrice = calculateDiscountedPrice(price, discountRate);

  return (
    <ItemContent>
      <ItemImage src={item.service.image} alt={item.service.title} />
      <ItemDetails>
        <ItemTitle>{item.service.title}</ItemTitle>
        <ItemSubtitle>{item.service.subtitle}</ItemSubtitle>
        {item.description && <Description>{item.description.join(" | ")}</Description>}
      </ItemDetails>
      <PriceDetails>
        <OriginalPrice>{formatPrice(price)}원</OriginalPrice>
        <DiscountPrice>{formatPrice(finalPrice)}원</DiscountPrice>
      </PriceDetails>
    </ItemContent>
  );
};

export default PurchaseItem;
