import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { InputField, TextAreaField, CheckboxField, SubmitButton } from './FormElements';

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
`;

type FormData = {
  name: string;
  phone: string;
  content: string;
};

const ApplyForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    content: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsAgreed((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 리로딩 방지
    e.preventDefault();
  
    // 연락처 유효성 검사를 위한 정규표현식
    const phoneRegex = /^(?:\d{3}-\d{4}-\d{4}|\d{11})$/;

    // 사용자가 입력한 정보 유효성 검사
    if (!formData.name) {
      alert("성함을 입력해주세요.");
      return;
    }
    if (!formData.phone) {
      alert("연락처를 입력해주세요.");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("올바른 연락처 형식을 입력해주세요. 예: 000-0000-0000 또는 00000000000");
      return;
    }
    if (!formData.content) {
      alert("상담내용을 입력해주세요.");
      return;
    }
    if (!isAgreed) {
      alert("개인정보 수집 내용에 동의해주세요.");
      return;
    }

    // EmailJS를 사용하여 사용자가 신청한 상담 내용을 관리자에게 전송
    // EmailJS 설정은 https://www.emailjs.com/ 참고
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID!,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
      form.current!,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
    )
      .then((result) => {
          toast.success("신청이 완료되었습니다.", {
            style: {
              maxWidth: "1000px",
              width: "300px",
              fontSize: "20px",
            },
          });
      }, (error) => {
          console.log(error.text);
          toast.error("신청에 실패하였습니다. 다시 시도해 주세요.", {
            style: {
              maxWidth: "1000px",
              width: "300px",
              fontSize: "20px",
            },
          });
      });

    // 신청 완료 후 입력된 데이터 초기화
    setFormData({ name: "", phone: "", content: "" });
    setIsAgreed(false);
  };

  return (
    <FormContainer ref={form} onSubmit={handleSubmit}>
      <InputField
        label="성함"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="고객님의 성함을 적어주세요."
      />
      <InputField
        label="연락처"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="고객님의 연락처를 적어주세요."
      />
      <TextAreaField
        label="상담내용"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="원하시는 상담의 내용을 입력해주세요"
      />
      <CheckboxField isChecked={isAgreed} onChange={handleCheckboxChange} />
      <SubmitButton />
      <Toaster />
    </FormContainer>
  );
}

export default ApplyForm;
