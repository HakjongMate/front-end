import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search, X } from "lucide-react";
import departmentData from "../../assets/data/department.json";
import { filterKoreanItems } from "../../utils/koreanSearch";

interface UniversityEditModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  university: string;
  major: string;
  onSave: (name: string, major: string) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 460px;
  max-width: 90vw;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 90%;
    padding: 25px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 20px;
  }
`;

const ModalHeader = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #202020;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  
  &:hover {
    color: #111827;
  }
  
  &:disabled {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px;
  padding-right: ${props => props.value ? '40px' : '12px'};
  border-radius: 10px;
  border: 1.5px solid #E5E7EB;
  font-size: 15px;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #202594;
    box-shadow: 0 0 0 2px rgba(32, 37, 148, 0.1);
  }

  &:disabled {
    background-color: #F3F4F6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
`;

const DropdownList = styled.ul<{ show: boolean }>`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #F3F4F6;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 4px;
  }
`;

const DropdownItem = styled.li<{ selected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#F3F4F6' : 'white'};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.selected ? '#E5E7EB' : '#F9FAFB'};
  }

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  width: 100%;

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  
  @media (max-width: 480px) {
    padding: 10px 20px;
  }
`;

const CancelButton = styled(Button)`
  background-color: #F3F4F6;
  color: #4B5563;
  
  &:hover {
    background-color: #E5E7EB;
  }
`;

const SaveButton = styled(Button)`
  background-color: #202594;
  color: white;

  &:hover {
    background-color: #181d75;
  }
`;

const UniversityEditModal: React.FC<UniversityEditModalProps> = ({
  modalVisible,
  setModalVisible,
  university,
  major,
  onSave,
}) => {
  const [universities, setUniversities] = useState<{ name: string; majors: string[] }[]>([]);
  const [universityName, setUniversityName] = useState(university);
  const [majorName, setMajorName] = useState(major);
  
  const [universitySearch, setUniversitySearch] = useState(university);
  const [majorSearch, setMajorSearch] = useState(major);
  
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);

  useEffect(() => {
    const transformedData = departmentData.map((item: any) => ({
      name: item.school,
      majors: item.departments.map((dept: any) => dept.department),
    }));
    setUniversities(transformedData);
  }, []);

  useEffect(() => {
    setUniversityName(university);
    setMajorName(major);
    setUniversitySearch(university);
    setMajorSearch(major);
  }, [university, major, modalVisible]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      setShowUniversityDropdown(false);
      setShowMajorDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUniversityChange = (selectedUniversity: string) => {
    setUniversityName(selectedUniversity);
    setUniversitySearch(selectedUniversity);
    setMajorName("");
    setMajorSearch("");
    setShowUniversityDropdown(false);
  };

  const handleMajorChange = (selectedMajor: string) => {
    setMajorName(selectedMajor);
    setMajorSearch(selectedMajor);
    setShowMajorDropdown(false);
  };

  const handleClearUniversity = () => {
    setUniversitySearch('');
    setUniversityName('');
    setMajorName('');
    setMajorSearch('');
    setShowUniversityDropdown(true);
  };

  const handleClearMajor = () => {
    setMajorSearch('');
    setMajorName('');
    setShowMajorDropdown(true);
  };

  const handleSave = () => {
    if (!universityName || !majorName) {
      alert('대학교와 학과를 모두 선택해주세요.');
      return;
    }
    onSave(universityName, majorName);
    setModalVisible(false);
  };

  const filteredUniversities = filterKoreanItems(
    universities,
    universitySearch,
    'name'
  );

  const currentUniversity = universities.find((uni) => uni.name === universityName);
  const majorOptions = currentUniversity?.majors || [];
  const filteredMajors = filterKoreanItems(majorOptions, majorSearch);

  return modalVisible ? (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>대학교와 학과 입력</ModalHeader>
        <ModalBody>
          <InputGroup className="dropdown-container">
            <Label>대학교명</Label>
            <SearchContainer>
              <SearchIcon>
                <Search size={18} />
              </SearchIcon>
              <SearchInput
                value={universitySearch}
                onChange={(e) => {
                  setUniversitySearch(e.target.value);
                  setShowUniversityDropdown(true);
                }}
                placeholder="대학교를 검색하세요 (초성 검색 가능)"
                onFocus={() => setShowUniversityDropdown(true)}
              />
              <ClearButton
                onClick={handleClearUniversity}
                disabled={!universitySearch}
                type="button"
                aria-label="Clear university search"
              >
                <X size={16} />
              </ClearButton>
              <DropdownList show={showUniversityDropdown}>
                {filteredUniversities.map((uni) => (
                  <DropdownItem
                    key={uni.name}
                    selected={uni.name === universityName}
                    onClick={() => handleUniversityChange(uni.name)}
                  >
                    {uni.name}
                  </DropdownItem>
                ))}
                {filteredUniversities.length === 0 && (
                  <DropdownItem selected={false}>
                    검색 결과가 없습니다
                  </DropdownItem>
                )}
              </DropdownList>
            </SearchContainer>
          </InputGroup>

          <InputGroup className="dropdown-container">
            <Label>학과명</Label>
            <SearchContainer>
              <SearchIcon>
                <Search size={18} />
              </SearchIcon>
              <SearchInput
                value={majorSearch}
                onChange={(e) => {
                  setMajorSearch(e.target.value);
                  setShowMajorDropdown(true);
                }}
                placeholder="학과를 검색하세요 (초성 검색 가능)"
                onFocus={() => setShowMajorDropdown(true)}
                disabled={!universityName}
              />
              <ClearButton
                onClick={handleClearMajor}
                disabled={!majorSearch}
                type="button"
                aria-label="Clear major search"
              >
                <X size={16} />
              </ClearButton>
              <DropdownList show={showMajorDropdown && !!universityName}>
                {filteredMajors.map((major) => (
                  <DropdownItem
                    key={major}
                    selected={major === majorName}
                    onClick={() => handleMajorChange(major)}
                  >
                    {major}
                  </DropdownItem>
                ))}
                {filteredMajors.length === 0 && (
                  <DropdownItem selected={false}>
                    검색 결과가 없습니다
                  </DropdownItem>
                )}
              </DropdownList>
            </SearchContainer>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={() => setModalVisible(false)}>
            취소
          </CancelButton>
          <SaveButton onClick={handleSave}>
            저장
          </SaveButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default UniversityEditModal;