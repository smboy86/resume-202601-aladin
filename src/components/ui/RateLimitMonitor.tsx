import { LinearProgress, Box, Typography, Chip } from '@mui/material';
import { useAppSelector } from '@/store/hooks';

export const RateLimitMonitor = () => {
  const { isAuth, limit, remaining } = useAppSelector((state) => state.rateLimit);
  const usagePercent = limit > 0 ? (remaining / limit) * 100 : 0;

  return (
    <Box sx={{ position: 'fixed', bottom: 10, right: 10, p: 2, bgcolor: 'background.paper', border: 1 }}>
      <Typography variant='caption'>
        인증 상태:{' '}
        {isAuth ? <Chip label='TOKEN' color='success' size='small' /> : <Chip label='GUEST' size='small' />}
      </Typography>
      <Box sx={{ mt: 1, width: 200 }}>
        <Typography variant='body2'>
          남은 쿼터: {remaining} / {limit}
        </Typography>
        <LinearProgress
          variant='determinate'
          value={usagePercent}
          color={usagePercent < 20 ? 'error' : 'primary'}
        />
      </Box>
    </Box>
  );
};
