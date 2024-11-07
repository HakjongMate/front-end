import React from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ExplorationSelectCardProps {
  id: string;
  title: string;
  contents: string;
  state: string;
  ai: boolean;
  selected: boolean;
  onSelect: () => void;
}

const Card = styled.div<{ selected: boolean }>`
  width: calc(100% - 40px);
  background-color: #ffffff;
  border-radius: 20px;
  padding: 15px 20px;
  margin: 10px 0;
  border: ${(props) => (props.selected ? '2px solid #202594' : '1px solid #cecece')};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-family: 'Pretendard-Bold';
  font-size: 18px;
  color: #000;
  margin: 0;
  flex: 1;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TagWrapper = styled.div<{ bgColor?: string }>`
  border-radius: 15px;
  background-color: ${(props) => props.bgColor || '#28A745'};
  margin-right: 7px;
  padding: 5px 12px;
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 14px;
`;

const Contents = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  color: #000;
  line-height: 20px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Icon = styled(CheckCircleIcon)`
  color: #202594;
  font-size: 24px;
  margin-left: 10px;
`;

const getStateText = (state: string) => {
  switch (state) {
    case 'NOT_STARTED':
      return '탐구 진행 전';
    case 'IN_PROGRESS':
      return '탐구 진행 중';
    case 'COMPLETED':
      return '탐구 완료';
    default:
      return '알 수 없음';
  }
};

const ExplorationSelectCard: React.FC<ExplorationSelectCardProps> = ({
  title,
  contents,
  state,
  ai,
  selected,
  onSelect,
}) => {
  return (
    <Card selected={selected} onClick={onSelect}>
      <Header>
        <Title>{title}</Title>
        {selected && <Icon />}
      </Header>
      <TagContainer>
        {ai && <TagWrapper bgColor="#FFC107">AI 추천</TagWrapper>}
        <TagWrapper>{getStateText(state)}</TagWrapper>
      </TagContainer>
      <Contents>{contents}</Contents>
    </Card>
  );
};

export default ExplorationSelectCard;
