// 초성 정의
const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

/**
 * 한글 문자의 초성을 추출
 * @param str 대상 문자열
 * @returns 초성으로 변환된 문자열
 */
export const getChosung = (str: string): string => {
  return str
    .split('')
    .map((char) => {
      const charCode = char.charCodeAt(0);
      
      // 한글 유니코드 범위 체크 (가 ~ 힣)
      if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
        const chosungIndex = Math.floor((charCode - 0xAC00) / (21 * 28));
        return CHOSUNG[chosungIndex];
      }
      // 초성이면 그대로 반환
      if (CHOSUNG.includes(char)) {
        return char;
      }
      // 그 외의 경우 그대로 반환
      return char;
    })
    .join('');
};

/**
 * 한글 문자열을 초성/중성/종성으로 분해
 * @param str 대상 문자열
 * @returns 분해된 문자열 배열 [초성, 중성, 종성]
 */
export const decomposeHangul = (str: string): string[] => {
  const char = str.charAt(0);
  const charCode = char.charCodeAt(0);

  // 한글 유니코드 범위 체크 (가 ~ 힣)
  if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
    const offset = charCode - 0xAC00;
    const chosungIndex = Math.floor(offset / (21 * 28));
    const jungsungIndex = Math.floor((offset % (21 * 28)) / 28);
    const jongsungIndex = offset % 28;

    return [
      CHOSUNG[chosungIndex],
      JUNGSUNG[jungsungIndex],
      JONGSUNG[jongsungIndex]
    ];
  }

  return [char, '', ''];
};

/**
 * 주어진 문자가 한글 초성인지 확인
 * @param char 검사할 문자
 * @returns 초성 여부
 */
export const isChosung = (char: string): boolean => {
  return CHOSUNG.includes(char);
};

/**
 * 모든 문자가 초성인지 확인
 * @param str 검사할 문자열
 * @returns 모든 문자가 초성인지 여부
 */
export const isAllChosung = (str: string): boolean => {
  return str.split('').every(char => isChosung(char));
};

/**
 * 한글 문자인지 확인
 * @param char 검사할 문자
 * @returns 한글 여부
 */
export const isHangul = (char: string): boolean => {
  const charCode = char.charCodeAt(0);
  return charCode >= 0xAC00 && charCode <= 0xD7A3;
};

/**
 * 초성 검색 및 일반 검색을 수행하는 함수
 * @param searchText 검색어
 * @param targetText 대상 텍스트
 * @returns 검색 결과 일치 여부
 */
export const searchKoreanText = (searchText: string, targetText: string): boolean => {
  if (!searchText) return true;
  
  const normalizedSearch = searchText.toLowerCase();
  const normalizedTarget = targetText.toLowerCase();
  
  // 일반 검색
  if (normalizedTarget.includes(normalizedSearch)) {
    return true;
  }
  
  // 초성 검색 (모든 문자가 초성인 경우에만)
  if (isAllChosung(searchText)) {
    const targetChosung = getChosung(targetText);
    
    // 초성이 순서대로 매칭되는지 확인
    let currentIndex = 0;
    for (const char of searchText) {
      const index = targetChosung.indexOf(char, currentIndex);
      if (index === -1) return false;
      currentIndex = index + 1;
    }
    return true;
  }
  
  return false;
};

/**
 * 배열에서 한글 텍스트 검색을 수행하는 함수
 * @param items 검색할 배열
 * @param searchText 검색어
 * @param property 검색할 속성 (객체 배열인 경우)
 * @returns 필터링된 배열
 */
export const filterKoreanItems = <T>(
  items: T[],
  searchText: string,
  property?: keyof T
): T[] => {
  return items.filter(item => {
    const targetText = property ? String(item[property]) : String(item);
    return searchKoreanText(searchText, targetText);
  });
};

export default {
  getChosung,
  decomposeHangul,
  isChosung,
  isAllChosung,
  isHangul,
  searchKoreanText,
  filterKoreanItems,
};