import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Avatar, 
  TextField, 
  InputAdornment,
  Badge,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Search, 
  Notifications, 
  KeyboardArrowDown,
  GetApp,
  CalendarToday
} from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Header = ({ onMenuClick, title = "Dashboard", subtitle = "This is your wallet overview" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer - 1
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: '64px !important' }}>
        {/* Menu button pour mobile */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ 
            mr: 2, 
            display: { xs: 'flex', md: 'none' },
            color: 'text.primary' 
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Titre et sous-titre */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              color: '#111827',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6b7280',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Section droite avec contrôles */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 2 },
          flexShrink: 0
        }}>
          {/* Période et Export (desktop uniquement) */}
          <Box sx={{ 
            display: { xs: 'none', lg: 'flex' }, 
            alignItems: 'center', 
            gap: 1 
          }}>
            <Button
              variant="outlined"
              startIcon={<CalendarToday />}
              size="small"
              sx={{
                textTransform: 'none',
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': {
                  borderColor: '#9ca3af'
                }
              }}
            >
              Last Week
            </Button>
            <Button
              variant="outlined"
              startIcon={<GetApp />}
              size="small"
              sx={{
                textTransform: 'none',
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': {
                  borderColor: '#9ca3af'
                }
              }}
            >
              Export
            </Button>
          </Box>

          {/* Barre de recherche (desktop) */}
          <TextField
            size="small"
            placeholder="What are you looking for?"
            sx={{ 
              display: { xs: 'none', lg: 'block' },
              width: '240px'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9ca3af', fontSize: '1.25rem' }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#f9fafb',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #6366f1'
                }
              }
            }}
          />

          {/* Notifications */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{ color: '#6b7280' }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Profile */}
          <Box 
            onClick={handleProfileClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            <Avatar 
              sx={{ width: 32, height: 32 }}
              alt="User Avatar"
            />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography 
                variant="body2" 
                sx={{ fontWeight: 500, color: '#111827', lineHeight: 1.2 }}
              >
                Adrian Halim
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ color: '#6b7280', lineHeight: 1.2 }}
              >
                adrian.halim@aserra.com
              </Typography>
            </Box>
            <KeyboardArrowDown sx={{ color: '#9ca3af' }} />
          </Box>
        </Box>

        {/* Menu profil */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* Menu notifications */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="body2">New transaction received</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body2">Weekly report available</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body2">Account limit reached</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};