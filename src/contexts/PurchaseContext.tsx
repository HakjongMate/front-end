import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem } from "../types";

interface PurchaseContextType {
  selectedCartItems: CartItem[];
  setSelectedCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  pointUsed: number;
  setPointUsed: React.Dispatch<React.SetStateAction<number>>;
  contactInfo: string;
  setContactInfo: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  depositor: string;
  setDepositor: React.Dispatch<React.SetStateAction<string>>;
  depositBank: string;
  setDepositBank: React.Dispatch<React.SetStateAction<string>>;
  depositBankAccount: string;
  setDepositBankAccount: React.Dispatch<React.SetStateAction<string>>;
  availablePoints: number;
  setAvailablePoints: React.Dispatch<React.SetStateAction<number>>;
  fetchPoints: () => Promise<void>;
  applyPoints: (amount: number) => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [pointUsed, setPointUsed] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("BANK_TRANSFER");
  const [depositor, setDepositor] = useState<string>("");
  const [depositBank, setDepositBank] = useState<string>("");
  const [depositBankAccount, setDepositBankAccount] = useState<string>("");
  const [availablePoints, setAvailablePoints] = useState<number>(0);

  const fetchPoints = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("로그인이 필요합니다.");
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/me/points`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("포인트 정보를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setAvailablePoints(data.data);
    } catch (error) {
      console.error("포인트 조회 실패:", error);
      throw error;
    }
  }, []);

  const applyPoints = useCallback((amount: number) => {
    if (amount <= availablePoints) {
      setPointUsed(amount);
    } else {
      throw new Error("사용 가능한 포인트를 초과했습니다.");
    }
  }, [availablePoints]);

  return (
    <PurchaseContext.Provider
      value={{
        selectedCartItems,
        setSelectedCartItems,
        pointUsed,
        setPointUsed,
        contactInfo,
        setContactInfo,
        email,
        setEmail,
        paymentMethod,
        setPaymentMethod,
        depositor,
        setDepositor,
        depositBank,
        setDepositBank,
        depositBankAccount,
        setDepositBankAccount,
        availablePoints,
        setAvailablePoints,
        fetchPoints,
        applyPoints,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = (): PurchaseContextType => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("구매 정보를 불러오는데 실패했습니다.");
  }
  return context;
};