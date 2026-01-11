'use client';

import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { blue, cyan, deepPurple, green, grey, orange, red } from '@mui/material/colors';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: blue[600],
            light: blue[400],
            dark: blue[800],
          },
          secondary: {
            main: deepPurple[500],
            light: deepPurple[300],
            dark: deepPurple[700],
          },
          error: {
            main: red[600],
          },
          warning: {
            main: orange[600],
          },
          info: {
            main: cyan[600],
          },
          success: {
            main: green[600],
          },
          background: prefersDarkMode
            ? { default: grey[900], paper: grey[800] }
            : { default: grey[50], paper: '#ffffff' },
        },
        typography: {
          fontFamily:
            '-apple-system, "SF Pro Text", "SF Pro Display", "Noto Sans KR", "Noto Sans", sans-serif',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
