import React, { useState } from "react";
import styled from "styled-components";
import ReviewComponent from "./ReviewComponent";
import ReviewJson from "../../assets/data/review.json";

interface Review {
  id: number;
  rating: number;
  type: string;
  image: string;
  author: string;
  date: string;
  content: string;
}

const ReviewSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  background-color: #fff;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin-bottom: 30px;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  background-color: ${({ active }) => (active ? "#202594" : "#f6f7fc")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #202594;
    color: #fff;
  }
`;

const ReviewSection: React.FC = () => {
  const reviews: Review[] = ReviewJson;

  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 리뷰 수
  const reviewsPerPage = 5;

  // 현재 페이지에 해당하는 리뷰만 가져오기
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <ReviewSectionContainer>
      <SectionTitle>서비스 별 더 많은 후기를 만나보세요</SectionTitle>
      <ReviewList>
        {currentReviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </ReviewList>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => paginate(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
