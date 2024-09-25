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
`;

const MyCartPage: React.FC = () => {
  return (
    <PageWrapper>
      <MyCartSection />
    </PageWrapper>
  );
};

export default MyCartPage;
