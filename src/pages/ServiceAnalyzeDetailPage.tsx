import React, { useState } from "react";
import ProductInfo from "../components/services/ProductInfo";
import TabsComponent from "../components/services/TabsComponent";
import serviceData from "../assets/data/service.json";
import analyzeQnA from "../assets/data/analyzeqna.json"; // 분석 서비스 Q&A 데이터 가져오기
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ServiceAnalyzeDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("detail");

  // 분석 서비스는 두 번째 상품으로 선택
  const product = serviceData[1];
  // 할인된 가격 계산
  const price = Number(product.price.replace(/,/g, ""));
  const discountedPrice = (price * (1 - product.discout)).toLocaleString();

  const productInfo = {
    ...product,
    discountedPrice: `${discountedPrice}`,
  };

  // QnA 데이터를 TabsComponent에 전달
  const qnaData = analyzeQnA;

  return (
    <PageWrapper>
      <ProductInfo product={productInfo} />
      <TabsComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
        type="analyze"
        qnaData={qnaData}
      />
    </PageWrapper>
  );
};

export default ServiceAnalyzeDetailPage;