import React, { useState } from "react";
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
  const [pointUsed, setPointUsed] = useState<number>(0);

  return (
    <PageContainer>
      <LeftSection>
        <PurchaseItemSectionStyled />
        <PurchaseInfoSectionStyled />
        <PurchasePointSectionStyled pointUsed={pointUsed} setPointUsed={setPointUsed} />
        <PurchasePaymentSectionStyled />
      </LeftSection>
      <RightSection>
        <PurchaseSummarySectionStyled pointUsed={pointUsed} />
        <PurchaseAgreeSectionStyled />
      </RightSection>
    </PageContainer>
  );
}

export default PurchasePage;
