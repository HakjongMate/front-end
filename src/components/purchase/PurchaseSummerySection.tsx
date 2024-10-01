import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import AIContext from "../../contexts/AIContext";

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

interface PurchaseSummarySectionProps {
  pointUsed: number;
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

const PurchaseSummarySection: React.FC<PurchaseSummarySectionProps> = ({ pointUsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSubject, setSelectedSubject, dream, setDream, targetUniversities, setTargetUniversities } =
    useContext(AIContext);

  // 선택된 카트 항목을 받아옴
  const { selectedCartItems }: { selectedCartItems: CartItem[] } =
    location.state || { selectedCartItems: [] };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
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
      setPointsToBeEarned(Math.floor((priceSum - discountSum) * 0.01));
    };

    calculateTotalPriceAndDiscount();
  }, [selectedCartItems, pointUsed]);

  // 결제하기 버튼 클릭 핸들러
  const handlePurchase = () => {
    // LocalStorage에서 기존 장바구니를 가져옴
    const currentCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // 결제된 상품을 제외한 나머지 상품들로 필터링
    const updatedCartItems = currentCartItems.filter(
      (cartItem: any) => !selectedCartItems.some(
        (selectedItem) => selectedItem.id === cartItem.id
      )
    );

    // 필터링된 상품들로 LocalStorage 업데이트
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // AIContext를 초기화하여 다음 세특 작성 시 새 데이터를 입력할 수 있게 함
    setSelectedSubject(""); // 과목 초기화
    setDream(""); // 꿈 초기화
    setTargetUniversities([ // 목표 대학 초기화
      { name: "", major: "" },
      { name: "", major: "" },
      { name: "", major: "" },
    ]);

    // AI 서비스가 포함된 경우 '/ai/waiting'으로 이동
    const containsAIService = selectedCartItems.some(item =>
      item.service.title.includes("패스")
    );

    if (containsAIService) {
      navigate('/ai/waiting');
    } else {
      // 결제 완료 후 구매 페이지로 이동
      navigate('/my/purchase');
    }
  };

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
