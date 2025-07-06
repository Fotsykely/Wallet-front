import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet, useLocation } from 'react-router-dom';

// Titres dynamiques selon la route
const getPageInfo = (pathname) => {
  const routes = {
    '/': { title: 'Dashboard', subtitle: 'This is your wallet overview' },
    '/cards': { title: 'My Cards', subtitle: 'Manage your payment cards' },
    '/transactions': { title: 'Transactions', subtitle: 'View your transaction history' },
    '/wallet': { title: 'Wallet', subtitle: 'Manage your digital wallets' },
    '/analytics': { title: 'Analytics', subtitle: 'Financial insights and reports' },
    '/settings': { title: 'Settings', subtitle: 'Configure your preferences' },
  };
  
  return routes[pathname] || { title: 'Dashboard', subtitle: 'Welcome back!' };
};

export const DashboardLayout = ({ initialTheme = 'light' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      // Sinon, détecte le thème système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return initialTheme;
  };
  const [theme, setTheme] = useState(getInitialTheme);

  // Sauvegarder le thème à chaque changement
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const pageInfo = getPageInfo(location.pathname);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#0f0f0f' : '#fafbfc';

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: backgroundColor,
      transition: 'background-color 0.3s ease'
    }}>
      {/* Sidebar pour desktop */}
      {!isMobile && (
        <Box 
          component="nav"
          sx={{ 
            width: 260, 
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: 260, 
              boxSizing: 'border-box',
              position: 'relative',
              height: '200vh',
              border: 'none'
            }
          }}
        >
          <Sidebar variant={theme} onToggleTheme={handleThemeToggle} />
        </Box>
      )}

      {/* Drawer pour mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 260,
            boxSizing: 'border-box' 
          }
        }}
      >
        <Sidebar variant={theme} onToggleTheme={handleThemeToggle} />
      </Drawer>
      
      {/* Contenu principal */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Header 
          onMenuClick={handleDrawerToggle}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          theme={theme}
        />
        
        {/* Contenu de la page */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            padding: { xs: 2, md: 3 },
            backgroundColor: backgroundColor,
            maxHeight: 'calc(100vh - 68px)',
            overflow: 'auto',
            transition: 'background-color 0.3s ease'
          }}
        >
          <Outlet context={{ theme, isDark }} />
        </Box>
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  initialTheme: PropTypes.oneOf(['light', 'dark']),
};