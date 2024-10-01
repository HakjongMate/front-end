import React, { createContext, useState, ReactNode } from "react";

// AI 관련 데이터를 담을 타입 정의
interface AIContextProps {
  selectedSubject: string;
  dream: string;
  targetUniversities: { name: string; major: string }[];
  selectedPass: number | null;
  setSelectedSubject: (subject: string) => void;
  setDream: (dream: string) => void;
  setTargetUniversities: (universities: { name: string; major: string }[]) => void;
  setSelectedPass: (passId: number) => void;
}

// 기본값 설정
const AIContext = createContext<AIContextProps>({
  selectedSubject: "",
  dream: "",
  targetUniversities: [{ name: "", major: "" }, { name: "", major: "" }, { name: "", major: "" }],
  selectedPass: null,
  setSelectedSubject: () => {},
  setDream: () => {},
  setTargetUniversities: () => {},
  setSelectedPass: () => {},
});

// Provider 컴포넌트
export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [dream, setDream] = useState<string>("");
  const [targetUniversities, setTargetUniversities] = useState([
    { name: "", major: "" },
    { name: "", major: "" },
    { name: "", major: "" },
  ]);
  const [selectedPass, setSelectedPass] = useState<number | null>(null);

  return (
    <AIContext.Provider
      value={{
        selectedSubject,
        dream,
        targetUniversities,
        selectedPass,
        setSelectedSubject,
        setDream,
        setTargetUniversities,
        setSelectedPass,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIContext;
