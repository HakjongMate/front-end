import React, { useState } from "react";
import ProductInfo from "../components/services/ProductInfo";
import TabsComponent from "../components/services/TabsComponent";
import serviceData from "../assets/data/service.json";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ServiceBookDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("detail");

  // 가이드북은 첫 번째 상품으로 선택
  const product = serviceData[0];
  // 할인된 가격 계산
  const price = Number(product.price.replace(/,/g, ""));
  const discountedPrice = (price * (1 - product.discout)).toLocaleString();

  const productInfo = {
    ...product,
    discountedPrice: `${discountedPrice}`,
  };

  return (
    <PageWrapper>
      <ProductInfo product={productInfo} />
      <TabsComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
        type="book"
      />
    </PageWrapper>
  );
};

export default ServiceBookDetailPage;
