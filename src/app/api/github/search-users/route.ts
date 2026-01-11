import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q');
  const perPage = searchParams.get('per_page') ?? '10';
  const page = searchParams.get('page') ?? '1';

  if (!query) {
    return NextResponse.json({ message: 'q 파라미터가 필요합니다.' }, { status: 400 });
  }

  const baseUrl = process.env.GITHUB_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ message: 'GITHUB_API_BASE_URL이 설정되어 있지 않습니다.' }, { status: 500 });
  }

  const token = process.env.GITHUB_TOKEN;

  // 토큰이 없어도 조회는 되도록
  // if (!token) {
  //   return NextResponse.json({ message: 'GITHUB_TOKEN이 설정되어 있지 않습니다.' }, { status: 500 });
  // }

  const url = new URL('/search/users', baseUrl);

  url.searchParams.set('q', query);
  url.searchParams.set('per_page', perPage);
  url.searchParams.set('page', page);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: 'no-store',
  });

  const data = await response.json();

  const limitHeader = response.headers.get('x-ratelimit-limit');
  const remainingHeader = response.headers.get('x-ratelimit-remaining');

  return NextResponse.json(
    {
      ...data,
      isAuth: Boolean(token),
      limitHeader: Number(limitHeader ?? 0),
      remainingHeader: Number(remainingHeader ?? 0),
    },
    { status: response.status },
  );
}
