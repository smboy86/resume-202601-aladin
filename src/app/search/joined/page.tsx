import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 가입 시점',
};

export default function SearchJoinedPage() {
  return (
    <SearchTemplate
      title='개인 계정을 만든 시점별 검색'
      description='created 범위를 기준으로 계정 생성 시점을 필터링합니다.'
      queryExample='created:>2020-01-01 type:user'
      hint='날짜 범위 조건과 타임존 처리 여부를 확인합니다.'
    />
  );
}
