import { useState, useEffect } from 'react';

interface UniversityChoice {
  name: string | null;
  major: string | null;
  color: string;
}

const DEFAULT_COLORS = ['#202594', '#0F4ABE', '#6E95DF'];

const useUniversityChoices = () => {
  const [choices, setChoices] = useState<UniversityChoice[]>([
    { name: null, major: null, color: DEFAULT_COLORS[0] },
    { name: null, major: null, color: DEFAULT_COLORS[1] },
    { name: null, major: null, color: DEFAULT_COLORS[2] },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 희망 대학 데이터 불러오기
  const fetchChoices = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/choice/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }

      const fetchedData = await response.json();
      const fetchedChoices = fetchedData.data;

      const updatedChoices = [...choices];

      // 우선순위에 따라 데이터 정렬
      fetchedChoices.forEach((choice: any) => {
        if (choice.priority >= 1 && choice.priority <= 3) {
          updatedChoices[choice.priority - 1] = {
            name: choice.university,
            major: choice.major,
            color: DEFAULT_COLORS[choice.priority - 1],
          };
        }
      });

      setChoices(updatedChoices);
    } catch (err) {
      console.error('희망 대학 조회 중 오류 발생:', err);
      setError('희망 대학 데이터를 불러오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 희망 대학 데이터 저장
  const saveChoice = async (priority: number, name: string, major: string) => {
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

      const existingChoice = choices[priority - 1];

      // 대학 정보 존재 여부에 따라 PUT 또는 POST 요청
      const apiUrl = existingChoice.name
        ? `${process.env.REACT_APP_API_URL}/api/choice/priority/${priority}/update`
        : `${process.env.REACT_APP_API_URL}/api/choice/create`;

      const method = existingChoice.name ? 'PUT' : 'POST';

      const response = await fetch(apiUrl, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ priority, university: name, major }),
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }

      // 로컬 상태 업데이트
      const updatedChoices = [...choices];
      updatedChoices[priority - 1] = { name, major, color: DEFAULT_COLORS[priority - 1] };
      setChoices(updatedChoices);
    } catch (err) {
      console.error('희망 대학 저장 중 오류 발생:', err);
      setError('희망 대학 데이터를 저장하는 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  return { choices, fetchChoices, saveChoice, loading, error };
};

export default useUniversityChoices;
