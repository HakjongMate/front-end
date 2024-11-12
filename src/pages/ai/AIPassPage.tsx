import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AIContext from "../../contexts/AIContext";
import StepIndicator from "../../components/ai/StepIndicator";
import ButtonContainer from "../../components/ai/ButtonContainer";
import blueIcon from "../../assets/icons/blue-icon.svg";
import greenIcon from "../../assets/icons/green-icon.svg";
import yellowIcon from "../../assets/icons/yellow-icon.svg";
import passData from "../../assets/data/pass.json";
import serviceData from "../../assets/data/service.json";
import PassCard from "../../components/ai/PassCard";

const PageWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-align: left;
  margin-bottom: 30px;
  white-space: pre-wrap;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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
  const { selectedSubject, targetUniversities, isNaturalSciences } = useContext(AIContext);
  const [selectedPass, setSelectedPass] = useState<number | null>(null);
  const [dream, setDream] = useState<string>("");

  // LocalStorage에서 dream 값을 가져옴
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setDream(storedUser.dream || "");
  }, []);

  // 선택한 패스에 맞는 서비스 ID 매핑
  const getServiceByPassId = (passId: number) => {
    switch (passId) {
      // 종합 성장 패스에 맞는 서비스
      case 1:
        return serviceData.find((service) => service.id === 4);
      // 진로 성장 패스에 맞는 서비스
      case 2:
        return serviceData.find((service) => service.id === 5);
      // 학업 탐구 패스에 맞는 서비스
      case 3:
        return serviceData.find((service) => service.id === 6);
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (selectedPass !== null) {
      const selectedService = getServiceByPassId(selectedPass);
      if (selectedService) {
        // 선택된 과목, 꿈, 대학 리스트를 description 배열로 생성
        const descriptionArray = [
          `${selectedSubject || "선택된 과목 없음"}`,
          `${dream || "선택된 꿈 없음"}`,
          `${targetUniversities.map((uni) => uni.name && uni.major ? `${uni.name} - ${uni.major}` : "").filter(Boolean).join(", ") || "선택된 대학 없음"}`,
        ];

        // 선택한 서비스와 함께 purchase 페이지로 이동
        const selectedCartItems = [
          {
            id: selectedService.id,
            service: selectedService,
            description: descriptionArray,
          },
        ];

        // 3번 스탠다드 패스 선택은 바로 결제로 이동
        if (selectedPass === 3) {
        navigate("/purchase", { state: { selectedCartItems } });
        } else {
          navigate("/ai/exploration");
        }
      } else {
        alert("해당 패스에 맞는 서비스를 찾을 수 없습니다.");
      }
    } else {
      alert("패스를 선택해주세요.");
    }
  };

  const handleBack = () => {
    navigate("/ai/university");
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={3} />
      <Title>주제 추천시 사용할 이용권을 선택해주세요</Title>
      <Divider />
      <Description>
        "premium 패스"의 경우 연구실 정보가 있는 "자연, 이공계열"만 구매가 가능합니다.
      </Description>
      <CardsContainer>
        {passData.map((pass) => (
          <PassCard
            key={pass.id}
            title={pass.title}
            description={pass.description}
            benefits={pass.benefits}
            price={pass.price}
            discountRate={pass.discountRate}
            isBest={pass.isBest}
            isSelected={selectedPass === pass.id}
            iconSrc={getIcon(pass.icon)}
            onClick={() => {
              if (pass.id === 1 && !isNaturalSciences) {
                alert("Premium 패스는 자연과학 계열 학과에서만 선택 가능합니다.");
              } else {
                setSelectedPass(pass.id);
              }
            }}
            disabled={pass.id === 1 && !isNaturalSciences}
          />
        ))}
      </CardsContainer>
      <ButtonContainer onPreviousClick={handleBack} onNextClick={handleNext} />
    </PageWrapper>
  );
};

export default AIPassPage;
