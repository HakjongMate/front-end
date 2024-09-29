import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

const CheckboxCell = styled.td`
  text-align: center;
  vertical-align: middle;
  width: 50px;
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 아이템과 X버튼 사이 간격 확보 */
  padding: 20px 10px;
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 3%;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;
`;

const ItemSubtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #555;
  margin-top: 5px;
`;

const PriceCell = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 0px 10px 20px;
  border-left: 1px solid #e0e0e0;
  width: 150px;
`;

const OriginalPrice = styled.p`
  font-size: 18px;
  color: #888;
  text-decoration: line-through;
  margin-bottom: 5px;
`;

const DiscountPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #007BFF;
  margin-bottom: 10px;
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
`;

interface CartItemProps {
  item: {
    id: number;
    service: {
      title: string;
      subtitle: string;
      image: string;
      price: string;
      discout: number;
      deliveryInfo: string;
    };
    description?: string[];
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;  // 삭제 기능 추가
}

const CartItem: React.FC<CartItemProps> = ({ item, isSelected, onSelect, onDelete }) => {
  const originalPrice = parseInt(item.service.price.replace(',', ''));
  const discountPrice = Math.round(originalPrice * (1 - item.service.discout));
  const description = item.description ? item.description.join(' | ') : '';

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
        <BuyButton>개별구매</BuyButton>
      </PriceCell>
      <DeliveryCell>{item.service.deliveryInfo}</DeliveryCell>
    </ItemWrapper>
  );
};

export default CartItem;
