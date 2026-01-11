// MUI Chip 컴포넌트의 color prop과 매칭되는 타입들입니다.
export const THEME_EXAMPLES = [
  {
    key: 'primary',
    title: 'Primary',
    description: '애플리케이션의 주요 액션, 버튼 및 하이라이트에 사용되는 메인 컬러입니다.',
    color: 'primary.main',
  },
  {
    key: 'secondary',
    title: 'Secondary',
    description: '보조 선택 사항이나 덜 강조되는 정보, 상태를 나타낼 때 사용합니다.',
    color: 'secondary.main',
  },
  {
    key: 'info',
    title: 'Info',
    description: '중립적인 정보 제공, 팁, 또는 진행 상태를 안내할 때 사용합니다.',
    color: 'info.main',
  },
  {
    key: 'success',
    title: 'Success',
    description: '완료, 성공, 긍정적인 확인 상태를 시각적으로 전달합니다.',
    color: 'success.main',
  },
  {
    key: 'warning',
    title: 'Warning',
    description: '주의가 필요하거나 잠재적인 문제를 경고할 때 사용합니다.',
    color: 'warning.main',
  },
  {
    key: 'error',
    title: 'Error',
    description: '치명적인 오류, 실패 또는 즉각적인 조치가 필요한 상황을 나타냅니다.',
    color: 'error.main',
  },
] as const;

export type ThemeExample = (typeof THEME_EXAMPLES)[number];

export const FEATURE_LINKS = [
  {
    key: 'type',
    title: '사용자 또는 조직만 검색',
    description: 'type:user 또는 type:org 조건을 테스트합니다.',
    href: '/search/type',
  },
  {
    key: 'identity',
    title: '계정 이름, 성명 또는 메일로 검색',
    description: 'in:login, in:name, in:email 조건을 확인합니다.',
    href: '/search/identity',
  },
  {
    key: 'repositories',
    title: '리포지토리 수로 검색',
    description: 'repos 범위 조건을 테스트합니다.',
    href: '/search/repositories',
  },
  {
    key: 'location',
    title: '위치별 검색',
    description: 'location 조건과 인코딩 처리를 확인합니다.',
    href: '/search/location',
  },
  {
    key: 'language',
    title: '사용 언어로 검색',
    description: 'language 조건을 테스트합니다.',
    href: '/search/language',
  },
  {
    key: 'joined',
    title: '계정 생성 시점별 검색',
    description: 'created 범위 조건을 테스트합니다.',
    href: '/search/joined',
  },
  {
    key: 'followers',
    title: '팔로워 수로 검색',
    description: 'followers 범위 조건을 테스트합니다.',
    href: '/search/followers',
  },
  {
    key: 'sponsorable',
    title: '후원 가능 여부로 검색',
    description: 'is:sponsorable 조건을 테스트합니다.',
    href: '/search/sponsorable',
  },
] as const;

export type FeatureExample = (typeof FEATURE_LINKS)[number];
