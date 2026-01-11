import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 사용자/조직 필터',
};

export default function SearchTypePage() {
  return (
    <SearchTemplate
      title='사용자 또는 조직만 검색'
      description='계정 타입을 user 또는 org으로 필터링합니다.'
      queryExample='type:user react'
      hint='type 조건이 올바르게 쿼리에 반영되는지 확인합니다.'
    />
  );
}
