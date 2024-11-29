export interface UserProfile {
  id: string;
  realName: string;
  profileName: string;
  profileColor: string;
  dream: string;
  schoolName: string;
  grade: number;
  score: number;
  points: number;
}

export interface Exploration {
  id: string;
  userId: string;
  subjectId: string;
  title: string;
  state: 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED';
  motive: string;
  contents: string;
  result: string;
  actions: string;
  ai: boolean;
  createDate: string;
}

export interface Interest {
  id: string;
  userId: string;
  subjectId: string;
  title: string;
  contents: string;
  createDate: string;
}

export interface Archiving {
  id: string;
  uniqueId: string;
  type: 'explore' | 'interest';
  subjectId: string;
  title: string;
  contents: string;
  state: 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED';
  ai: boolean;
  createDate: string;
}

export interface Pass {
  id: number;
  serviceId: number;
  title: string;
  description: string;
  benefits: string[];
  price: number;
  discountRate: number;
}

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
  detailImage: string[];
  deliveryInfo: string;
  passes: Pass[];
}

export interface CartItem {
  id: number;
  service: Service;
  pass?: Pass;
  amount?: number;
  description?: string[];
}

export interface BankTransferInfo {
  holderName: string;
  bank: string;
  account: string;
}

export interface PurchaseItemType {
  id: number;
  buyId: number;
  serviceId: number | null;
  passId: number | null;
  service?: { 
    title: string; 
    subtitle: string; 
    image: string;
  };
  pass?: { 
    title: string; 
    description: string;
  };
  status: 'PURCHASED' | 'CANCEL_REQUESTED' | 'REFUNDED' | 'REJECTED' | 'WAITING_CONFIRMATION';
  amount: number;
  totalPrice: number;
  refundDate: string | null;
  refundReason: string | null;
  purchaseDate: string;
  contactInfo: string;
  email: string;
  usedPoint: number;
  paymentMethod: 'ACCOUNT_TRANSFER';
  bankTransferInfo?: BankTransferInfo;
}