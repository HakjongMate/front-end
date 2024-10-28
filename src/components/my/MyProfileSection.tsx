import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import MyProfileEditModal from './MyProfileEditModal';
import { UserProfile } from '../../types';

const SectionContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;

const Card = styled.div`
  background-color: #F5F6FB;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
    padding: 15px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    align-items: center;
  }
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center
`;

const ProfileCircle = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-right: 30px;

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
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

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const UserInfo = styled.span`
  font-size: 16px;
  font-weight: 300;
  color: #000;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #000;
  padding: 4px;

  @media (max-width: 480px) {
    margin-top: 10px;
  }
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

  @media (max-width: 480px) {
    justify-content: space-between;
    width: 100%;
  }

  svg {
    margin-right: 12px;
    color: #000;
    font-size: 24px;

    @media (max-width: 480px) {
      font-size: 18px;
      margin-right: 8px;
    }
  }
`;

const StatValue = styled.span`
  margin-left: auto;
  font-weight: bold;

  @media (max-width: 480px) {
    margin-left: 0;
    font-size: 14px;
  }
`;

const MyProfileSection: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [coin, setCoin] = useState<number>(0);
  const [explorationCount, setExplorationCount] = useState<number>(0);
  const [daysTogether, setDaysTogether] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile(parsedUser);
    }

    // 탐구력 코인 API 호출
    const fetchUserPoints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/me/points`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCoin(data.data);
        } else {
          console.error('탐구력 코인 정보를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('탐구력 코인 정보를 가져오는 데 실패했습니다.', error);
      }
    };

    // 탐구 개수 API 호출
    const fetchExplorationCount = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/explore/count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExplorationCount(data.data);
        } else {
          console.error('탐구 개수 정보를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('탐구 개수 정보를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchUserPoints();
    fetchExplorationCount();
    setDaysTogether(324); // 임시 데이터
  }, []);

  const handleSave = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('user', JSON.stringify(updatedProfile));
  };

  if (!userProfile) {
    return null;
  }

  return (
    <SectionContainer>
      <ProfileContainer>
        <Card>
          <ProfileInfo>
            <UserDetails>
              <ProfileCircle color={userProfile.profileColor}>
                {userProfile.profileName}
              </ProfileCircle>
              <TextInfo>
                <Username>{userProfile.realName}님</Username>
                <UserInfo>{userProfile.schoolName} {userProfile.grade}학년 {userProfile.score}등급</UserInfo>
                <UserInfo>{userProfile.dream}</UserInfo>
              </TextInfo>
            </UserDetails>
            <EditButton onClick={() => setIsModalOpen(true)}>
              <EditIcon />
            </EditButton>
          </ProfileInfo>
        </Card>
        
        <Card>
          <StatItem>
            <span>탐구력 코인</span>
            <StatValue>{coin} C</StatValue>
          </StatItem>
          <StatItem>
            <span>학종메이트와 함께 진행한 탐구수</span>
            <StatValue>{explorationCount}개</StatValue>
          </StatItem>
          <StatItem>
            <span>학종메이트와 함께 한 날</span>
            <StatValue>{daysTogether}일</StatValue>
          </StatItem>
        </Card>
      </ProfileContainer>

      {isModalOpen && (
        <MyProfileEditModal
          userProfile={userProfile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </SectionContainer>
  );
};

export default MyProfileSection;
