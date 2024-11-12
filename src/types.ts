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
  description?: string[];
}