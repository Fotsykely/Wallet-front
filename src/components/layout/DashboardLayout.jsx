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
    '/wallet': { title: 'Wallet', subtitle: 'Manage your digital wallets' },
    '/analytics': { title: 'Analytics', subtitle: 'Financial insights and reports' },
    '/settings': { title: 'Settings', subtitle: 'Configure your preferences' },
  };
  
  return routes[pathname] || { title: 'Dashboard', subtitle: 'Welcome back!' };
};

export const DashboardLayout = ({ theme = 'light' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  
  const pageInfo = getPageInfo(location.pathname);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafbfc' }}>
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
          <Sidebar variant={theme} />
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
        <Sidebar variant={theme} />
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
        />
        
        {/* Contenu de la page */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            padding: { xs: 2, md: 3 },
            backgroundColor: '#fafbfc',
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
};