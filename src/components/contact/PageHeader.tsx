import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  font-weight: 700;
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
  padding: 5px;
`;

const SubtitleWrapper = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.5;
`;

const PageHeader: React.FC = () => {
  return (
    <>
      <TitleWrapper>문의 및 상담 신청</TitleWrapper>
      <SubtitleWrapper>
        문의 내용 및 상담 신청 내용을 남겨주시면,
        <br />
        순차적으로 카카오톡 메시지가 전달됩니다.
      </SubtitleWrapper>
    </>
  );
}

export default PageHeader;
