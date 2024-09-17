import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/contact/PageHeader';
import ApplyForm from '../components/contact/ApplyForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background-color: #f6f7fc;
  font-family: 'Pretendard';
  min-height: calc(100vh - 140px);
  box-sizing: border-box;
  overflow-x: hidden; 
`;

const ApplyPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader />
      <ApplyForm />
    </PageContainer>
  );
}

export default ApplyPage;
