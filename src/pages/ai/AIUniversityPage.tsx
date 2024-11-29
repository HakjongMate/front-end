import React, { useContext } from 'react';
import styled from 'styled-components';
import StepIndicator from '../../components/ai/StepIndicator';
import UniversityEditCard from '../../components/ai/UniversityEditCard';
import ButtonContainer from '../../components/ai/ButtonContainer';
import UniversityEditModal from '../../components/ai/UniversityEditModal';
import useUniversityChoices from '../../hooks/useUniversityChoices';
import AIContext from '../../contexts/AIContext';
import departmentData from '../../assets/data/department.json';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 300px);
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

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    white-space: pre-wrap;
    line-height: 1.5;
    margin-bottom: 0px;
  }
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    white-space: pre-wrap;
    line-height: 1.5;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #666;
  text-align: left;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 20px;
    white-space: pre-wrap;
    line-height: 1.5;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 5%;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const AIUniversityPage: React.FC = () => {
  const { choices, saveChoice, loading } = useUniversityChoices();
  const { setIsNaturalSciences } = useContext(AIContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const navigate = useNavigate();

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleSave = (name: string, major: string) => {
    if (selectedIndex !== null) {
      saveChoice(selectedIndex + 1, name, major);
      setModalVisible(false);
    }
  };

  const handleNext = () => {
    const firstChoice = choices[0];

    // 1지망 대학 및 학과 정보로 자연계열 여부 확인
    if (firstChoice.name && firstChoice.major) {
      const selectedSchool = departmentData.find(
        (school) => school.school === firstChoice.name
      );

      const selectedDept = selectedSchool?.departments.find(
        (dept) => dept.department === firstChoice.major
      );

      // 자연계열 여부를 AIContext에 저장
      setIsNaturalSciences(!!selectedDept?.is_natural_sciences);
    }

    navigate('/ai/pass');
  };

  const handleBack = () => {
    navigate('/ai/subject');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <PageWrapper>
      <StepIndicator currentStep={2} />
      <Title>목표하는 대학과 학과를 {'\n'} 입력해주세요</Title>
      <Subtitle>희망하는 대학과 학과에 맞는 {'\n'} 맞춤형 세특 주제를 생성할 수 있습니다.</Subtitle>
      <Divider />
      <Description>주제 추천 시 1지망 대학과 학과가 반영됩니다.</Description>

      <CardContainer>
        {choices.map((choice, index) => (
          <div key={index}>
            <UniversityEditCard
              choice={`${index + 1}`}
              universityName={choice.name || ''}
              major={choice.major || ''}
              color={choice.color}
              setModalVisible={() => openModal(index)}
            />
          </div>
        ))}
      </CardContainer>

      <ButtonContainer onPreviousClick={handleBack} onNextClick={handleNext} />

      {selectedIndex !== null && (
        <UniversityEditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          university={choices[selectedIndex].name || ''}
          major={choices[selectedIndex].major || ''}
          onSave={handleSave}
        />
      )}
    </PageWrapper>
  );
};

export default AIUniversityPage;
