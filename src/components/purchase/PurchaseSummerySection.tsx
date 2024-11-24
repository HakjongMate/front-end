import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import AIContext from "../../contexts/AIContext";
import { usePurchase } from "../../contexts/PurchaseContext";
import { CartItem } from "../../types";

const SummaryWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
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

  @media (max-width: 480px) {
    font-size: 16px;
  }
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

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const PointInfo = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  color: #7d7d7d;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const PurchaseSummarySection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    pointUsed,
  } = usePurchase();
  
  const { 
    setSelectedSubject, 
    setDream, 
    setTargetUniversities 
  } = useContext(AIContext);

  // 장바구니에서 선택된 항목을 받아옴
  const { selectedCartItems }: { selectedCartItems: CartItem[] } =
    location.state || { selectedCartItems: [] };
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [pointsToBeEarned, setPointsToBeEarned] = useState(0);

  useEffect(() => {
    const calculateTotalPriceAndDiscount = () => {
      let priceSum = 0;
      let discountSum = 0;
  
      // 각 항목의 금액과 할인율을 계산하여 합산
      selectedCartItems.forEach((item) => {
        const { price, discountRate } = item.pass
          ? { price: item.pass.price, discountRate: item.pass.discountRate }
          : { price: item.service.price, discountRate: item.service.discount };
          
        const discountedPrice = Math.round(price * (1 - discountRate));
  
        priceSum += price;
        discountSum += price - discountedPrice;
      });
  
      setTotalPrice(priceSum);
      setTotalDiscount(discountSum);
      const calculatedFinalPrice = priceSum - discountSum - pointUsed;
      setFinalPrice(calculatedFinalPrice >= 0 ? calculatedFinalPrice : 0);
      setPointsToBeEarned(Math.floor((priceSum - discountSum) * 0.01));
    };
  
    calculateTotalPriceAndDiscount();
  }, [selectedCartItems, pointUsed]);  

  const handlePurchase = () => {
    const currentCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const updatedCartItems = currentCartItems.filter(
      (cartItem: any) => !selectedCartItems.some(
        (selectedItem) => selectedItem.id === cartItem.id
      )
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setSelectedSubject("");
    setDream("");
    setTargetUniversities([
      { name: "", major: "" },
      { name: "", major: "" },
      { name: "", major: "" },
    ]);

    const containsAIService = selectedCartItems.some(item =>
      item.service.title.includes("패스")
    );

    if (containsAIService) {
      navigate('/ai/waiting');
    } else {
      navigate('/my/purchase');
    }
  };

  // 선택된 상품이 없을 경우 메시지 표시
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
        <PurchaseButton onClick={handlePurchase}>결제하기</PurchaseButton>
      </ButtonWrapper>
      <PointInfo>{pointsToBeEarned.toLocaleString()} 포인트 적립 예정</PointInfo>
    </SummaryWrapper>
  );
};

export default PurchaseSummarySection;
