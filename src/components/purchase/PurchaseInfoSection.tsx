import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  discout: number;
}

interface CartItem {
  id: number;
  service: Service;
  description?: string[];
}

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 30px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

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

function PurchaseItemSection() {
  const location = useLocation();
  const { selectedCartItems }: { selectedCartItems: CartItem[] } =
    location.state || { selectedCartItems: [] };

  if (selectedCartItems.length === 0) {
    return <p>선택된 상품이 없습니다.</p>;
  }

  // 가격 콤마 찍기
  const formatPrice = (price: string | number) => {
    const numericPrice =
      typeof price === "string" ? parseInt(price.replace(/,/g, ""), 10) : price;
    return isNaN(numericPrice) ? "0" : numericPrice.toLocaleString();
  };

  // 할인된 가격 계산
  const calculateDiscountedPrice = (
    price: string | number,
    discount: number
  ) => {
    const numericPrice =
      typeof price === "string" ? parseInt(price.replace(/,/g, ""), 10) : price;
    return isNaN(numericPrice) ? 0 : Math.round(numericPrice * (1 - discount));
  };

  return (
    <SectionWrapper>
      <SectionTitle>주문상품 {selectedCartItems.length}개</SectionTitle>
      {selectedCartItems.map((selectedItem: CartItem) => (
        <ItemContent key={selectedItem.id}>
          <ItemImage
            src={selectedItem.service.image}
            alt={selectedItem.service.title}
          />
          <ItemDetails>
            <ItemTitle>{selectedItem.service.title}</ItemTitle>
            <ItemSubtitle>{selectedItem.service.subtitle}</ItemSubtitle>
            {selectedItem.description && (
              <Description>{selectedItem.description.join(" | ")}</Description>
            )}
          </ItemDetails>
          <PriceDetails>
            <OriginalPrice>
              {formatPrice(selectedItem.service.price)}원
            </OriginalPrice>
            <DiscountPrice>
              {formatPrice(
                calculateDiscountedPrice(
                  selectedItem.service.price,
                  selectedItem.service.discout
                )
              )}
              원
            </DiscountPrice>
          </PriceDetails>
        </ItemContent>
      ))}
    </SectionWrapper>
  );
}

export default PurchaseItemSection;
