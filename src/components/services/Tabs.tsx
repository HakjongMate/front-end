import React from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  width: 1000px;
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
`;

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  product: any;
}

const TabsComponent: React.FC<TabsProps> = ({
  activeTab,
  setActiveTab,
  product,
}) => (
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
      <TabButton active={activeTab === "qa"} onClick={() => setActiveTab("qa")}>
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
        <p>리뷰가 없습니다.</p>
      ) : (
        <p>Q&A가 없습니다.</p>
      )}
    </TabContent>
  </TabsContainer>
);

export default TabsComponent;
