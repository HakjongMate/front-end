import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface PurchasePointSectionProps {
  pointUsed: number;
  setPointUsed: (points: number) => void;
}

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
`;

const PointInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PointInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  text-align: right;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    margin-bottom: 10px;
    font-size: 12px;
  }
`;

const ApplyButton = styled.button`
  padding: 10px 15px;
  background-color: white;
  border: 1px solid #202594;
  color: #202594;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const TotalPointWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    justify-content: space-between;
  }
`;

const TotalPoint = styled.span`
  margin-left: 10px;
  font-weight: 600;

  @media (max-width: 480px) {
    margin-left: 0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    text-align: left;
  }
`;

const PurchasePointSection: React.FC<PurchasePointSectionProps> = ({
  pointUsed,
  setPointUsed,
}) => {
  const [totalAvailablePoints, setTotalAvailablePoints] = useState<number>(0);
  const [error, setError] = useState<string>("");

  // 최대 포인트 설정
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/me/points`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalAvailablePoints(data.data);
        } else {
          const errorText = await response.text();
          console.error("API 응답 오류:", errorText);
          setError("포인트 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        setError("네트워크 오류가 발생했습니다.");
      }
    };

    fetchUserPoints();
  }, []);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      setPointUsed(0);
      setError("");
      return;
    }

    // 보유 포인트를 초과하면 에러 메시지와 최대 포인트로 변경
    if (numericValue > totalAvailablePoints) {
      setError("보유 포인트를 초과하여 사용할 수 없습니다.");
      setPointUsed(totalAvailablePoints);
    } else {
      setError("");
      setPointUsed(numericValue);
    }
  };

  const handleApplyPoints = () => {
    setPointUsed(totalAvailablePoints);
    setError("");
  };

  return (
    <SectionWrapper>
      <SectionTitle>포인트</SectionTitle>
      <PointInputWrapper>
        <PointInput
          type="text"
          value={pointUsed.toString()}
          onChange={handlePointChange}
          placeholder="0"
        />
        <ApplyButton onClick={handleApplyPoints}>전액사용</ApplyButton>
      </PointInputWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TotalPointWrapper>
        <span>보유 포인트</span>
        <TotalPoint>{totalAvailablePoints.toLocaleString()}원</TotalPoint>
      </TotalPointWrapper>
    </SectionWrapper>
  );
};

export default PurchasePointSection;
