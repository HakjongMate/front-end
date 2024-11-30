import React, { createContext, useState, ReactNode } from "react";

interface AIContextProps {
  selectedSubjectId: number | null;
  selectedSubject: string;
  dream: string;
  targetUniversities: { name: string; major: string }[];
  selectedPass: number | null;
  isNaturalSciences: boolean;
  selectedTitles: string[];
  setSelectedSubjectId: (subjectId: number | null) => void;
  setSelectedSubject: (subject: string) => void;
  setDream: (dream: string) => void;
  setTargetUniversities: (universities: { name: string; major: string }[]) => void;
  setSelectedPass: (passId: number) => void;
  setIsNaturalSciences: (isNatural: boolean) => void;
  setSelectedTitles: (titles: string[]) => void;
}

const AIContext = createContext<AIContextProps>({
  selectedSubjectId: null,
  selectedSubject: "",
  dream: "",
  targetUniversities: [
    { name: "", major: "" },
    { name: "", major: "" },
    { name: "", major: "" },
  ],
  selectedPass: null,
  isNaturalSciences: false,
  selectedTitles: [],
  setSelectedSubjectId: () => {},
  setSelectedSubject: () => {},
  setDream: () => {},
  setTargetUniversities: () => {},
  setSelectedPass: () => {},
  setIsNaturalSciences: () => {},
  setSelectedTitles: () => {},
});

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [dream, setDream] = useState<string>("");
  const [targetUniversities, setTargetUniversities] = useState([
    { name: "", major: "" },
    { name: "", major: "" },
    { name: "", major: "" },
  ]);
  const [selectedPass, setSelectedPass] = useState<number | null>(null);
  const [isNaturalSciences, setIsNaturalSciences] = useState<boolean>(false);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  return (
    <AIContext.Provider
      value={{
        selectedSubjectId,
        selectedSubject,
        dream,
        targetUniversities,
        selectedPass,
        isNaturalSciences,
        selectedTitles,
        setSelectedSubjectId,
        setSelectedSubject,
        setDream,
        setTargetUniversities,
        setSelectedPass,
        setIsNaturalSciences,
        setSelectedTitles,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIContext;
