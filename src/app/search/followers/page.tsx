import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 팔로워 수',
};

export default function SearchFollowersPage() {
  return (
    <SearchTemplate
      title='팔로워 수로 검색'
      description='followers 범위를 기준으로 계정을 필터링합니다.'
      queryExample='followers:>100 type:user'
      hint='숫자 범위 조건과 정렬 조합을 테스트합니다.'
    />
  );
}
