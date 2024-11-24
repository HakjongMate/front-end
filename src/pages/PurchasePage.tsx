import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { usePurchase } from "../contexts/PurchaseContext";
import { useContext } from "react";
import AIContext from "../contexts/AIContext";
import { CartItem } from "../types";
import PurchaseItemSection from "../components/purchase/PurchaseItemSection";
import PurchaseInfoSection from "../components/purchase/PurchaseInfoSection";
import PurchasePointSection from "../components/purchase/PurchasePointSection";
import PurchasePaymentSection from "../components/purchase/PurchasePaymentSection";
import PurchaseSummarySection from "../components/purchase/PurchaseSummerySection";
import PurchaseAgreeSection from "../components/purchase/PurchaseAgreeSection";


interface PurchaseRequest {
  contactInfo: string;
  email: string;
  usedPoint: number;
  paymentMethod: "BANK_TRANSFER" | "CARD";
  buyItems: Array<{
    serviceId: number;
    passId?: number;
    amount: number;
  }>;
}

// API 응답 타입 정의
interface PurchaseResponse {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    userId: number;
    status: string;
    totalPrice: number;
    purchaseDate: string;
    contactInfo: string;
    email: string;
    usedPoint: number;
    paymentMethod: string;
    buyItems: Array<{
      id: number;
      buyId: number;
      serviceId: number;
      passId: number | null;
      status: string;
      amount: number;
      totalPrice: number;
      refundDate: string | null;
    }>;
  };
}

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
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    setSelectedCartItems,
    selectedCartItems,
    pointUsed,
    contactInfo,
    email,
    paymentMethod
  } = usePurchase();

  const { 
    setSelectedSubject, 
    setDream, 
    setTargetUniversities 
  } = useContext(AIContext);

  useEffect(() => {
    const { selectedCartItems = [] } = location.state || {};
    setSelectedCartItems(selectedCartItems);
  }, [location.state, setSelectedCartItems]);

  // 구매 데이터 검증
  const validatePurchaseData = () => {
    if (!selectedCartItems.length) {
      throw new Error("선택된 상품이 없습니다.");
    }
    if (!contactInfo) {
      throw new Error("연락처를 입력해주세요.");
    }
    if (!email) {
      throw new Error("이메일을 입력해주세요.");
    }
    if (paymentMethod === "BANK_TRANSFER" && !contactInfo) {
      throw new Error("입금자명을 입력해주세요.");
    }
  };

  // 구매 요청 데이터 생성
  const createPurchaseRequest = (): PurchaseRequest => {
    return {
      contactInfo,
      email,
      usedPoint: pointUsed,
      paymentMethod: paymentMethod as "BANK_TRANSFER" | "CARD",
      buyItems: selectedCartItems.map(item => ({
        serviceId: item.service.id,
        passId: item.pass?.id,
        amount: 1
      }))
    };
  };

  // 구매 API 호출
  const purchaseItems = async (requestData: PurchaseRequest): Promise<PurchaseResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '결제 처리 중 오류가 발생했습니다.');
    }

    return response.json();
  };

  // 구매 완료 후 처리
  const handlePurchaseSuccess = () => {
    // 장바구니에서 구매한 항목 제거
    const currentCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const updatedCartItems = currentCartItems.filter(
      (cartItem: CartItem) => !selectedCartItems.some(
        (selectedItem) => selectedItem.id === cartItem.id
      )
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // AI 컨텍스트 초기화
    setSelectedSubject("");
    setDream("");
    setTargetUniversities([
      { name: "", major: "" },
      { name: "", major: "" },
      { name: "", major: "" },
    ]);

    // AI 서비스 포함 여부에 따른 페이지 이동
    const containsAIService = selectedCartItems.some(item =>
      item.service.title.includes("패스")
    );

    navigate(containsAIService ? '/ai/waiting' : '/my/purchase');
  };

  // 구매 처리
  const handlePurchase = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 데이터 검증
      validatePurchaseData();

      // 구매 요청 데이터 생성
      const requestData = createPurchaseRequest();

      // API 호출
      const response = await purchaseItems(requestData);

      // 성공 처리
      if (response.code === "SUCCESS_CREATE_BUY") {
        handlePurchaseSuccess();
      } else {
        throw new Error("결제 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("결제 처리 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <LeftSection>
        <PurchaseItemSectionStyled />
        <PurchaseInfoSectionStyled />
        <PurchasePointSectionStyled />
        <PurchasePaymentSectionStyled />
      </LeftSection>
      <RightSection>
        <PurchaseSummarySectionStyled 
          onPaymentSubmit={handlePurchase}
          isSubmitting={isSubmitting}
          error={error}
        />
        <PurchaseAgreeSectionStyled />
      </RightSection>
    </PageContainer>
  );
}

export default PurchasePage;