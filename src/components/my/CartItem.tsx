import React from 'react';
import styled from 'styled-components';
import { CartItem as CartItemType } from '../../types';
import toast, { Toaster } from "react-hot-toast";

const ItemWrapper = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

const CheckboxCell = styled.td`
  text-align: center;
  vertical-align: middle;
  width: 50px;

  @media (max-width: 768px) {
    width: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
  }
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 5px;
  }

  @media (max-width: 480px) {
    padding: 10px 5px;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 3%;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  flex-grow: 1;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ItemSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #555;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const PriceCell = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 0px 10px 20px;
  border-left: 1px solid #e0e0e0;
  width: 150px;

  @media (max-width: 768px) {
    width: 130px;
  }

  @media (max-width: 480px) {
    width: 110px;
  }
`;

const OriginalPrice = styled.p`
  font-size: 18px;
  color: #888;
  text-decoration: line-through;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
  
  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

const DiscountPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #007BFF;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

const BuyButton = styled.button`
  background-color: #007BFF;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

const DeliveryCell = styled.td`
  font-size: 15px;
  font-weight: 400;
  color: #000;
  line-height: 1.5;
  white-space: pre-wrap;
  text-align: center;
  vertical-align: middle;
  padding: 20px 10px;
  border-left: 1px solid #e0e0e0;
  width: 120px;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 15px 8px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 5px;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 22px;
  color: #888;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;


interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void; 
  onBuy: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, isSelected, onSelect, onDelete, onBuy }) => {
  const originalPrice = item.service.price;
  const discountPrice = Math.round(originalPrice * (1 - item.service.discount));
  const description = item.description ? item.description.join(' | ') : '';

  const isLoggedIn = () => !!localStorage.getItem("accessToken");

  const handleBuyClick = () => {
    if (!isLoggedIn()) {
      toast.error("로그인이 필요합니다. 로그인 후 이용해 주세요.", {
        style: {
          maxWidth: "1000px",
          width: "400px",
          fontSize: "20px",
        },
      });
      setTimeout(() => {
        window.location.href = "/login"; // 로그인 페이지로 이동
      }, 1500);
      return;
    }
    onBuy();
  };

  return (
    <ItemWrapper>
      <CheckboxCell>
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </CheckboxCell>
      <ProductCell>
        <ItemImage src={item.service.image} alt={item.service.title} />
        <ItemDetails>
          <ItemTitle>{item.service.title}</ItemTitle>
          <ItemSubtitle>{item.service.subtitle}</ItemSubtitle>
          {description && <Description>{description}</Description>}
        </ItemDetails>
        <DeleteButton onClick={onDelete}>×</DeleteButton>
      </ProductCell>
      <PriceCell>
        <OriginalPrice>{originalPrice.toLocaleString()}원</OriginalPrice>
        <DiscountPrice>{discountPrice.toLocaleString()}원</DiscountPrice>
        <BuyButton onClick={handleBuyClick}>개별구매</BuyButton>
      </PriceCell>
      <DeliveryCell>{item.service.deliveryInfo}</DeliveryCell>
      <Toaster position="top-center" reverseOrder={false} />
    </ItemWrapper>
  );
};

export default CartItem;
