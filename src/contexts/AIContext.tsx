import React, { createContext, useState, ReactNode } from "react";

interface AIContextProps {
  selectedSubject: string;
  dream: string;
  targetUniversities: { name: string; major: string }[];
  selectedPass: number | null;
  isNaturalSciences: boolean;
  setSelectedSubject: (subject: string) => void;
  setDream: (dream: string) => void;
  setTargetUniversities: (universities: { name: string; major: string }[]) => void;
  setSelectedPass: (passId: number) => void;
  setIsNaturalSciences: (isNatural: boolean) => void;
}

const AIContext = createContext<AIContextProps>({
  selectedSubject: "",
  dream: "",
  targetUniversities: [{ name: "", major: "" }, { name: "", major: "" }, { name: "", major: "" }],
  selectedPass: null,
  isNaturalSciences: false,
  setSelectedSubject: () => {},
  setDream: () => {},
  setTargetUniversities: () => {},
  setSelectedPass: () => {},
  setIsNaturalSciences: () => {},
});

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [dream, setDream] = useState<string>("");
  const [targetUniversities, setTargetUniversities] = useState([
    { name: "", major: "" },
    { name: "", major: "" },
    { name: "", major: "" },
  ]);
  const [selectedPass, setSelectedPass] = useState<number | null>(null);
  const [isNaturalSciences, setIsNaturalSciences] = useState<boolean>(false);

  return (
    <AIContext.Provider
      value={{
        selectedSubject,
        dream,
        targetUniversities,
        selectedPass,
        isNaturalSciences,
        setSelectedSubject,
        setDream,
        setTargetUniversities,
        setSelectedPass,
        setIsNaturalSciences,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIContext;
