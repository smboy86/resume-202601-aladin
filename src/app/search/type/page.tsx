'use client';

import { useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { SortSelect, type SortOption } from '@/components/ui/SortSelect';

type SearchMode = 'user' | 'org';

type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
};

type SearchResponse = {
  total_count: number;
  items: GithubUser[];
};

export default function SearchTypePage() {
  const [mode, setMode] = useState<SearchMode>('user');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<GithubUser[]>([]);
  const [sort, setSort] = useState<SortOption>('default');

  const helperText = useMemo(
    () => (mode === 'user' ? 'type:user 조건이 적용됩니다.' : 'type:org 조건이 적용됩니다.'),
    [mode],
  );

  const buildQuery = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    const typeFilter = mode === 'user' ? 'type:user' : 'type:org';
    return `${typeFilter} ${trimmed}`;
  };

  const handleSearch = async () => {
    const built = buildQuery(query);
    if (!built) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        q: built,
        per_page: '10',
        page: '1',
        order: 'desc',
      });
      if (sort !== 'default') {
        params.set('sort', sort);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL}/search/users?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error('검색 요청에 실패했습니다.');
      }
      const data = (await response.json()) as SearchResponse;
      setResults(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900 sm:px-10 dark:bg-zinc-950 dark:text-zinc-50'>
      <main className='mx-auto flex w-full max-w-4xl flex-col gap-8'>
        <header className='space-y-2'>
          <p className='text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400'>Github API</p>
          <h1 className='text-3xl font-semibold tracking-tight'>사용자 또는 조직만 검색</h1>
          <p className='text-base text-zinc-600 dark:text-zinc-400'>
            GitHub Search Users API를 사용해 사용자 또는 조직 조건으로 검색합니다.
          </p>
        </header>

        <Paper className='rounded-2xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
          <div className='sm:flex-start flex flex-col gap-3 sm:flex-row'>
            <TextField
              select
              size='small'
              label='검색 기준'
              value={mode}
              onChange={(event) => setMode(event.target.value as SearchMode)}
              className='sm:w-40'>
              <MenuItem value='user'>사용자</MenuItem>
              <MenuItem value='org'>조직</MenuItem>
            </TextField>
            <TextField
              size='small'
              label={mode === 'user' ? '사용자 키워드' : '조직 키워드'}
              placeholder={mode === 'user' ? '예: octocat' : '예: github'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              className='flex-1'
              helperText={helperText}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className='sm:self-stretch'>
              {loading ? '검색 중...' : '검색'}
            </Button>
          </div>
        </Paper>

        <div className='flex justify-end'>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <Paper className='overflow-hidden' elevation={0} variant='outlined'>
          {error && <p className='px-6 py-4 text-sm text-red-600'>{error}</p>}
          {!error && results.length === 0 && (
            <p className='px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400'>
              검색 결과가 없습니다. 조건을 입력하고 검색을 실행해 주세요.
            </p>
          )}
          {results.length > 0 && (
            <List disablePadding>
              {results.map((user, index) => (
                <div key={user.id}>
                  <ListItem className='px-6 py-4'>
                    <ListItemAvatar>
                      <Avatar src={user.avatar_url} alt={user.login} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.login}
                      secondary={
                        <a
                          className='text-sm text-zinc-500 hover:underline dark:text-zinc-400'
                          href={user.html_url}
                          target='_blank'
                          rel='noreferrer'>
                          {user.html_url}
                        </a>
                      }
                    />
                    <span className='text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-400'>
                      {user.type}
                    </span>
                  </ListItem>
                  {index < results.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          )}
        </Paper>
      </main>
    </div>
  );
}
