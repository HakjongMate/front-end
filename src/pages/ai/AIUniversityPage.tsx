import React, { useState } from 'react';
import styled from 'styled-components';
import UniversityEditCard from '../../components/ai/UniversityEditCard';
import UniversityEditModal from '../../components/ai/UniversityEditModal';
import universitiesData from '../../assets/data/universities.json'; // Path to the universities.json
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AIUniversityPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Placeholder for universities selected
  const [targetUniversities, setTargetUniversities] = useState([
    { name: '서울대학교', major: '컴퓨터공학과' },
    { name: '', major: '' },
    { name: '', major: '' },
  ]);
  
  // Open the modal to edit a university
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleNext = () => {
    console.log('Next Step Clicked');
    // Handle the next step navigation
  };

  const handleBack = () => {
    console.log('Back Step Clicked');
    // Handle the back step navigation
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
      <Title>목표하는 대학과 학과를 입력해주세요</Title>
      <Subtitle>희망하는 대학과 학과에 맞는 맞춤형 주제를 생성할 수 있습니다.</Subtitle>

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
        onPreviousClick={handleNext}
        onNextClick={handleBack}
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
