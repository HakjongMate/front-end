import React from "react";
import styled from "styled-components";
import reviews from "../../assets/data/review.json";
import SingleReview from "./SingleReview";
import QnAComponent from "./QnAComponent";

const TabsContainer = styled.div`
  width: 1000px;
  max-width: 100%; /* 반응형 추가 */
  margin-top: 40px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#2b44ff" : "#000")};
  border-bottom: ${(props) => (props.active ? "2px solid #2b44ff" : "none")};
  cursor: pointer;
  flex-grow: 1;
  text-align: center;

  &:hover {
    color: #2b44ff;
  }

  /* 반응형 추가 */
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  background-color: #fff;
  min-height: 300px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  /* 반응형 추가 */
  @media (max-width: 768px) {
    padding: 30px 0px;
  }
`;

const ReviewList = styled.div`
  width: 100%;
  max-width: 800px;

  /* 반응형 추가 */
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  product: any;
  type: string;
  qnaData: { question: string; answer: string }[];
}

const TabsComponent: React.FC<TabsProps> = ({
  activeTab,
  setActiveTab,
  product,
  type,
  qnaData,
}) => {
  const filteredReviews = reviews.filter((review) => review.type === type);

  return (
    <TabsContainer>
      <Tabs>
        <TabButton
          active={activeTab === "detail"}
          onClick={() => setActiveTab("detail")}
        >
          상세 정보
        </TabButton>
        <TabButton
          active={activeTab === "review"}
          onClick={() => setActiveTab("review")}
        >
          리뷰
        </TabButton>
        <TabButton
          active={activeTab === "qa"}
          onClick={() => setActiveTab("qa")}
        >
          Q&A
        </TabButton>
      </Tabs>

      <TabContent>
        {activeTab === "detail" && product.detailImage.length > 0 ? (
          product.detailImage.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`Detail ${index}`}
              style={{ width: "75%", marginBottom: "10px" }}
            />
          ))
        ) : activeTab === "detail" ? (
          <p>상세 정보가 없습니다.</p>
        ) : activeTab === "review" ? (
          <ReviewList>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <SingleReview key={review.id} review={review} />
              ))
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </ReviewList>
        ) : activeTab === "qa" ? (
          <QnAComponent qnaData={qnaData} />
        ) : (
          <p>Q&A가 없습니다.</p>
        )}
      </TabContent>
    </TabsContainer>
  );
};

export default TabsComponent;
