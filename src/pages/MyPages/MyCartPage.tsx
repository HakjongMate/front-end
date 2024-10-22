import React from 'react';
import styled from 'styled-components';
import MyCartSection from '../../components/my/MyCartSection';

const PageWrapper = styled.div`
  padding: 40px;
  max-width: 1080px;
  min-height: 70vh;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 30px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 20px;
    max-width: 95%;
  }
`;

const MyCartPage: React.FC = () => {
  return (
    <PageWrapper>
      <MyCartSection />
    </PageWrapper>
  );
};

export default MyCartPage;
