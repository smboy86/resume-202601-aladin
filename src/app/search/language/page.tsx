import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 사용 언어',
};

export default function SearchLanguagePage() {
  return (
    <SearchTemplate
      title='사용 언어로 검색'
      description='language 조건을 사용해 특정 언어 사용자를 찾습니다.'
      queryExample='language:typescript'
      hint='언어 값의 대소문자/특수문자 처리와 매핑을 확인합니다.'
    />
  );
}
