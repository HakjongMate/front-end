import React from "react";
import styled from "styled-components";
import { Share } from "@mui/icons-material";
import toast, { Toaster } from 'react-hot-toast';

const ProductInfoWrapper = styled.div`
  display: flex;
  width: 950px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductImageWrapper = styled.div`
  width: 350px;
  padding-right: 50px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ProductSubtitle = styled.p`
  font-size: 14px;
  color: #202594;
  margin: 0;
`;

const ShareButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #202594;
  padding: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #000;
`;

const OriginalPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
  text-decoration: line-through;
  margin-left: 10px;
`;

const Rating = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #202594;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex: 1;
`;

const BuyButton = styled(Button)`
  background-color: #202594;
  color: white;

  &:hover {
    background-color: #3c2ad6;
  }
`;

const CartButton = styled(Button)`
  background-color: #fff;
  color: #000;
  border: 1px solid #000;

  &:hover {
    background-color: #f8f9fa;
  }
`;

interface ProductInfoProps {
  product: {
    title: string;
    subtitle: string;
    price: string;
    discountedPrice: string;
    image: string;
    rating: number;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const handleBuyClick = () => {
    alert("010-0000-0000으로 연락 부탁드립니다.");
  };

  const handleCartClick = () => {
    alert("서비스 준비중입니다.");
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다!", {
      style: {
        maxWidth: "1000px",
        width: "300px",
        fontSize: "20px",
      },
    });
  };

  return (
    <ProductInfoWrapper>
      <ProductImageWrapper>
        <ProductImage src={product.image} alt={product.title} />
      </ProductImageWrapper>
      <ProductRight>
        <ProductHeader>
          <TitleWrapper>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductSubtitle>{product.subtitle}</ProductSubtitle>
          </TitleWrapper>
          <ShareButton onClick={handleShareClick}>
            <Share />
          </ShareButton>
        </ProductHeader>
        <Divider />
        <PriceWrapper>
          <ProductPrice>{product.discountedPrice}원</ProductPrice>
          <OriginalPrice>{product.price}원</OriginalPrice>
        </PriceWrapper>
        <Rating>★★★★★ {product.rating}점</Rating>
        <Divider />
        <ButtonGroup>
          <BuyButton onClick={handleBuyClick}>구매하기</BuyButton>
          <CartButton onClick={handleCartClick}>장바구니</CartButton>
        </ButtonGroup>
      </ProductRight>
      <Toaster />
    </ProductInfoWrapper>
  );
};

export default ProductInfo;
