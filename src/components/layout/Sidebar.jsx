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
  Chip
} from '@mui/material';
import { 
  Dashboard,
  AccountBalanceWallet, 
  Receipt, 
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

const mainMenuItems = [
  { text: 'Dashboard', icon: Home, path: '/' },
  { text: 'My Cards', icon: CreditCard, path: '/cards' },
  { text: 'Transactions', icon: Receipt, path: '/transactions' },
  { text: 'Wallet', icon: AccountBalanceWallet, path: '/wallet' },
  { text: 'Analytics', icon: BarChart, path: '/analytics' },
];

const toolsMenuItems = [
  { text: 'Notifications', icon: Notifications, path: '/notifications' },
  { text: 'Settings', icon: Settings, path: '/settings' },
  { text: 'Help Center', icon: HelpCenter, path: '/help' },
];

export const  Sidebar = ({ variant = 'light' }) => {
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
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <item.icon 
            sx={{ 
              color: isActive 
                ? isDark ? 'white' : '#0ea5e9'
                : isDark ? '#9ca3af' : '#6b7280',
              fontSize: 20
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
              : isDark ? 'white' : '#374151'
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box 
      className="h-full flex flex-col"
      sx={{ 
        backgroundColor: bgColor,
        borderRight: `1px solid ${borderColor}`,
        width: 260,
        height: '100vh',
      }}
    >
      {/* Header avec logo */}
      <Box className="p-6 pb-4">
        <Box className="flex items-center gap-3">
            <Typography 
              variant="h5" 
              className="font-bold"
              sx={{ 
                color: isDark ? 'white' : '#6366f1',
                fontWeight: 800,
                textAlign: 'center', 
              }}
            >
              Wallet
            </Typography>
        </Box>
      </Box>

      {/* Menu principal */}
      <Box className="flex-1 px-2">
        <Typography 
          variant="caption" 
          className="px-4 py-2 block font-medium uppercase tracking-wider"
          sx={{ color: mutedTextColor }}
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

        <Divider sx={{ my: 2, borderColor: borderColor }} />

        {/* Outils */}
        <Typography 
          variant="caption" 
          className="px-4 py-2 block font-medium uppercase tracking-wider"
          sx={{ color: mutedTextColor }}
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

      {/* Section upgrade (style Aserra) */}
      {isDark && (
        <Box className="p-4 m-4 rounded-xl" sx={{ backgroundColor: '#0f172a' }}>
          <Typography variant="h6" className="font-semibold text-white mb-1">
            Upgrade to Pro!
          </Typography>
          <Typography variant="body2" className="text-gray-400 mb-3">
            Unlock all Aserra features by upgrading to Pro.
          </Typography>
          <Button 
            variant="contained" 
            fullWidth
            className="normal-case font-medium"
            sx={{ 
              backgroundColor: 'white',
              color: '#0f172a',
              '&:hover': {
                backgroundColor: '#f1f5f9'
              }
            }}
          >
            Upgrade Now
          </Button>
        </Box>
      )}

      {/* Footer avec profil */}
      <Box 
        className="p-4 border-t"
        sx={{ borderColor: borderColor }}
      >
        <Box className="flex items-center gap-3">
          <Avatar 
            src="/api/placeholder/40/40"
            className="w-10 h-10"
          />
          <Box className="flex-1">
            <Typography 
              variant="body2" 
              className="font-medium"
              sx={{ color: isDark ? 'white' : '#374151' }}
            >
              {isDark ? 'Adrian Halim' : 'Hanna Kirana'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ color: mutedTextColor }}
            >
              {isDark ? 'Premium User' : 'Manager'}
            </Typography>
          </Box>
          <ListItemButton
            onClick={() => navigate('/logout')}
            sx={{ 
              minWidth: 'auto',
              width: 32,
              height: 32,
              borderRadius: '8px'
            }}
          >
            <ExitToApp 
              sx={{ 
                fontSize: 18,
                color: isDark ? '#9ca3af' : '#6b7280'
              }} 
            />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};