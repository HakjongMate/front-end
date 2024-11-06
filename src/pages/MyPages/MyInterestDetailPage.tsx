import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import subjectData from '../../assets/data/subject.json';
import { Interest } from '../../types';

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

const SubjectInfo = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
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

const Content = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #000;
  margin-bottom: 20px;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const MyInterestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [interest, setInterest] = useState<Interest | null>(null);
  const [subjectInfo, setSubjectInfo] = useState({ area: '', detail: '' });

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interest/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInterest(data.data);

          const subject = subjectData.find((subject) =>
            subject.details.some((detail) => detail.id === data.data.subjectId)
          );
          if (subject) {
            const detail = subject.details.find((d) => d.id === data.data.subjectId);
            setSubjectInfo({ area: subject.area, detail: detail?.detail || '' });
          }
        } else {
          console.error("관심사 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchInterest();
  }, [id]);

  if (!interest) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <PageType>관심사</PageType>
      <SubjectInfo>{subjectInfo.area} - {subjectInfo.detail}</SubjectInfo>
      <Divider />
      <Title>{interest.title}</Title>
      <TagContainer>
        <Tag backgroundColor="#0F4ABE" color="#FFF">최근 관심사</Tag>
      </TagContainer>

      <ContentSection>
        <SectionTitle>관심사 설명</SectionTitle>
        <Content>{interest.contents}</Content>
      </ContentSection>
    </PageWrapper>
  );
};

export default MyInterestDetailPage;
