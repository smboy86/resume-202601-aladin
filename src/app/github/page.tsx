export const metadata = {
  title: 'Github API',
};

export default function GithubPage() {
  return (
    <div className='min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900 sm:px-10 dark:bg-zinc-950 dark:text-zinc-50'>
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
        <header className='space-y-2'>
          <p className='text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400'>Github API</p>
          <h1 className='text-3xl font-semibold tracking-tight'>사용자 검색</h1>
          <p className='text-base text-zinc-600 dark:text-zinc-400'>
            GitHub REST Search Users API를 호출하는 페이지가 이곳에 구성됩니다.
          </p>
        </header>
        <section className='rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'>
          UI와 검색 로직을 이 영역에 구현하세요.
        </section>
      </main>
    </div>
  );
}
