// src/features/github/domain/entities/Location.ts (또는 constants 파일)

import { LocationOption } from '@/types/location';

const SEOUL_DISTRICTS = [
  '강남구',
  '서초구',
  '송파구',
  '마포구',
  '용산구',
  '성동구',
  '광진구',
  '동대문구',
  '중랑구',
  '성북구',
  '강북구',
  '도봉구',
  '노원구',
  '은평구',
  '서대문구',
  '양천구',
  '강서구',
  '구로구',
  '금천구',
  '영등포구',
  '동작구',
  '관악구',
  '강동구',
  '종로구',
  '중구',
];

const IT_HUBS = ['테헤란로', '가산디지털단지', '구로디지털단지', '상암DMC', '성수IT밸리', '홍대입구'];

const baseLocations: LocationOption[] = [
  { display: '서울, 대한민국', query: 'seoul' },
  { display: '서울, 대한민국(한글)', query: '서울' },
  { display: '판교, 대한민국', query: 'pangyo' },
  { display: 'San Francisco, US', query: 'san-francisco' },
  { display: 'London, UK', query: 'london' },
  { display: 'Tokyo, Japan', query: 'tokyo' },
];

// 100개의 서울 중심 가 데이터 생성
const generatedSeoulLocations: LocationOption[] = Array.from({ length: 100 }).map((_, i) => {
  const district = SEOUL_DISTRICTS[i % SEOUL_DISTRICTS.length];
  const hub = IT_HUBS[i % IT_HUBS.length];

  return {
    // 예: "대한민국 서울 강남구 (테헤란로) - 1"
    display: `대한민국 서울 ${district} (${hub}) - ${i + 1}`,
    // GitHub API 쿼리는 공백을 허용하지 않거나 인코딩이 필요하므로 하이픈 연결
    query: `seoul-${district}-${i + 1}`.replace(/[^a-zA-Z0-9-]/g, ''),
  };
});

export const TOP_IT_LOCATIONS: LocationOption[] = [...baseLocations, ...generatedSeoulLocations];
