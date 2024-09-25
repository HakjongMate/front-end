import React, { useState } from 'react';
import styled from 'styled-components';
import UniversityEditCard from '../../components/ai/UniversityEditCard';
import UniversityEditModal from '../../components/ai/UniversityEditModal';
import StepIndicator from '../../components/ai/StepIndicator';
import ButtonContainer from '../../components/ai/ButtonContainer';

const PageWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  text-align: center;
  margin-bottom: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 5%;
`;

const AIUniversityPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // 플레이스 홀더 대학교 선택
  const [targetUniversities, setTargetUniversities] = useState([
    { name: '서울대학교', major: '컴퓨터공학과' },
    { name: '', major: '' },
    { name: '', major: '' },
  ]);
  
  // 대학교 정보를 수정을 위한 모달
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleNext = () => {
    console.log('Next Step Clicked');
  };

  const handleBack = () => {
    console.log('Back Step Clicked');
  };

  // 대학교 정보 저장 후 모달 닫기
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
