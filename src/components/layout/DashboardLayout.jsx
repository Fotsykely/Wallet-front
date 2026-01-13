import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useState } from 'react';
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
    '/recurrings': { title: 'Recurring Transactions', subtitle: 'Manage your recurring payments' },
    '/budgets': { title: 'Budgets', subtitle: 'Manage your digital wallets' },
    '/settings': { title: 'Settings', subtitle: 'Configure your preferences' },
    '/notifications': { title: 'Notifications', subtitle: 'System updates and alerts' },
  };
  
  return routes[pathname] || { title: 'Dashboard', subtitle: 'Welcome back!' };
};

export const DashboardLayout = ({ themeMode = 'light', setThemeMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Fonction pour le switch du Sidebar
  const handleThemeToggle = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isDark = themeMode === 'dark';
  const backgroundColor = isDark ? '#0f0f0f' : '#fafbfc';
  const pageInfo = getPageInfo(location.pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor, transition: 'background-color 0.3s ease' }}>
      {/* Sidebar */}
      {!isMobile && (
        <Box component="nav" sx={{ width: 260, flexShrink: 0 }}>
          <Sidebar variant={themeMode} onToggleTheme={handleThemeToggle} />
        </Box>
      )}
      {/* Drawer mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 260 } }}
      >
        <Sidebar variant={themeMode} onToggleTheme={handleThemeToggle} />
      </Drawer>
      {/* Contenu principal */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Header 
          onMenuClick={handleDrawerToggle}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          theme={themeMode}
        />
        <Box component="main" sx={{ flexGrow: 1, padding: { xs: 2, md: 3 }, backgroundColor, maxHeight: 'calc(100vh - 68px)', overflow: 'auto', transition: 'background-color 0.3s ease' }}>
          <Outlet context={{ theme: themeMode, isDark }} />
        </Box>
      </Box>
    </Box>
  );
};