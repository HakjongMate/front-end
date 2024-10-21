import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/icons/arrow.png';
import RightArrow from '../../assets/icons/RightArrow.png';
import universities from '../../assets/data/universities.json';

interface UniversityEditCardProps {
  choice: string;
  universityName: string;
  major: string;
  color: string;
  setModalVisible: () => void;
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 15px 30px;
  border: 1px solid #cecece;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
  }
`;

const Header = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 70px;
  height: 35px;
  border-radius: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 60px;
    height: 30px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 25px;
    margin-right: 7px;
  }
`;

const ChoiceText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Icon = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const PlaceholderCircle = styled.div<{ color: string }>`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const ArrowIcon = styled.img`
  width: 50px;
  height: 50px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const TextContainer = styled.div`
  margin-left: 20px;
  flex: 1;

  @media (max-width: 768px) {
    margin-left: 15px;
  }

  @media (max-width: 480px) {
    margin-left: 5px;
  }
`;

const UniversityName = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Major = styled.p`
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: 10px;

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const NavButtonImage = styled.img`
  width: 10px;
  height: 20px;

  @media (max-width: 480px) {
    width: 8px;
    height: 16px;
  }
`;

const UniversityEditCard: React.FC<UniversityEditCardProps> = ({
  choice,
  universityName,
  major,
  color,
  setModalVisible,
}) => {
  // 대학교명을 입력받아 대학교 아이콘을 반환하는 함수
  const getUniversityIcon = (name: string) => {
    const university = universities.find((uni) => uni.name === name.trim());
    return university ? university.icon : null;
  };

  const iconSrc = getUniversityIcon(universityName);

  return (
    <Card>
      <Header color={color}>
        <ChoiceText>{choice}지망</ChoiceText>
      </Header>
      <ContentContainer>
        {iconSrc ? (
          <Icon src={iconSrc} alt={universityName} />
        ) : (
          <PlaceholderCircle color={color}>
            <ArrowIcon src={Arrow} alt="arrow icon" />
          </PlaceholderCircle>
        )}
        <TextContainer>
          <UniversityName>{universityName || '목표하는 대학명과 '}</UniversityName>
          <Major>{major || '학과를 입력해주세요'}</Major>
        </TextContainer>
      </ContentContainer>

      <NavButton onClick={setModalVisible}>
        <NavButtonImage src={RightArrow} alt="arrow" />
      </NavButton>
    </Card>
  );
};

export default UniversityEditCard;
