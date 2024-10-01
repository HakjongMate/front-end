import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../../components/ai/StepIndicator";
import ButtonContainer from "../../components/ai/ButtonContainer";
import blueIcon from "../../assets/icons/blue-icon.svg";
import greenIcon from "../../assets/icons/green-icon.svg";
import yellowIcon from "../../assets/icons/yellow-icon.svg";
import passData from "../../assets/data/pass.json";
import serviceData from "../../assets/data/service.json"; // 서비스 데이터 추가
import PassCard from "../../components/ai/PassCard";

const PageWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 30px;
  text-align: center;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

// Icon을 선택하는 함수
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "blueIcon":
      return blueIcon;
    case "greenIcon":
      return greenIcon;
    case "yellowIcon":
      return yellowIcon;
    default:
      return "";
  }
};

const AIPassPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPass, setSelectedPass] = useState<number | null>(null);

  // 선택한 패스에 맞는 서비스 ID 매핑
  const getServiceByPassId = (passId: number) => {
    switch (passId) {
      case 1:
        return serviceData.find((service) => service.id === 4); // 종합 성장 패스에 맞는 서비스
      case 2:
        return serviceData.find((service) => service.id === 5); // 진로 성장 패스에 맞는 서비스
      case 3:
        return serviceData.find((service) => service.id === 6); // 학업 탐구 패스에 맞는 서비스
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (selectedPass !== null) {
      const selectedService = getServiceByPassId(selectedPass);
      if (selectedService) {
        // 선택한 서비스와 함께 purchase 페이지로 이동
        const selectedCartItems = [
          {
            id: selectedService.id,
            service: selectedService,
          },
        ];
        navigate("/purchase", { state: { selectedCartItems } });
      } else {
        alert("해당 패스에 맞는 서비스를 찾을 수 없습니다.");
      }
    } else {
      alert("패스를 선택해주세요.");
    }
  };

  const handleBack = () => {
    navigate("/ai/exploration");
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={4} />
      <Title>주제 추천시 사용할 이용권을 선택해주세요</Title>
      <CardsContainer>
        {passData.map((pass) => (
          <PassCard
            key={pass.id}
            title={pass.title}
            description={pass.description}
            benefits={pass.benefits}
            isBest={pass.isBest}
            isSelected={selectedPass === pass.id}
            iconSrc={getIcon(pass.icon)}
            onClick={() => setSelectedPass(pass.id)}
          />
        ))}
      </CardsContainer>
      <ButtonContainer onPreviousClick={handleBack} onNextClick={handleNext} />
    </PageWrapper>
  );
};

export default AIPassPage;
