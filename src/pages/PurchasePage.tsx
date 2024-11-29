import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { usePurchase } from "../contexts/PurchaseContext";
import { useContext } from "react";
import { CartItem } from "../types";
import AIContext from "../contexts/AIContext";
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
  paymentMethod: "ACCOUNT_TRANSFER";
  bankTransferInfo: {
    holderName: string;
    bank: string;
    account: string;
  };
  buyItems: Array<{
    serviceId: number;
    passId?: number;
    amount: number;
  }>;
}

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
    paymentMethod,
    depositor,
    depositBank,
    depositBankAccount,
  } = usePurchase();

  const { setSelectedSubject, setDream, setTargetUniversities } = useContext(AIContext);

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
    if (!depositor) {
      throw new Error("입금자명을 입력해주세요.");
    }
    if (!depositBank) {
      throw new Error("입금 은행을 입력해주세요.");
    }
    if (!depositBankAccount) {
      throw new Error("입금 계좌번호를 입력해주세요.");
    }
  };

  const createPurchaseRequest = (): PurchaseRequest => {
    return {
      contactInfo,
      email,
      usedPoint: pointUsed,
      paymentMethod: "ACCOUNT_TRANSFER",
      bankTransferInfo: {
        holderName: depositor,
        bank: depositBank,
        account: depositBankAccount,
      },
      buyItems: selectedCartItems.map((item) => ({
        serviceId: item.service.id,
        passId: item.pass?.id,
        amount: 1,
      })),
    };
  };

  // 상품 구매 API 호출
  const purchaseItems = async (requestData: PurchaseRequest): Promise<PurchaseResponse> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "결제 처리 중 오류가 발생했습니다.");
      }
  
      return response.json();
    } catch (error) {
      console.error("Purchase API Error:", error);
      throw error;
    }
  };  

  const handlePurchaseSuccess = () => {
    try {
      // 장바구니에서 구매한 항목 제거
      const currentCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const updatedCartItems = currentCartItems.filter(
        (cartItem: CartItem) =>
          !selectedCartItems.some((selectedItem) => selectedItem.id === cartItem.id)
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
  
      // AI 서비스 포함 여부 확인 및 이동
      const containsAIService = selectedCartItems.some((item) =>
        item.service.title.includes("AI") || item.service.title.includes("패스")
      );
  
      // AI 서비스가 포함된 경우 "/ai/waiting"으로 이동
      if (containsAIService) {
        navigate("/ai/waiting");
      } else {
        navigate("/my/purchase");
      }
    } catch (error) {
      console.error("구매 성공 후 처리 중 오류:", error);
    }
  };  

  const handlePurchase = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      validatePurchaseData();
      const requestData = createPurchaseRequest();
      const response = await purchaseItems(requestData);

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
        <PurchaseItemSection />
        <PurchaseInfoSection />
        <PurchasePointSection />
        <PurchasePaymentSection />
      </LeftSection>
      <RightSection>
        <PurchaseSummarySection
          onPaymentSubmit={handlePurchase}
          isSubmitting={isSubmitting}
          error={error}
        />
        <PurchaseAgreeSection />
      </RightSection>
    </PageContainer>
  );
}

export default PurchasePage;
