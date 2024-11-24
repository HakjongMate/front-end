import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PurchaseItemSection from "../components/purchase/PurchaseItemSection";
import PurchaseInfoSection from "../components/purchase/PurchaseInfoSection";
import PurchasePointSection from "../components/purchase/PurchasePointSection";
import PurchasePaymentSection from "../components/purchase/PurchasePaymentSection";
import PurchaseSummarySection from "../components/purchase/PurchaseSummerySection";
import PurchaseAgreeSection from "../components/purchase/PurchaseAgreeSection";

const PageContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }
`;

const LeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    flex: 1;
    gap: 10px;
  }
`;

const RightSection = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    flex: 1;
    gap: 10px;
  }
`;

const PurchaseItemSectionStyled = styled(PurchaseItemSection)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PurchaseInfoSectionStyled = styled(PurchaseInfoSection)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PurchasePointSectionStyled = styled(PurchasePointSection)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PurchasePaymentSectionStyled = styled(PurchasePaymentSection)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PurchaseSummarySectionStyled = styled(PurchaseSummarySection)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PurchaseAgreeSectionStyled = styled(PurchaseAgreeSection)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

function PurchasePage() {
  // const location = useLocation();
  
  // // 전달된 상태 정보에서 selectedCartItems와 selectedTitles 추출
  // const { selectedCartItems = [], selectedTitles = [] } = location.state || {};

  // // 콘솔에 전달된 데이터 출력
  // console.log("Selected Cart Items:", selectedCartItems);
  // console.log("Selected Titles:", selectedTitles);

  return (
    <PageContainer>
      <LeftSection>
        <PurchaseItemSectionStyled />
        <PurchaseInfoSectionStyled />
        <PurchasePointSectionStyled />
        <PurchasePaymentSectionStyled />
      </LeftSection>
      <RightSection>
        <PurchaseSummarySectionStyled />
        <PurchaseAgreeSectionStyled />
      </RightSection>
    </PageContainer>
  );
}

export default PurchasePage;
