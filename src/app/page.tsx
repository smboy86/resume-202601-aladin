import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { ColorItem } from '@/components/ui/ColorItem';
import { FEATURE_LINKS, THEME_EXAMPLES } from '@/constants/common';
import Link from 'next/link';

export const metadata = {
  title: 'Github API',
};

export default function Home() {
  return (
    <div className='min-h-screen bg-zinc-50 px-6 py-12 font-sans text-zinc-900 sm:px-10 dark:bg-zinc-950 dark:text-zinc-50'>
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
        <header className='flex flex-col gap-3'>
          <p className='text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400'>Theme Preview</p>
          <h1 className='text-3xl font-semibold tracking-tight'>Github API</h1>
          <p className='text-base text-zinc-600 dark:text-zinc-400'>
            MUI 머터리얼 컬러 팔레트를 확인하기 위한 예시 리스트입니다.
          </p>
        </header>

        <Paper className='overflow-hidden' elevation={0} variant='outlined'>
          <List disablePadding>
            {/* Link 스타일 */}
            {FEATURE_LINKS.map((item, index) => (
              <Box key={item.key}>
                <ListItem disableGutters disablePadding>
                  <Link href={item.href} passHref className='w-full'>
                    <ListItemButton className='w-full px-6 py-4'>
                      <ListItemText primary={item.title} secondary={item.description} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                {index < FEATURE_LINKS.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>

        <Paper className='overflow-hidden' elevation={0} variant='outlined'>
          <List disablePadding>
            {/* 컴포넌트 분리 스타일 */}
            {THEME_EXAMPLES.map((item) => (
              <ColorItem key={item.key} item={item} />
            ))}
          </List>
        </Paper>
      </main>
    </div>
  );
}
