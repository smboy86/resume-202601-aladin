'use client';

import { useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { SortSelect, type SortOption } from '@/components/ui/SortSelect';
import { LocationAutocomplete } from '@/components/ui/LocationAutocomplete';
import { LocationOption } from '@/types/location';

type SearchMode = 'user' | 'org';
type RepoRangeMode = 'gte' | 'lte' | 'range';
type IdentityFilter = 'login' | 'name' | 'email';

type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
};

type SearchResponse = {
  incomplete_results: boolean;
  total_count: number;
  items: GithubUser[];
};

export default function SearchLocationPage() {
  const [mode, setMode] = useState<SearchMode>('user');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<IdentityFilter[]>([]);
  const [rangeMode, setRangeMode] = useState<RepoRangeMode>('gte');
  const [singleValue, setSingleValue] = useState('');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<GithubUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState<SortOption>('default');
  const [page, setPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);

  const identityHelperText = useMemo(() => {
    if (filters.length === 0) {
      return '조건을 선택하지 않으면 기본 검색으로 처리됩니다.';
    }
    return `선택된 조건: ${filters.join(', ')}`;
  }, [filters]);

  const helperText = useMemo(() => {
    if (rangeMode === 'range') {
      return '예: 10..50 형태로 검색됩니다.';
    }
    return '예: repos:>=10 또는 repos:<=100 형태로 검색됩니다.';
  }, [rangeMode]);

  const toggleFilter = (filter: IdentityFilter) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter],
    );
  };

  const buildQuery = () => {
    if (!selectedLocation) return '';
    const typeFilter = mode === 'user' ? 'type:user' : 'type:org';
    const identityFilter = filters.length > 0 ? `${filters.map((filter) => `in:${filter}`).join(' ')} ` : '';
    const keyword = query.trim();
    const locationFilter = `location:${selectedLocation.query}`;
    if (rangeMode === 'range') {
      const start = rangeStart.trim();
      const end = rangeEnd.trim();
      if (start && end) {
        return `${typeFilter} ${identityFilter}${locationFilter} repos:${start}..${end}${
          keyword ? ` ${keyword}` : ''
        }`;
      }
      return `${typeFilter} ${identityFilter}${locationFilter}${keyword ? ` ${keyword}` : ''}`;
    }
    const value = singleValue.trim();
    const operator = rangeMode === 'gte' ? '>=' : '<=';
    if (!value) {
      return `${typeFilter} ${identityFilter}${locationFilter}${keyword ? ` ${keyword}` : ''}`;
    }
    return `${typeFilter} ${identityFilter}${locationFilter} repos:${operator}${value}${
      keyword ? ` ${keyword}` : ''
    }`;
  };

  const handleSearch = async () => {
    console.log('sss  handleSearch');
    const built = buildQuery();
    if (!built) return;
    setLoading(true);
    setError('');
    console.log('2222');
    try {
      const params = new URLSearchParams({
        q: built,
        per_page: '10',
        page: String(page),
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
      setTotalCount(data.total_count ?? 0);
      setResults(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setTotalCount(0);
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
          <h1 className='text-3xl font-semibold tracking-tight'>
            사용자 프로필 위치 정보를 기준으로 검색합니다.
          </h1>
          <p className='text-base text-zinc-600 dark:text-zinc-400'>
            GitHub Search Users API의 repos 조건을 사용해 검색합니다.
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
              label='키워드'
              placeholder='예: octocat'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              className='w-full'
              helperText={identityHelperText}
            />
          </div>
          <div className='mt-4'>
            <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
              계정, 이름, 이메일로 검색
            </span>
            <FormGroup row className='gap-4'>
              <FormControlLabel
                control={
                  <Checkbox checked={filters.includes('login')} onChange={() => toggleFilter('login')} />
                }
                label='login'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={filters.includes('name')} onChange={() => toggleFilter('name')} />
                }
                label='name'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={filters.includes('email')} onChange={() => toggleFilter('email')} />
                }
                label='email'
              />
            </FormGroup>
          </div>

          <div className='sm:flex-start mt-4 flex flex-col gap-3'>
            <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>리포지토리 수</span>
            <div className='sm:flex-start sm:flex-start flex flex-1 flex-col gap-2 sm:flex-row'>
              <TextField
                select
                size='small'
                value={rangeMode}
                onChange={(event) => setRangeMode(event.target.value as RepoRangeMode)}
                className='sm:w-48'>
                <MenuItem value='gte'>같거나 보다 큰 값 ({`>=`})</MenuItem>
                <MenuItem value='lte'>같거나, 보다 작은 값 ({`<=`})</MenuItem>
                <MenuItem value='range'>구간 검색 (..)</MenuItem>
              </TextField>
              {rangeMode === 'range' ? (
                <>
                  <TextField
                    size='small'
                    type='number'
                    label='시작 값'
                    value={rangeStart}
                    onChange={(event) => setRangeStart(event.target.value)}
                    className='sm:w-40'
                    helperText={helperText}
                  />
                  <TextField
                    size='small'
                    type='number'
                    label='종료 값'
                    value={rangeEnd}
                    onChange={(event) => setRangeEnd(event.target.value)}
                    className='sm:w-40'
                  />
                </>
              ) : (
                <TextField
                  size='small'
                  type='number'
                  label='값'
                  value={singleValue}
                  onChange={(event) => setSingleValue(event.target.value)}
                  className='sm:w-40'
                  helperText={helperText}
                />
              )}
            </div>
          </div>
          <div className='sm:flex-start mt-4 flex flex-col gap-3'>
            <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>위치</span>
            <LocationAutocomplete onLocationSelect={setSelectedLocation} />
          </div>

          {/* 검색 버튼 */}
          <div className='sm:flex-start mt-4 flex flex-col gap-3'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSearch}
              disabled={loading || !selectedLocation}
              className='sm:self-stretch'>
              {loading ? '검색 중...' : '검색'}
            </Button>
          </div>
        </Paper>

        <div className='flex justify-end'>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <div className='flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'>
          <span>
            총 결과:{' '}
            <strong className='text-zinc-900 dark:text-zinc-50'>{totalCount.toLocaleString()}</strong>
          </span>
          <span>
            현재 페이지: <strong className='text-zinc-900 dark:text-zinc-50'>{page}</strong>
          </span>
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
