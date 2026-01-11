'use client';

import { useEffect, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { blue, cyan, deepPurple, green, grey, orange, red } from '@mui/material/colors';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMode, type ThemeMode } from '@/store/themeSlice';

type ProvidersProps = {
  children: React.ReactNode;
};

const THEME_STORAGE_KEY = 'themeMode';

function ThemeProviders({ children }: ProvidersProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      dispatch(setMode(saved));
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const resolvedMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedMode === 'dark');
  }, [resolvedMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedMode,
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
          background:
            resolvedMode === 'dark'
              ? { default: grey[900], paper: grey[800] }
              : { default: grey[50], paper: '#ffffff' },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Apple SD Gothic Neo"',
            '"Noto Sans KR"',
            'sans-serif',
          ].join(', '),
        },
      }),
    [prefersDarkMode, resolvedMode],
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

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProviders>{children}</ThemeProviders>
    </Provider>
  );
}
