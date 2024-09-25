import React from 'react';
import styled from 'styled-components';
import MyCartSection from '../../components/my/MyCartSection';

const PageWrapper = styled.div`
  padding: 40px;
  max-width: 1080px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MyCartPage: React.FC = () => {
  return (
    <PageWrapper>
      <MyCartSection />
    </PageWrapper>
  );
};

export default MyCartPage;
