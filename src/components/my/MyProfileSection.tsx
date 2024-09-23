import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface UserProfile {
  id: string;
  username: string;
  high_school: string;
  grade: number;
  score: number;
  dream: string;
  profile_color: string;
  profile_name: string;
}

const SectionContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Card = styled.div`
  background-color: #F5F6FB;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileCircle = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-right: 30px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  line-height: 1.6;
`;

const UserInfo = styled.span`
  font-size: 16px;
  font-weight: 300;
  color: #000;
  line-height: 1.6;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #000;
  padding: 4px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  color: #333;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-right: 12px;
    color: #000;
    font-size: 24px;
  }
`;

const StatValue = styled.span`
  margin-left: auto;
  font-weight: bold;
`;

const MyProfileSection: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [coin, setCoin] = useState<number>(0);
  const [explorationCount, setExplorationCount] = useState<number>(0);
  const [daysTogether, setDaysTogether] = useState<number>(0);

  useEffect(() => {
    // LocalStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }

    // 탐구력 코인 및 기타 정보 설정 (임의 데이터로 설정된 부분)
    setCoin(1000);
    setExplorationCount(5);
    setDaysTogether(324);
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <SectionContainer>
      <ProfileContainer>
        <Card>
          <ProfileInfo>
            <UserDetails>
              <ProfileCircle color={userProfile.profile_color}>
                {userProfile.profile_name}
              </ProfileCircle>
              <TextInfo>
                <Username>{userProfile.username}님</Username>
                <UserInfo>{userProfile.high_school} {userProfile.grade}학년 {userProfile.score}등급</UserInfo>
                <UserInfo>{userProfile.dream}</UserInfo>
              </TextInfo>
            </UserDetails>
            <EditButton>
              <EditIcon />
            </EditButton>
          </ProfileInfo>
        </Card>
        
        <Card>
          <StatItem>
            <CopyrightIcon />
            탐구력 코인<StatValue>{coin} C</StatValue>
          </StatItem>
          <StatItem>
            <CheckCircleOutlineIcon />
            학종메이트와 함께 진행한 탐구수<StatValue>{explorationCount}개</StatValue>
          </StatItem>
          <StatItem>
            <CalendarTodayIcon />
            학종메이트와 함께 한 날<StatValue>{daysTogether}일</StatValue>
          </StatItem>
        </Card>
      </ProfileContainer>
    </SectionContainer>
  );
};

export default MyProfileSection;
