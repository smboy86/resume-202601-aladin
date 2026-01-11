import SearchTemplate from '../_components/SearchTemplate';

export const metadata = {
  title: 'Github API - 위치',
};

export default function SearchLocationPage() {
  return (
    <SearchTemplate
      title='위치별 검색'
      description='사용자 프로필 위치 정보를 기준으로 검색합니다.'
      queryExample='location:seoul type:user'
      hint='공백/특수문자 처리와 URL 인코딩을 확인합니다.'
    />
  );
}
