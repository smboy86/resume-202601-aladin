import { Chip, Paper } from '@mui/material';

type SearchTemplateProps = {
  title: string;
  description: string;
  queryExample: string;
  hint: string;
};

export default function SearchTemplate({
  title,
  description,
  queryExample,
  hint,
}: SearchTemplateProps) {
  return (
    <div className='min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 sm:px-10'>
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
        <header className='space-y-2'>
          <p className='text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>Github API</p>
          <h1 className='text-3xl font-semibold tracking-tight'>{title}</h1>
          <p className='text-base text-zinc-600 dark:text-zinc-400'>{description}</p>
        </header>

        <div className='grid gap-4 sm:grid-cols-2'>
          <Paper className='rounded-2xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='text-sm font-semibold text-zinc-900 dark:text-zinc-50'>예시 쿼리</p>
                <p className='mt-2 rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'>
                  {queryExample}
                </p>
              </div>
              <Chip label='Search Users' size='small' color='primary' />
            </div>
          </Paper>

          <Paper className='rounded-2xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
            <p className='text-sm font-semibold text-zinc-900 dark:text-zinc-50'>테스트 포인트</p>
            <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>{hint}</p>
          </Paper>
        </div>

        <section className='rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'>
          UI와 검색 로직을 이 영역에 구현하세요.
        </section>
      </main>
    </div>
  );
}
