import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 후원 가능 여부',
};

export default function SearchSponsorablePage() {
  return (
    <SearchTemplate
      title='후원 가능 여부를 기준으로 검색'
      description='is:sponsorable 조건을 활용합니다.'
      queryExample='is:sponsorable type:user'
      hint='불리언 조건이 쿼리에 정상 반영되는지 확인합니다.'
    />
  );
}
