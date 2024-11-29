import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Share } from "@mui/icons-material";
import toast, { Toaster } from 'react-hot-toast';
import { Service, CartItem } from "../../types";

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
  product: Service & {
    discountedPrice: string;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (product.title.includes("AI")) {
      navigate('/ai/subject', { state: { product } });
    } else {
      const cartItem: CartItem = {
        id: Date.now(),
        service: {
          id: product.id,
          title: product.title,
          subtitle: product.subtitle,
          image: product.image,
          price: product.price,
          discount: product.discount,
          rating: product.rating,
          detailImage: product.detailImage,
          deliveryInfo: product.deliveryInfo,
          passes: product.passes
        }
      };

      navigate('/purchase', { 
        state: { 
          selectedCartItems: [cartItem]
        } 
      });
    }
  };

  const handleCartClick = () => {
    const cartItem: CartItem = {
      id: Date.now(),
      service: {
        id: product.id,
        title: product.title,
        subtitle: product.subtitle,
        image: product.image,
        price: product.price,
        discount: product.discount,
        rating: product.rating,
        detailImage: product.detailImage,
        deliveryInfo: product.deliveryInfo,
        passes: product.passes
      }
    };

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    // 이미 장바구니에 있는 상품인지 확인
    const existingItemIndex = cart.findIndex(
      item => item.service.id === product.id
    );

    if (existingItemIndex !== -1) {
      toast.error("이미 장바구니에 있는 상품입니다.", {
        style: {
          maxWidth: "1000px",
          width: "400px",
          fontSize: "20px",
        },
      });
      return;
    }

    cart.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    toast.success("상품이 장바구니에 추가되었습니다!", {
      style: {
        maxWidth: "1000px",
        width: "400px",
        fontSize: "20px",
      },
    });

    const shouldNavigate = window.confirm("장바구니로 이동하시겠습니까?");
    if (shouldNavigate) {
      navigate('/my/cart');
    }
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
          <OriginalPrice>{product.price.toLocaleString()}원</OriginalPrice>
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
