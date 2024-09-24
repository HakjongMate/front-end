import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PurchaseItem from './PurchaseItem';
import purchasedItemsData from '../../assets/data/purchasedItems.json';
import serviceData from '../../assets/data/service.json';

const SectionWrapper = styled.div`
  padding: 20px;
  max-width: 1080px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyPurchaseSection: React.FC = () => {
  const [purchaseItems, setPurchaseItems] = useState<any[]>([]);

  useEffect(() => {
    const itemsWithDetails = purchasedItemsData.map((purchaseItem) => {
      const service = serviceData.find((service) => service.id === purchaseItem.serviceId);
      return {
        ...purchaseItem,
        service,
      };
    });
    setPurchaseItems(itemsWithDetails);
  }, []);

  return (
    <SectionWrapper>
      <Title>구매 내역</Title>
      <PurchaseList>
        {purchaseItems.map((item) => (
          <PurchaseItem key={item.id} item={item} />
        ))}
      </PurchaseList>
    </SectionWrapper>
  );
};

export default MyPurchaseSection;
