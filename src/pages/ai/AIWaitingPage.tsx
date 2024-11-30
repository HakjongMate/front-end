import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import StepIndicator from "../../components/ai/StepIndicator";
import HakjongMateBlue from "../../assets/icons/HakjongMate_Blue.png";
import waitingMessages from "../../assets/data/waiting.json";
import { useNavigate } from "react-router-dom";
import AIContext from "../../contexts/AIContext";

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const Image = styled.img`
  width: 130px;
  height: 150px;
  margin: 50px auto 30px;

  @media (max-width: 768px) {
    width: 110px;
    height: 130px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 110px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
    white-space: pre-line;
    line-height: 1.5;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666666;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const WaitingMessage = styled.p`
  font-size: 14px;
  color: #666666;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const AIWaitingPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState("");
  const navigate = useNavigate();
  const {
    selectedSubjectId,
    selectedPass,
    selectedTitles,
  } = useContext(AIContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.realName || "사용자");
    }
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % waitingMessages.length);
      setDots("");
    }, 1500);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  const generateExploration = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          subjectId: selectedSubjectId, // 선택된 과목 ID
          keyword: selectedTitles.join(", "), // 선택된 관심사 및 탐구 제목
          passId: selectedPass, // 선택된 패스 ID
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "탐구 생성 중 오류가 발생했습니다.");
      }

      const result = await response.json();
      // 탐구 상세 페이지로 이동
      navigate(`/my/exploration/detail/${result.id}`);
    } catch (error) {
      console.error("탐구 생성 중 오류:", error);
      alert(error instanceof Error ? error.message : "탐구 생성 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (selectedSubjectId && selectedPass) {
      generateExploration();
    } else {
      alert("필수 정보가 누락되었습니다. 다시 확인해주세요.");
      navigate("/ai/subject");
    }
  }, [selectedSubjectId, selectedPass, selectedTitles, navigate]);

  return (
    <PageWrapper>
      <StepIndicator currentStep={5} />
      <Image src={HakjongMateBlue} alt="HakjongMate Logo" />
      <Title>AI가 {username}님을 위한 {"\n"}맞춤형 주제를 생성 중입니다.</Title>
      <Subtitle>약 3분 ~ 5분 정도의 시간이 소요됩니다.</Subtitle>
      <WaitingMessage>
        {waitingMessages[messageIndex]}
        {dots}
      </WaitingMessage>
    </PageWrapper>
  );
};

export default AIWaitingPage;
