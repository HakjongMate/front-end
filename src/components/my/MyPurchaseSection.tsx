import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PurchaseItem from './PurchaseItem';
import serviceData from '../../assets/data/service.json';
import passData from '../../assets/data/pass.json';
import { Link } from 'react-router-dom';

const SectionWrapper = styled.div`
  padding: 20px 20px 40px;
  max-width: 1080px;
  margin: 0 auto;
  font-family: sans-serif;
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
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ active }) => (active ? '#3F5BF6' : '#333')};
  border: none;
  border-bottom: ${({ active }) => (active ? '2px solid #3F5BF6' : 'none')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    color: #3f5bf6;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 12px;
  }
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ViewMoreButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  text-align: right;
  color: #3f5bf6;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const MyPurchaseSection: React.FC = () => {
  const [purchaseItems, setPurchaseItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "전체" | "AI 주제 추천 서비스" | "학종 가이드북" | "생활기록부 분석 서비스"
  >("전체");

  useEffect(() => {
    const fetchPurchaseItems = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buy/my`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });

        const result = await response.json();

        const itemsWithDetails = result.data.flatMap((purchase: any) => {
          return purchase.buyItems.map((buyItem: any) => {
            const service = buyItem.serviceId
              ? serviceData.find((service) => service.id === buyItem.serviceId)
              : buyItem.passId
              ? {
                  title: 'AI 주제 추천 서비스',
                  subtitle: 'AI 기반 맞춤형 탐구 주제 추천',
                  image: '/images/ai-main.webp',
                }
              : null;

            const pass = buyItem.passId
              ? passData.find((pass) => pass.id === buyItem.passId)
              : null;

            return {
              ...buyItem,
              service,
              pass,
              purchaseDate: purchase.purchaseDate,
            };
          });
        });

        setPurchaseItems(itemsWithDetails);
      } catch (error) {
        console.error('Error fetching purchase items:', error);
      }
    };

    fetchPurchaseItems();
  }, []);

  // 필터된 아이템을 2개씩만 표시
  const filteredItems = () => {
    const filtered =
      activeTab === "전체"
        ? purchaseItems
        : purchaseItems.filter((item) =>
          item.service?.title.includes(activeTab) || item.pass?.title.includes(activeTab)
        );
    return filtered.slice(0, 2);
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

      <ViewMoreButton to="/my/purchase">더보기 &gt;</ViewMoreButton>
    </SectionWrapper>
  );
};

export default MyPurchaseSection;
