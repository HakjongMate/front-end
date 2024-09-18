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
  padding: 20px 0 50px;
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: ${({ active }) => (active ? "#202594" : "#f6f7fc")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: #202594;
    color: #fff;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
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

  // 현재 페이지 및 필터 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [filterType, setFilterType] = useState<string | null>(null);

  // 페이지당 리뷰 수
  const reviewsPerPage = 5;
  // 페이지당 표시할 페이지 번호의 수 (5개)
  const pagesPerGroup = 5;

  // 필터링된 리뷰 데이터
  const filteredReviews = filterType
    ? reviews.filter((review) => review.type === filterType)
    : reviews;

  // 현재 페이지에 해당하는 리뷰만 가져오기
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

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

  // 필터링 함수
  const handleFilter = (type: string | null) => {
    setFilterType(type);
    setCurrentPage(1); // 필터가 변경되면 페이지를 1로 초기화
    setPageGroup(0); // 페이지 그룹도 초기화
  };

  return (
    <ReviewSectionContainer>
      <SectionTitle>서비스 별 더 많은 후기를 만나보세요</SectionTitle>

      {/* 필터 버튼 */}
      <FilterContainer>
        <FilterButton
          active={filterType === null}
          onClick={() => handleFilter(null)}
        >
          전체 보기
        </FilterButton>
        <FilterButton
          active={filterType === "book"}
          onClick={() => handleFilter("book")}
        >
          학종 가이드북
        </FilterButton>
        <FilterButton
          active={filterType === "analyze"}
          onClick={() => handleFilter("analyze")}
        >
          생기부 진단 서비스
        </FilterButton>
        <FilterButton
          active={filterType === "ai"}
          onClick={() => handleFilter("ai")}
        >
          AI 주제 추천 서비스
        </FilterButton>
      </FilterContainer>

      {/* 필터링된 리뷰 목록 */}
      <ReviewList>
        {currentReviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </ReviewList>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination>
          {startPage > 1 && (
            <ArrowButton onClick={handlePreviousGroup}>{"<"}</ArrowButton>
          )}
          {pageNumbers.map((pageNumber) => (
            <PageButton
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              active={currentPage === pageNumber}
            >
              {pageNumber}
            </PageButton>
          ))}
          {endPage < totalPages && (
            <ArrowButton onClick={handleNextGroup}>{">"}</ArrowButton>
          )}
        </Pagination>
      )}
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
