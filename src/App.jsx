import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import TransactionPage from '@/pages/transactions/TransactionPage';
import RecurringPage from '@/pages/recurrings/RecurringPage';

function App() {
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  // Sauvegarde dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const muiTheme = useMemo(() =>
    createTheme({
      palette: {
        mode: themeMode,
      },
    }), [themeMode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={
          <DashboardLayout 
            themeMode={themeMode} 
            setThemeMode={setThemeMode} 
          />
        }>
          <Route index element={<DashboardPage />} /> 
          <Route path="Transactions" element={<TransactionPage />} />
          <Route path="recurrings" element={<RecurringPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;