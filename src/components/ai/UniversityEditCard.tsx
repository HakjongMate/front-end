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
`;

const ChoiceText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;
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
`;

const TextContainer = styled.div`
  margin-left: 20px;
  flex: 1;
`;

const UniversityName = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Major = styled.p`
  font-size: 18px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
`;

const NavButtonImage = styled.img`
  width: 10px;
  height: 20px;
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
            <img src={Arrow} alt="arrow icon" style={{ width: '50px', height: '50px' }} />
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
