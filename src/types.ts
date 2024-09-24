export interface UserProfile {
  id: string;
  username: string;
  high_school: string;
  grade: number;
  score: number;
  dream: string;
  profile_color: string;
  profile_name: string;
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
