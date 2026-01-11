import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 리포지토리 수',
};

export default function SearchRepositoriesPage() {
  return (
    <SearchTemplate
      title='사용자가 소유한 리포지토리 수로 검색'
      description='repos 범위를 기준으로 계정을 필터링합니다.'
      queryExample='repos:>10 type:user'
      hint='숫자 범위 조건이 올바르게 직렬화되는지 확인합니다.'
    />
  );
}
