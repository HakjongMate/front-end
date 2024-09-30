import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: string; 
  discout: number;
}

interface CartItem {
  id: number;
  service: Service;
  description?: string[];
}

const SummaryWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 20px;
`;

const SummaryTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
`;

const Price = styled.div<{ isDiscount?: boolean }>`
  color: ${({ isDiscount }) => (isDiscount ? "#007BFF" : "#000")};
`;

const FinalPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const PurchaseButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #202594;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PointInfo = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  color: #7d7d7d;
`;

function PurchaseSummarySection() {
  const location = useLocation();
  const { selectedCartItems }: { selectedCartItems: CartItem[] } =
    location.state || { selectedCartItems: [] };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [pointUsed, setPointUsed] = useState(1000);
  const [finalPrice, setFinalPrice] = useState(0);
  const [pointsToBeEarned, setPointsToBeEarned] = useState(0);

  // 문자열로 된 가격을 숫자로 변환하는 함수
  const parsePrice = (price: string) => {
    return parseInt(price.replace(/,/g, ""), 10) || 0;
  };

  // 가격과 할인 및 최종 가격 계산
  useEffect(() => {
    const calculateTotalPriceAndDiscount = () => {
      let priceSum = 0;
      let discountSum = 0;

      // 선택된 상품들의 가격과 할인을 계산
      selectedCartItems.forEach((item) => {
        const price = parsePrice(item.service.price); 
        const discount = item.service.discout;

        const discountedPrice = Math.round(price * (1 - discount));

        priceSum += price;
        discountSum += price - discountedPrice;
      });

      setTotalPrice(priceSum);
      setTotalDiscount(discountSum);
      const calculatedFinalPrice = priceSum - discountSum - pointUsed;
      setFinalPrice(calculatedFinalPrice >= 0 ? calculatedFinalPrice : 0);
      // 예시로 0.01% 적립, 추후 수정 필요
      setPointsToBeEarned(Math.floor((priceSum - discountSum) * 0.01));
    };

    calculateTotalPriceAndDiscount();
  }, [selectedCartItems, pointUsed]);

  if (selectedCartItems.length === 0) {
    return <p>선택된 상품이 없습니다.</p>;
  }

  return (
    <SummaryWrapper>
      <SummaryTitle>주문 요약</SummaryTitle>
      <SummaryItem>
        <div>상품 금액</div>
        <Price>{totalPrice.toLocaleString()} 원</Price>
      </SummaryItem>
      <SummaryItem>
        <div>상품 할인</div>
        <Price isDiscount>-{totalDiscount.toLocaleString()} 원</Price>
      </SummaryItem>
      <SummaryItem>
        <div>포인트 사용</div>
        <Price isDiscount>-{pointUsed.toLocaleString()} 원</Price>
      </SummaryItem>

      <Divider />
      <SummaryItem>
        <div>최종 결제 금액</div>
        <FinalPrice>{finalPrice.toLocaleString()} 원</FinalPrice>
      </SummaryItem>
      <ButtonWrapper>
        <PurchaseButton>결제하기</PurchaseButton>
      </ButtonWrapper>
      <PointInfo>{pointsToBeEarned.toLocaleString()} 포인트 적립 예정</PointInfo>
    </SummaryWrapper>
  );
}

export default PurchaseSummarySection;
