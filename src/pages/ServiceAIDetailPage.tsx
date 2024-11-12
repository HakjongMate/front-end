import React, { useState } from "react";
import ProductInfo from "../components/services/ProductInfo";
import TabsComponent from "../components/services/TabsComponent";
import serviceData from "../assets/data/service.json";
import aiQnA from "../assets/data/aiqna.json";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ServiceAIDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("detail");

  // AI 서비스는 세 번째 상품으로 선택
  const product = serviceData[2];
  // 할인된 가격 계산
  const discountedPrice = (product.price * (1 - product.discount)).toLocaleString();

  const productInfo = {
    ...product,
    discountedPrice: `${discountedPrice}`,
  };

  const qnaData = aiQnA;

  return (
    <PageWrapper>
      <ProductInfo product={productInfo} />
      <TabsComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
        type="ai"
        qnaData={qnaData}
      />
    </PageWrapper>
  );
};

export default ServiceAIDetailPage;
