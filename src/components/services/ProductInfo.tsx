import React from "react";
import styled from "styled-components";
import { Share } from "@mui/icons-material";
import toast, { Toaster } from 'react-hot-toast';

const ProductInfoWrapper = styled.div`
  display: flex;
  width: 920px;
  max-width: 100%;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    align-items: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ProductImageWrapper = styled.div`
  width: 350px;
  padding-right: 50px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding-right: 0;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
  }
`;

const ProductRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const ProductSubtitle = styled.p`
  font-size: 14px;
  color: #202594;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }
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

  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #000;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const OriginalPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
  text-decoration: line-through;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const Rating = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #202594;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex: 1;

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 16px;
  }
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
    id: number;
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
    alert("구매 및 기타 문의는 010-0000-0000으로 연락 부탁드립니다.");
  };

  const handleCartClick = () => {
    // LocalStorage에서 기존 장바구니 아이템 불러오기 (없으면 빈 배열)
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
  
    // 새로운 아이템 생성 (고유 ID는 장바구니 아이템 수로 계산)
    const newItem = {
      id: cart.length + 1,
      serviceId: product.id,
    };
  
    // 장바구니에 아이템 추가
    cart.push(newItem);
  
    // LocalStorage에 다시 저장
    localStorage.setItem("cartItems", JSON.stringify(cart));
  
    // 장바구니 추가 완료 메시지 표시
    toast.success("상품이 장바구니에 추가되었습니다!", {
      style: {
        maxWidth: "1000px",
        width: "400px",
        fontSize: "20px",
      },
    });
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
