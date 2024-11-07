import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SubjectSelectModal from '../../components/ai/SubjectSelectModal';
import subjectData from '../../assets/data/subject.json';

const PageWrapper = styled.div`
  max-width: 1080px;
  min-height: 70vh;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const PageType = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
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

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #000;
  margin-bottom: 20px;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: #fff;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ExplorationAddPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    // 선택한 과목과 일치하는 subjectId 찾기
    const selectedSubject = subjectData
      .flatMap((category) => category.details)
      .find((sub) => sub.detail === subject);
    const subjectId = selectedSubject ? selectedSubject.id : null;

    if (!subjectId) {
      console.error("선택된 과목의 ID를 찾을 수 없습니다.");
      return;
    }

    const data = {
      subjectId,
      title,
      contents: description,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interest/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("관심사 생성에 실패했습니다.");
      }

      const result = await response.json();
      console.log("성공:", result);
      navigate(-1);
    } catch (error) {
      console.error("에러:", error);
    }
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
        <Tag backgroundColor="#0F4ABE" color="#FFF">새 관심사</Tag>
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
