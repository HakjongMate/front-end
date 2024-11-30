import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Service, CartItem as CartItemType } from "../../types";
import toast, { Toaster } from "react-hot-toast";

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
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  // LocalStorage에서 cartItems 가져와서 cartItems 상태 업데이트
  useEffect(() => {
    // LocalStorage에서 cartItems 가져오기
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    setCartItems(cart);
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
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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

  // 로그인 상태 확인
  const isLoggedIn = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  // 전체 결제 버튼 클릭
  const handleCheckout = () => {
    if (!isLoggedIn()) {
      // 로그인되지 않은 경우 에러 메시지 표시 및 로그인 페이지로 이동
      toast.error("로그인이 필요합니다. 로그인 후 이용해 주세요.", {
        style: {
          maxWidth: "1000px",
          width: "400px",
          fontSize: "20px",
        },
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5초 지연
      return;
    }

    // 모든 장바구니 아이템을 구매 페이지로 전달
    navigate("/purchase", { 
      state: { 
        selectedCartItems: cartItems.map(item => ({
          ...item,
          amount: 1
        }))
      } 
    });
  };

  // 선택 결제 버튼 클릭
  const handleSelectCheckout = () => {
    if (!isLoggedIn()) {
      // 로그인되지 않은 경우 에러 메시지 표시 및 로그인 페이지로 이동
      toast.error("로그인이 필요합니다. 로그인 후 이용해 주세요.", {
        style: {
          maxWidth: "1000px",
          width: "400px",
          fontSize: "20px",
        },
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5초 지연
      return;
    }

    // 선택된 아이템만 구매 페이지로 전달
    const selectedCartItems = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .map(item => ({
        ...item,
        amount: 1
      }));

    navigate("/purchase", { state: { selectedCartItems } });
  };

  // 개별 구매 버튼 클릭
  const handleBuyItem = (item: CartItemType) => {
    if (!isLoggedIn()) {
      // 로그인되지 않은 경우 에러 메시지 표시 및 로그인 페이지로 이동
      toast.error("로그인이 필요합니다. 로그인 후 이용해 주세요.", {
        style: {
          maxWidth: "1000px",
          width: "400px",
          fontSize: "20px",
        },
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5초 지연
      return;
    }

    // 단일 아이템을 구매 페이지로 전달
    navigate("/purchase", { 
      state: { 
        selectedCartItems: [{
          ...item,
          amount: 1
        }]
      } 
    });
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
        <CancelButton onClick={handleSelectCheckout} disabled={selectedItems.length === 0}>
          선택 결제하기
        </CancelButton>
        <CheckoutButton onClick={handleCheckout} disabled={cartItems.length === 0}>
          전체 결제하기
        </CheckoutButton>
      </ButtonContainer>
      <Toaster position="top-center" reverseOrder={false} />
    </SectionWrapper>
  );
};

export default MyCartSection;
