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
`;

const LeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function PurchasePage() {
  const [pointUsed, setPointUsed] = useState<number>(0);

  return (
    <PageContainer>
      <LeftSection>
        <PurchaseItemSection />
        <PurchaseInfoSection />
        <PurchasePointSection pointUsed={pointUsed} setPointUsed={setPointUsed} />
        <PurchasePaymentSection />
      </LeftSection>
      <RightSection>
        <PurchaseSummarySection pointUsed={pointUsed} />
        <PurchaseAgreeSection />
      </RightSection>
    </PageContainer>
  );
}

export default PurchasePage;
