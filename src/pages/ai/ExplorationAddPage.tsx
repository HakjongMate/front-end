import React, { useState } from 'react';
import styled from 'styled-components';
import SubjectSelectModal from '../../components/ai/SubjectSelectModal';

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: 70vh;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageType = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
`;

const Tag = styled.span<{ backgroundColor: string; color: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 400;
  padding: 8px 15px;
  border-radius: 15px;
`;

const ContentSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #000;
  margin-bottom: 20px;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  resize: none;
  background-color: #fff;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #202594;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0009bd;
  }
`;

const ExplorationAddPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ subject, title, description });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubjectSave = (selectedSubject: string) => {
    setSubject(selectedSubject);
    closeModal();
  };

  return (
    <PageWrapper>
      <PageType>관심사 추가</PageType>
      <Divider />
      <TagContainer>
        <Tag backgroundColor="#0F4ABE" color="#FFF">
          새 관심사
        </Tag>
      </TagContainer>
      <form onSubmit={handleSubmit}>
        <ContentSection>
          <SectionTitle>과목</SectionTitle>
          <Content>
            <Button type="button" onClick={openModal}>
              {subject || '과목 선택'}
            </Button>
          </Content>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>제목</SectionTitle>
          <Content>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="관심사의 제목을 입력하세요"
              required
            />
          </Content>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>관심사 설명</SectionTitle>
          <Content>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="관심사에 대한 설명을 입력하세요"
              required
            />
          </Content>
        </ContentSection>
        
        <ButtonContainer>
          <Button type="submit">저장하기</Button>
        </ButtonContainer>
      </form>
      <SubjectSelectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSubjectSave}
      />
    </PageWrapper>
  );
};

export default ExplorationAddPage;