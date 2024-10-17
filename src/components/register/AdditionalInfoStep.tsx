import React from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AdditionalInfoStepProps {
  formData: {
    school: string;
    grade: string;
    gpa: string;
    customGpa: string;
    career: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  margin-bottom: 20px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #202594;
    box-shadow: 0 0 0 3px rgba(32, 37, 148, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  margin-bottom: 20px;
  outline: none;
  width: 100%;
  appearance: none;

  &:focus {
    border-color: #202594;
    box-shadow: 0 0 0 3px rgba(32, 37, 148, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const SelectIcon = styled(ArrowDropDownIcon)`
  position: absolute;
  top: 30%;
  right: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #202594;

  @media (max-width: 768px) {
    right: 12px;
  }

  @media (max-width: 480px) {
    right: 10px;
  }
`;

const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <Label htmlFor="school">학교명</Label>
      <Input
        id="school"
        type="text"
        name="school"
        value={formData.school}
        onChange={handleChange}
        placeholder="현재 재학중인 학교명을 입력해주세요"
        required
      />
      <Label htmlFor="grade">학년</Label>
      <SelectWrapper>
        <Select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        >
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
        </Select>
        <SelectIcon />
      </SelectWrapper>
      <Label htmlFor="gpa">내신</Label>
      <SelectWrapper>
        <Select
          id="gpa"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          required
        >
          <option value="">내신을 선택해주세요</option>
          {[...Array(9)].map((_, i) => (
            <option key={i} value={(i * 0.5 + 1).toFixed(1)}>
              {(i * 0.5 + 1).toFixed(1)}
            </option>
          ))}
          <option value="custom">직접 입력</option>
        </Select>
        <SelectIcon />
      </SelectWrapper>
      {formData.gpa === 'custom' && (
        <Input
          type="number"
          name="customGpa"
          value={formData.customGpa}
          onChange={handleChange}
          placeholder="내신을 입력해주세요. ex) 1.4와 같이 대략적인 숫자로 적어주세요."
          min="1.0"
          max="5.0"
          step="0.1"
          required
        />
      )}
      <Label htmlFor="career">희망진로</Label>
      <Input
        id="career"
        type="text"
        name="career"
        value={formData.career}
        onChange={handleChange}
        placeholder="희망 진로를 적어주세요 ex) 교사, 경영자 등"
        required
      />
    </>
  );
};

export default AdditionalInfoStep;
