import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PurchaseItem from "./PurchaseItem";

interface CartItem {
  id: number;
  service: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    price: number;
    discout: number;
  };
  description?: string[];
}

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 8px 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
`;

function PurchaseItemSection() {
  const location = useLocation();
  const { selectedCartItems }: { selectedCartItems: CartItem[] } =
    location.state || { selectedCartItems: [] };

  if (selectedCartItems.length === 0) {
    return <p>선택된 상품이 없습니다.</p>;
  }

  return (
    <SectionWrapper>
      <SectionTitle>주문상품 {selectedCartItems.length}개</SectionTitle>
      {selectedCartItems.map((selectedItem: CartItem) => (
        <PurchaseItem key={selectedItem.id} item={selectedItem} />
      ))}
    </SectionWrapper>
  );
}

export default PurchaseItemSection;
