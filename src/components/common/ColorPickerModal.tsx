import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ColorPair = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorCircle = styled.button<{ bgColor: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  border: none;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  background-color: #202594;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const colors = [
  ['#f44336', '#ffcdd2'], ['#e91e63', '#f8bbd0'], ['#9c27b0', '#e1bee7'], 
  ['#673ab7', '#d1c4e9'], ['#3f51b5', '#c5cae9'], ['#2196f3', '#bbdefb'], 
  ['#03a9f4', '#b3e5fc'], ['#00bcd4', '#b2ebf2'], ['#009688', '#b2dfdb'], 
  ['#4caf50', '#c8e6c9'], ['#8bc34a', '#dcedc8'], ['#cddc39', '#f0f4c3'],
  ['#ffeb3b', '#fff9c4'], ['#ffc107', '#ffecb3'], ['#ff9800', '#ffe0b2'], 
  ['#ff5722', '#ffccbc'], ['#795548', '#d7ccc8'], ['#607d8b', '#cfd8dc'], 
  ['#000000', '#9e9e9e'], ['#ffffff', '#f1f1f1'],
];

interface ColorPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ 
  visible, 
  onClose, 
  onSelectColor 
}) => {
  if (!visible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>프로필 색상을 선택해주세요</ModalTitle>
        <ColorContainer>
          {colors.map(([darkColor, lightColor], index) => (
            <ColorPair key={index}>
              <ColorCircle
                bgColor={darkColor}
                onClick={() => onSelectColor(darkColor)}
              />
              <ColorCircle
                bgColor={lightColor}
                onClick={() => onSelectColor(lightColor)}
              />
            </ColorPair>
          ))}
        </ColorContainer>
        <CloseButton onClick={onClose}>저장</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ColorPickerModal;