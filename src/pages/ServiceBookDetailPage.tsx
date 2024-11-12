import React, { useState } from "react";
import ProductInfo from "../components/services/ProductInfo";
import TabsComponent from "../components/services/TabsComponent";
import serviceData from "../assets/data/service.json";
import bookQnA from "../assets/data/bookqna.json";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f5f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  /* 반응형 추가 */
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ServiceBookDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("detail");

  // 가이드북은 첫 번째 상품으로 선택
  const product = serviceData[0];
  // 할인된 가격 계산
  const discountedPrice = (product.price * (1 - product.discount)).toLocaleString();

  const productInfo = {
    ...product,
    discountedPrice: `${discountedPrice}`,
  };

  // QnA 데이터를 TabsComponent에 전달
  const qnaData = bookQnA;

  return (
    <PageWrapper>
      <ProductInfo product={productInfo} />
      <TabsComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
        type="book"
        qnaData={qnaData}
      />
    </PageWrapper>
  );
};

export default ServiceBookDetailPage;
