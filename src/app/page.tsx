import { Box, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';

export const metadata = {
  title: 'Github API',
};

export default function Home() {
  const examples = [
    {
      key: 'primary',
      title: 'Primary',
      description: '기본 액션과 링크에 사용하는 브랜드 컬러',
      color: 'primary.main',
    },
    {
      key: 'secondary',
      title: 'Secondary',
      description: '보조 강조 컬러 (상태, 보조 CTA)',
      color: 'secondary.main',
    },
    {
      key: 'success',
      title: 'Success',
      description: '성공 상태 피드백',
      color: 'success.main',
    },
    {
      key: 'warning',
      title: 'Warning',
      description: '주의/경고 상태 알림',
      color: 'warning.main',
    },
    {
      key: 'error',
      title: 'Error',
      description: '오류 상태 알림',
      color: 'error.main',
    },
  ];

  return (
    <div className='min-h-screen bg-zinc-50 px-6 py-12 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 sm:px-10'>
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
        <header className='flex flex-col gap-3'>
          <p className='text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>Theme Preview</p>
          <h1 className='text-3xl font-semibold tracking-tight'>Github API</h1>
          <p className='text-base text-zinc-600 dark:text-zinc-400'>
            MUI 머터리얼 컬러 팔레트를 확인하기 위한 예시 리스트입니다.
          </p>
        </header>

        <Paper className='overflow-hidden' elevation={0} variant='outlined'>
          <List disablePadding>
            {examples.map((item, index) => (
              <Box key={item.key}>
                <ListItem className='px-6 py-4' disableGutters>
                  <ListItemIcon className='min-w-0 pr-4'>
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '999px',
                        bgcolor: item.color,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.title} secondary={item.description} />
                  <Chip label={item.title} color={item.key as 'primary' | 'secondary' | 'success' | 'warning' | 'error'} />
                </ListItem>
                {index < examples.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      </main>
    </div>
  );
}
