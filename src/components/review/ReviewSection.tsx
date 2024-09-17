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

const ArrowButton = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  background-color: #f6f7fc;
  color: #000;
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

  // 현재 페이지 관리
  const [currentPage, setCurrentPage] = useState(1);
  // 5단위 페이지 그룹 관리
  const [pageGroup, setPageGroup] = useState(0);

  // 페이지당 리뷰 수
  const reviewsPerPage = 5;
  // 페이지당 표시할 페이지 번호의 수 (5개)
  const pagesPerGroup = 5;

  // 현재 페이지에 해당하는 리뷰만 가져오기
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // 현재 페이지 그룹에서 보여줄 페이지 번호들 (5개씩)
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  // 다음 그룹으로 이동
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setPageGroup((prevGroup) => prevGroup + 1);
      setCurrentPage(startPage + pagesPerGroup);
    }
  };

  // 이전 그룹으로 이동
  const handlePreviousGroup = () => {
    if (startPage > 1) {
      setPageGroup((prevGroup) => prevGroup - 1);
      setCurrentPage(startPage - pagesPerGroup);
    }
  };

  return (
    <ReviewSectionContainer>
      <SectionTitle>서비스 별 더 많은 후기를 만나보세요</SectionTitle>
      <ReviewList>
        {currentReviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </ReviewList>

      <Pagination>
        {/* 이전 그룹 버튼 (1보다 큰 페이지 그룹에서만 표시) */}
        {startPage > 1 && (
          <ArrowButton onClick={handlePreviousGroup}>{"<"}</ArrowButton>
        )}

        {/* 페이지 번호 버튼 */}
        {pageNumbers.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            active={currentPage === pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}

        {/* 다음 그룹 버튼 (마지막 페이지 그룹이 아닌 경우에만 표시) */}
        {endPage < totalPages && (
          <ArrowButton onClick={handleNextGroup}>{">"}</ArrowButton>
        )}
      </Pagination>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
