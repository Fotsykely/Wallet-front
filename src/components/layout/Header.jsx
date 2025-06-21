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

export const Header = ({ 
  onMenuClick, 
  title = "Dashboard", 
  subtitle = "This is your wallet overview",
  theme = 'light'
}) => {
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

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : 'white';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const titleColor = isDark ? 'white' : '#111827';
  const subtitleColor = isDark ? '#9ca3af' : '#6b7280';
  const buttonTextColor = isDark ? '#e5e7eb' : '#374151';
  const buttonBorderColor = isDark ? '#4b5563' : '#d1d5db';
  const buttonHoverBorderColor = isDark ? '#6b7280' : '#9ca3af';
  const searchBgColor = isDark ? '#374151' : '#f9fafb';
  const iconColor = isDark ? '#9ca3af' : '#6b7280';
  const hoverBgColor = isDark ? '#374151' : '#f9fafb';
  const menuBgColor = isDark ? '#2d2d2d' : 'white';

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: 'all 0.3s ease'
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
            color: titleColor,
            transition: 'color 0.3s ease'
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
              color: titleColor,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              transition: 'color 0.3s ease'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: subtitleColor,
              display: { xs: 'none', sm: 'block' },
              transition: 'color 0.3s ease'
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
                borderColor: buttonBorderColor,
                color: buttonTextColor,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: buttonHoverBorderColor,
                  backgroundColor: isDark ? '#374151' : 'rgba(0,0,0,0.04)'
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
                borderColor: buttonBorderColor,
                color: buttonTextColor,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: buttonHoverBorderColor,
                  backgroundColor: isDark ? '#374151' : 'rgba(0,0,0,0.04)'
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
                  <Search sx={{ 
                    color: iconColor, 
                    fontSize: '1.25rem',
                    transition: 'color 0.3s ease'
                  }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: searchBgColor,
                color: isDark ? 'white' : 'inherit',
                transition: 'all 0.3s ease',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #6366f1'
                },
                '& input::placeholder': {
                  color: iconColor,
                  opacity: 1
                }
              }
            }}
          />

          {/* Notifications */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{ 
              color: iconColor,
              transition: 'color 0.3s ease'
            }}
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
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: hoverBgColor
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
                sx={{ 
                  fontWeight: 500, 
                  color: titleColor, 
                  lineHeight: 1.2,
                  transition: 'color 0.3s ease'
                }}
              >
                Ando Razafy
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: subtitleColor, 
                  lineHeight: 1.2,
                  transition: 'color 0.3s ease'
                }}
              >
                andorazafymanantso@gmail.com
              </Typography>
            </Box>
            <KeyboardArrowDown sx={{ 
              color: iconColor,
              transition: 'color 0.3s ease'
            }} />
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
          PaperProps={{
            sx: {
              backgroundColor: menuBgColor,
              color: isDark ? 'white' : 'inherit',
              border: `1px solid ${borderColor}`,
              transition: 'all 0.3s ease',
              '& .MuiMenuItem-root': {
                color: isDark ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: isDark ? '#374151' : 'rgba(0,0,0,0.04)'
                }
              }
            }
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
          PaperProps={{
            sx: {
              backgroundColor: menuBgColor,
              color: isDark ? 'white' : 'inherit',
              border: `1px solid ${borderColor}`,
              transition: 'all 0.3s ease',
              '& .MuiMenuItem-root': {
                color: isDark ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: isDark ? '#374151' : 'rgba(0,0,0,0.04)'
                }
              }
            }
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
  theme: PropTypes.oneOf(['light', 'dark']),
};