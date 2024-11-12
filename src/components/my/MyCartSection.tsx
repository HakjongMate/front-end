import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Service, CartItem as CartItemType } from "../../types";
import serviceData from "../../assets/data/service.json";

const SectionWrapper = styled.div`
  padding: 20px;
  max-width: 1080px;
  margin: 0 auto;
  font-family: sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #e0e0e0;
  padding: 0 10px 20px 10px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 5px 15px 5px;
  }

  @media (max-width: 480px) {
    padding: 0 0 10px 0;
  }
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px 0 0;
  border-top: 1px solid #e0e0e0;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    flex-direction: column;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const TotalItems = styled.p`
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const TotalPrice = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }

  @media (max-width: 480px) {
    text-align: left;
  }
`;

const OriginalTotalPrice = styled.p`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const FinalPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 12px 30px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    margin-left: 0;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px 15px;
    font-size: 12px;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

const CheckoutButton = styled(Button)`
  background-color: #202594;
  color: #fff;
`;

const CancelButton = styled(Button)`
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
`;

const MyCartSection: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  // LocalStorage에서 cartItems 가져와서 cartItems 상태 업데이트
  useEffect(() => {
    // LocalStorage에서 cartItems 가져오기
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // cartItems와 serviceData를 매칭하여 아이템 상세 정보 포함
    const itemsWithDetails = cart.map((cartItem: { serviceId: number; description: string[] }) => {
      const service = serviceData.find((service: Service) => service.id === cartItem.serviceId);
      return {
        id: cartItem.serviceId,
        service,
        description: cartItem.description,
      };
    });

    setCartItems(itemsWithDetails);
  }, []);

  // 아이템 선택/해제
  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // 아이템 삭제
  const handleDeleteItem = (id: number) => {
    // 장바구니에서 아이템을 삭제한 새로운 배열 생성
    const updatedCartItems = cartItems.filter((item) => item.id !== id);

    // 상태 업데이트
    setCartItems(updatedCartItems);

    // LocalStorage에서 아이템을 삭제한 새로운 배열 생성
    const updatedCart = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ).filter((cartItem: any) => cartItem.id !== id);

    // LocalStorage에 다시 저장
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // 선택된 아이템의 총 금액 계산
  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.service.price, 0);
  };

  // 선택된 아이템의 할인 적용 금액 계산
  const calculateDiscountTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const discountPrice = Math.round(item.service.price * (1 - item.service.discount));
        return total + discountPrice;
      }, 0);
  };

  // 전체 결제 버튼 클릭 시 모든 상품을 결제 페이지로 이동
  const handleCheckout = () => {
    navigate("/purchase", { state: { selectedCartItems: cartItems } });
  };

  // 선택 결제 버튼 클릭 시 선택된 상품만 결제 페이지로 이동
  const handleSelectCheckout = () => {
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    navigate("/purchase", { state: { selectedCartItems } });
  };

  // 개별 구매 버튼 클릭 시 해당 상품만 결제 페이지로 이동
  const handleBuyItem = (item: any) => {
    navigate("/purchase", { state: { selectedCartItems: [item] } });
  };

  return (
    <SectionWrapper>
      <Title>장바구니</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader style={{ width: "50px" }}></TableHeader>
            <TableHeader>상품</TableHeader>
            <TableHeader style={{ width: "150px" }}>금액</TableHeader>
            <TableHeader style={{ width: "120px" }}>배송 내용</TableHeader>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onSelect={() => handleSelectItem(item.id)}
              onDelete={() => handleDeleteItem(item.id)}
              onBuy={() => handleBuyItem(item)}
            />
          ))}
        </tbody>
      </Table>

      <CartSummary>
        <TotalItems>총 상품 개수: {selectedItems.length}개</TotalItems>
        <TotalPrice>
          <OriginalTotalPrice>
            상품 금액: {calculateTotal().toLocaleString()}원
          </OriginalTotalPrice>
          <FinalPrice>
            결제 예정 금액: {calculateDiscountTotal().toLocaleString()}원
          </FinalPrice>
        </TotalPrice>
      </CartSummary>

      <Divider />

      <ButtonContainer>
        <CancelButton onClick={handleSelectCheckout}>
          선택 결제하기
        </CancelButton>
        <CheckoutButton onClick={handleCheckout}>전체 결제하기</CheckoutButton>
      </ButtonContainer>
    </SectionWrapper>
  );
};

export default MyCartSection;
