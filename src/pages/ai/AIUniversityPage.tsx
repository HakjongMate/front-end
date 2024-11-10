import React, { useState, useContext } from 'react';
import AIContext from '../../contexts/AIContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UniversityEditCard from '../../components/ai/UniversityEditCard';
import UniversityEditModal from '../../components/ai/UniversityEditModal';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';

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
  const { targetUniversities, setTargetUniversities } = useContext(AIContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const navigate = useNavigate();
  
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleNext = () => {
    navigate('/ai/exploration');
  };

  const handleBack = () => {
    navigate('/ai/subject');
  };

  const saveUniversity = (name: string, major: string) => {
    if (selectedIndex !== null) {
      const updatedUniversities = [...targetUniversities];
      updatedUniversities[selectedIndex] = { name, major };
      setTargetUniversities(updatedUniversities);
    }
    setModalVisible(false);
  };

  return (
    <PageWrapper>
      <StepIndicator currentStep={2} />
      <Title>목표하는 대학과 학과를 {'\n'} 입력해주세요</Title>
      <Subtitle>희망하는 대학과 학과에 맞는 {'\n'} 맞춤형 세특 주제를 생성할 수 있습니다.</Subtitle>
      <Divider />
      <Description>주제 추천시 1지망 대학과 학과가 반영됩니다.</Description>

      <CardContainer>
        {targetUniversities.map((choice, index) => (
          <div key={index}>
            <UniversityEditCard
              choice={`${index + 1}`}
              universityName={choice.name || ''}
              major={choice.major || ''}
              color={['#202594', '#0F4ABE', '#6E95DF'][index]}
              setModalVisible={() => openModal(index)}
            />
          </div>
        ))}
      </CardContainer>

      <ButtonContainer
        onPreviousClick={handleBack}
        onNextClick={handleNext}
      />

      {selectedIndex !== null && (
        <UniversityEditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          university={targetUniversities[selectedIndex].name}
          major={targetUniversities[selectedIndex].major}
          onSave={saveUniversity}
        />
      )}
    </PageWrapper>
  );
};

export default AIUniversityPage;
