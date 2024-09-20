import React, { useState } from "react";
import styled from "styled-components";
import serviceData from "../assets/data/service.json";
import { Share } from "@mui/icons-material";

const PageWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

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

const ProductDetails = styled.div``;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
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
  border: none;

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

const TabsContainer = styled.div`
  width: 1000px;
  margin-top: 40px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#2b44ff" : "#000")};
  border-bottom: ${(props) => (props.active ? "2px solid #2b44ff" : "none")};
  cursor: pointer;
  flex-grow: 1; 
  text-align: center;

  &:hover {
    color: #2b44ff;
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  background-color: #fff;
  min-height: 300px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const DetailImage = styled.img`
  width: 100%;
  max-width: 750px;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
`;

function ServiceBookDetailPage() {
  const [activeTab, setActiveTab] = useState("detail");

  const product = serviceData[0];
  const price = Number(product.price.replace(/,/g, ""));
  const discountedPrice = (price * (1 - product.discout)).toLocaleString();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <PageWrapper>
      <ProductInfoWrapper>
        <ProductImageWrapper>
          <ProductImage src={product.image} alt={product.title} />
        </ProductImageWrapper>

        <ProductRight>
          <ProductHeader>
            <TitleWrapper>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductSubtitle>
                {product.subtitle}
              </ProductSubtitle>
            </TitleWrapper>
            <ShareButton>
              <Share />
            </ShareButton>
          </ProductHeader>
          
          <Divider />

          <ProductDetails>
            <PriceWrapper>
              <ProductPrice>{discountedPrice}원</ProductPrice>
              <OriginalPrice>{product.price}원</OriginalPrice>
            </PriceWrapper>
            <Rating>
              {"★".repeat(Math.floor(product.rating))} {product.rating}점
            </Rating>
          </ProductDetails>

          <Divider />

          <ButtonGroup>
            <BuyButton>구매하기</BuyButton>
            <CartButton>장바구니</CartButton>
          </ButtonGroup>
        </ProductRight>
      </ProductInfoWrapper>

      <TabsContainer>
        <Tabs>
          <TabButton
            active={activeTab === "detail"}
            onClick={() => handleTabClick("detail")}
          >
            상세 정보
          </TabButton>
          <TabButton
            active={activeTab === "review"}
            onClick={() => handleTabClick("review")}
          >
            리뷰
          </TabButton>
          <TabButton
            active={activeTab === "qa"}
            onClick={() => handleTabClick("qa")}
          >
            Q&A
          </TabButton>
        </Tabs>

        <TabContent>
          {activeTab === "detail" && product.detailImage.length > 0 ? (
            product.detailImage.map((image, index) => (
              <DetailImage key={index} src={image} alt={`Detail ${index}`} />
            ))
          ) : activeTab === "detail" ? (
            <p>상세 정보가 없습니다.</p>
          ) : activeTab === "review" ? (
            <p>리뷰가 없습니다.</p>
          ) : (
            <p>Q&A가 없습니다.</p>
          )}
        </TabContent>
      </TabsContainer>
    </PageWrapper>
  );
}

export default ServiceBookDetailPage;
