import React, { createContext, useContext, useState } from "react";
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
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [pointUsed, setPointUsed] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("BANK_TRANSFER");

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
