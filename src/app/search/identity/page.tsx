import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 계정 이름/성명/메일',
};

export default function SearchIdentityPage() {
  return (
    <SearchTemplate
      title='계정 이름, 성명 또는 메일로 검색'
      description='login, name, email 필드에서 검색합니다.'
      queryExample='in:login in:name in:email aladin'
      hint='in: 조건이 복수 적용될 때 쿼리 조합을 확인합니다.'
    />
  );
}
