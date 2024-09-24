import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import purchasedItems from '../../assets/data/purchasedItems.json';
import serviceData from '../../assets/data/service.json';

const SectionWrapper = styled.div`
  padding: 20px;
  max-width: 1080px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  font-size: 16px;
`;

const TotalItems = styled.p`
  font-size: 14px;
`;

const TotalPrice = styled.div`
  text-align: right;
`;

const OriginalPrice = styled.p`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`;

const DiscountPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #202594;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 30px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
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

  useEffect(() => {
    const itemsWithDetails = purchasedItems.map((item) => ({
      ...item,
      service: serviceData.find((service) => service.id === item.serviceId),
    }));
    setCartItems(itemsWithDetails);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.service.price.replace(',', ''));
      return total + price;
    }, 0);
  };

  const calculateDiscountTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.service.price.replace(',', ''));
      const discountPrice = price * (1 - item.service.discout);
      return total + discountPrice;
    }, 0);
  };

  return (
    <SectionWrapper>
      <Title>장바구니</Title>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item.service} />
      ))}

      <CartSummary>
        <TotalItems>총 상품 개수: {cartItems.length}개</TotalItems>
        <TotalPrice>
          <OriginalPrice>상품 금액: {calculateTotal().toLocaleString()}원</OriginalPrice>
          <DiscountPrice>결제 예정 금액: {calculateDiscountTotal().toLocaleString()}원</DiscountPrice>
        </TotalPrice>
      </CartSummary>

      <ButtonContainer>
        <CancelButton>취소</CancelButton>
        <CheckoutButton>결제하기</CheckoutButton>
      </ButtonContainer>
    </SectionWrapper>
  );
};

export default MyCartSection;
