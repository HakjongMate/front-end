import React, { useState } from "react";
import styled from "styled-components";

const SectionWrapper = styled.div`
  padding: 20px 20px;

  @media (max-width: 768px) {
    padding: 15px 15px;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  color: #202594;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ToggleWrapper = styled.div`
  margin-bottom: 10px;
`;

const ToggleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ToggleIcon = styled.span`
  font-size: 12px;
  color: #000;
`;

const ToggleContent = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  padding: 10px 0;
  max-height: 200px;
  overflow-y: auto;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 5px 0;
`;

function PurchaseAgreeSection() {
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  return (
    <SectionWrapper>
      <SectionTitle>
        상기 주문 내용을 확인하였으며, 결제에 동의합니다.
      </SectionTitle>

      <ToggleWrapper>
        <ToggleTitle onClick={() => setIsProductInfoOpen(!isProductInfoOpen)}>
          <span>주문 상품 정보 동의</span>
          <ToggleIcon>{isProductInfoOpen ? "▲" : "▼"}</ToggleIcon>
        </ToggleTitle>
        {isProductInfoOpen && (
          <ToggleContent>
            주문할 상품의 상품명, 가격, 배송정보 등을 최종 확인하였으며, 구매에
            동의하십니까? (전자상거래법 제 8조 2항)
          </ToggleContent>
        )}
      </ToggleWrapper>
      <Divider />
      <ToggleWrapper>
        <ToggleTitle
          onClick={() => setIsPrivacyPolicyOpen(!isPrivacyPolicyOpen)}
        >
          <span>개인정보 수집 및 이용 동의</span>
          <ToggleIcon>{isPrivacyPolicyOpen ? "▲" : "▼"}</ToggleIcon>
        </ToggleTitle>
        {isPrivacyPolicyOpen && (
          <ToggleContent>
            <h4>수집하는 개인정보의 항목</h4>
            <p>
              ① 학종메이트는 구매, 원활한 고객상담, 각종 서비스의 제공을 위해
              주문 이용 시 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <ul>
              <li>
                필수수집항목 : 이름, 휴대폰번호, 이메일,
                수신자정보(성명,주소,휴대폰번호,이메일)
              </li>
              <li>수집목적 : 상품배송, 배송지 관리</li>
              <li>보유 및 이용기간 : 회원 탈퇴시 까지(단, 관계 법령에 따름)</li>
            </ul>
            <p>
              ② 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이
              자동으로 생성되어 수집될 수 있습니다.
            </p>
            <ul>
              <li>IP Address, 쿠키, 방문 일시, OS종류, 브라우져 종류</li>
              <li>서비스 이용 기록, 불량 이용 기록</li>
            </ul>
            <p>
              ③ 부가 서비스 및 맞춤식 서비스 이용 또는 이벤트 응모 과정에서 해당
              서비스의 이용자에 한해서만 아래와 같은 정보들이 수집될 수
              있습니다.
            </p>
            <ul>
              <li>개인정보 추가 수집에 대해 동의를 받는 경우</li>
            </ul>
            <p>④ 결제 과정에서 아래와 같은 정보들이 수집될 수 있습니다.</p>
            <ul>
              <li>신용카드 결제 시 : 카드사명, 카드번호 등</li>
              <li>
                휴대폰 결제 시 : 이동전화번호, 통신사, 결제승인번호, 이메일주소
                등
              </li>
              <li>계좌이체 시 : 은행명, 계좌번호 등</li>
              <li>상품권 이용 시 : 상품권 번호</li>
              <li>환불시 : 환불계좌정보(은행명, 계좌번호, 예금주명)</li>
              <li>제휴포인트 결제시 : 제휴사명, 카드번호</li>
              <li>현금영수증 : 휴대폰번호, 현금영수증 카드번호, 사업자번호</li>
            </ul>
            <h4>개인정보의 수집 및 이용목적</h4>
            <p>
              "학종메이트"는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
              이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는
              사용되지 않으며, 이용 목적이 변경될 시에는 사전동의를 구할
              것입니다.
            </p>
            <ul>
              <li>
                ① 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
              </li>
              <li>② 비회원 관리</li>
            </ul>
            <h4>개인정보 보유 및 이용기간</h4>
            <p>
              이용자의 개인정보는 원칙적으로 회원탈퇴 시 지체없이 파기합니다.
              단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안
              보존합니다.
            </p>
            <ul>
              <li>① 회사 내부 방침에 의한 정보보유 사유</li>
              <li>② 관계 법령에 의한 정보보유 사유</li>
            </ul>
          </ToggleContent>
        )}
      </ToggleWrapper>
    </SectionWrapper>
  );
}

export default PurchaseAgreeSection;
