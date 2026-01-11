import SearchDisplay from '@/components/template/search/display';

type InitialSearchData = {
  total_count: number;
  items: Array<{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
  }>;
};

async function fetchInitialData() {
  const baseUrl = process.env.GITHUB_API_BASE_URL;
  if (!baseUrl) {
    return {
      initialData: { total_count: 0, items: [] },
      rateLimit: { isAuth: false, limit: 0, remaining: 0 },
    };
  }

  const token = process.env.GITHUB_TOKEN;
  const url = new URL('/search/users', baseUrl);
  url.searchParams.set('q', 'type:user');
  url.searchParams.set('per_page', '10');
  url.searchParams.set('page', '1');

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      initialData: { total_count: 0, items: [] },
      rateLimit: { isAuth: false, limit: 0, remaining: 0 },
    };
  }

  const data = (await response.json()) as InitialSearchData;

  const isAuth = Boolean(token);
  const limitHeader = Number(response.headers.get('x-ratelimit-limit') ?? 0);
  const remainingHeader = Number(response.headers.get('x-ratelimit-remaining') ?? 0);

  return {
    initialData: {
      total_count: data.total_count ?? 0,
      items: data.items ?? [],
    },
    rateLimit: {
      isAuth: isAuth,
      limit: limitHeader,
      remaining: remainingHeader,
    },
  };
}

export default async function SearchPage() {
  const { initialData, rateLimit } = await fetchInitialData();

  return <SearchDisplay initialData={initialData} initialRateLimit={rateLimit} />;
}
