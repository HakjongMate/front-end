import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PurchaseItem from "../../components/my/PurchaseItem";
import purchasedItemsData from "../../assets/data/purchasedItems.json";
import serviceData from "../../assets/data/service.json";

const SectionWrapper = styled.div`
  padding: 40px 20px;
  max-width: 1080px;
  min-height: 100vh;
  margin: 0 auto;
  font-family: sans-serif;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ active }) => (active ? "#3F5BF6" : "#333")};
  border: none;
  border-bottom: ${({ active }) => (active ? "2px solid #3F5BF6" : "none")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    color: #3f5bf6;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const MyPurchasePage: React.FC = () => {
  const [purchaseItems, setPurchaseItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "전체" | "AI 주제 추천 서비스" | "학종 가이드북" | "생활기록부 분석 서비스"
  >("전체");

  useEffect(() => {
    const itemsWithDetails = purchasedItemsData.map((purchaseItem) => {
      const service = serviceData.find(
        (service) => service.id === purchaseItem.serviceId
      );
      return {
        ...purchaseItem,
        service,
      };
    });
    setPurchaseItems(itemsWithDetails);
  }, []);

  const filteredItems = () => {
    return activeTab === "전체"
      ? purchaseItems
      : purchaseItems.filter((item) =>
          item.service.title.includes(activeTab)
        );
  };

  return (
    <SectionWrapper>
      <Title>구매 내역</Title>

      <TabContainer>
        {[
          "전체",
          "AI 주제 추천 서비스",
          "학종 가이드북",
          "생활기록부 분석 서비스",
        ].map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      <PurchaseList>
        {filteredItems().map((item) => (
          <PurchaseItem key={item.id} item={item} />
        ))}
      </PurchaseList>
    </SectionWrapper>
  );
};

export default MyPurchasePage;
