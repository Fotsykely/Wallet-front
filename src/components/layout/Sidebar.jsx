import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography,
  Divider,
  Button,
  Avatar,
  Chip,
  Switch
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Dashboard,
  AccountBalanceWallet, 
  Receipt, 
  Repeat,
  BarChart, 
  Settings,
  CreditCard,
  Notifications,
  HelpCenter,
  ExitToApp,
  TrendingUp,
  Home
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// MaterialUISwitch stylisé pour le dark mode
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const mainMenuItems = [
  { text: 'Dashboard', icon: Home, path: '/' },
  { text: 'Transactions', icon: Receipt, path: '/transactions' },
  { text: 'Recurrings', icon: Repeat, path: '/recurrings' },
  { text: 'Budgets', icon: AccountBalanceWallet, path: '/budgets' },
  { text: 'Analytics', icon: BarChart, path: '/analytics' },
];

const toolsMenuItems = [
  { text: 'Notifications', icon: Notifications, path: '/notifications' },
  { text: 'Settings', icon: Settings, path: '/settings' },
  // { text: 'Help Center', icon: HelpCenter, path: '/help' },
];

export const Sidebar = ({ variant = 'light', onToggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDark = variant === 'dark';
  const bgColor = isDark ? '#1a1a1a' : 'white';
  // const textColor = isDark ? 'white' : '#374151';
  const mutedTextColor = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#374151' : '#e5e7eb';

  const MenuItem = ({ item, isActive }) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton
        selected={isActive}
        onClick={() => navigate(item.path)}
        sx={{
          mx: 1,
          borderRadius: '12px',
          mb: 0.5,
          backgroundColor: isActive 
            ? isDark ? '#6366f1' : '#f0f9ff'
            : 'transparent',
          '&:hover': {
            backgroundColor: isActive 
              ? isDark ? '#5855eb' : '#e0f2fe'
              : isDark ? '#374151' : '#f9fafb',
          },
          '&.Mui-selected': {
            backgroundColor: isActive 
              ? isDark ? '#6366f1' : '#f0f9ff'
              : 'transparent',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <item.icon 
            sx={{ 
              color: isActive 
                ? isDark ? 'white' : '#0ea5e9'
                : isDark ? '#9ca3af' : '#6b7280',
              fontSize: 20,
              transition: 'color 0.2s ease',
            }} 
          />
        </ListItemIcon>
        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            fontSize: '14px',
            fontWeight: isActive ? 600 : 400,
            color: isActive 
              ? isDark ? 'white' : '#0ea5e9'
              : isDark ? 'white' : '#374151',
            transition: 'color 0.2s ease',
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box 
      sx={{ 
        backgroundColor: bgColor,
        borderRight: `1px solid ${borderColor}`,
        width: 260,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header avec logo */}
      <Box 
        sx={{ 
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center', // Centre horizontalement
          py: 3,
          px: 2,
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            color: isDark ? 'white' : '#6366f1',
            fontWeight: 800,
            fontSize: '1.9rem',
            letterSpacing: '0.5px',
            transition: 'color 0.3s ease',
          }}
        >
          Wallet
        </Typography>
      </Box>

      {/* Menu principal - prend tout l'espace disponible */}
      <Box sx={{ flex: 1, px: 2, overflow: 'auto' }}>
        <Typography 
          variant="caption" 
          className="block font-medium uppercase tracking-wider"
          sx={{ 
            color: mutedTextColor,
            px: 2,
            transition: 'color 0.3s ease',
           }}
        >
          Main Menu
        </Typography>
        <List dense>
          {mainMenuItems.map((item) => (
            <MenuItem 
              key={item.text}
              item={item} 
              isActive={location.pathname === item.path}
            />
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: borderColor, transition: 'border-color 0.3s ease' }} />

        {/* Outils */}
        <Typography 
          variant="caption" 
          className="px-4 py-2 block font-medium uppercase tracking-wider"
          sx={{ 
            color: mutedTextColor,
            px: 2,
            transition: 'color 0.3s ease',
          }}
        >
          Tools
        </Typography>
        <List dense>
          {toolsMenuItems.map((item) => (
            <MenuItem 
              key={item.text}
              item={item} 
              isActive={location.pathname === item.path}
            />
          ))}
        </List>
      </Box>

      {/* Footer avec Dark Mode Switch - reste en bas */}
      <Box 
        className="p-4 border-t"
        sx={{ 
          borderColor: borderColor,
          px: 2,
          pb: 5,
          flexShrink: 0,
          transition: 'border-color 0.3s ease',
        }}
      >
        <Box className="flex items-center justify-between">
          <Typography 
            variant="body2" 
            sx={{ 
              color: mutedTextColor,
              transition: 'color 0.3s ease',
            }}
          >
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Typography>
          <MaterialUISwitch 
            checked={isDark}
            onChange={onToggleTheme}
            sx={{ m: 1 }}
          />
        </Box>
      </Box>

    </Box>
  );
};

Sidebar.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark']),
  onToggleTheme: PropTypes.func.isRequired,
};