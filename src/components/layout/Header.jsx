/* eslint-disable no-unused-vars */
import { 
  AppBar, Toolbar, IconButton, Typography, Box, Avatar, 
  TextField, InputAdornment, Badge, Menu, MenuItem, 
  Button, Divider, ListItemText, ListItemIcon
} from '@mui/material';
import { 
  Menu as MenuIcon, Search, Notifications, 
  KeyboardArrowDown, GetApp, CalendarToday,
  DoneAll, Circle
} from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';

export const Header = ({ 
  onMenuClick, 
  title = "Dashboard", 
  subtitle = "This is your wallet overview",
  theme = 'light'
}) => {
  const navigate = useNavigate();
  
  // Sécuriser la récupération du contexte avec des valeurs par défaut
  const { 
    unreadCount = 0, 
    notifications = [], 
    markAllAsRead = () => {} 
  } = useNotifier() || {};

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  
  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleViewAllNotifications = () => {
    handleClose();
    navigate('/notifications');
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : 'white';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const titleColor = isDark ? 'white' : '#111827';
  const subtitleColor = isDark ? '#9ca3af' : '#6b7280';
  const iconColor = isDark ? '#9ca3af' : '#6b7280';
  const menuBgColor = isDark ? '#2d2d2d' : 'white';
  const buttonTextColor = isDark ? '#e5e7eb' : '#374151';
  const buttonBorderColor = isDark ? '#4b5563' : '#d1d5db';
  const searchBgColor = isDark ? '#374151' : '#f9fafb';

  // Sécuriser l'accès au tableau avant le slice
  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const recentNotifications = safeNotifications.slice(0, 5);

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
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, color: titleColor }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: titleColor, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: subtitleColor, display: { xs: 'none', sm: 'block' } }}>
            {subtitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
          
          {/* Période et Export (desktop uniquement) */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
            {/* <Button
              variant="outlined"
              startIcon={<CalendarToday />}
              size="small"
              sx={{
                textTransform: 'none',
                borderColor: buttonBorderColor,
                color: buttonTextColor,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: buttonBorderColor,
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
                  borderColor: buttonBorderColor,
                  backgroundColor: isDark ? '#374151' : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Export
            </Button> */}
          </Box>
          

          {/* Barre de recherche (desktop) */}
          {/* <TextField
            size="small"
            placeholder="Rechercher..."
            sx={{ display: { xs: 'none', lg: 'block' }, width: '200px' }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Search sx={{ color: iconColor }} /></InputAdornment>),
              sx: { backgroundColor: searchBgColor, color: titleColor, '& fieldset': { border: 'none' } }
            }}
          /> */}

          {/* --- NOTIFICATIONS --- */}
          <IconButton onClick={handleNotificationClick} sx={{ color: iconColor }}>
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* --- PROFILE --- */}
          <Box 
            onClick={handleProfileClick}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer',
              padding: '4px 8px', borderRadius: '8px',
              '&:hover': { backgroundColor: isDark ? '#374151' : '#f9fafb' }
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: titleColor }}>Mon Compte</Typography>
            </Box>
            <KeyboardArrowDown sx={{ color: iconColor }} />
          </Box>
        </Box>

        {/* Menu Profil */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { bgcolor: menuBgColor, color: titleColor, border: `1px solid ${borderColor}` } }}
        >
          <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Paramètres</MenuItem>
          <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
        </Menu>

        {/* --- MENU NOTIFICATIONS DYNAMIQUE --- */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleClose}
          PaperProps={{ 
            sx: { 
              width: 320, 
              maxHeight: 480, 
              bgcolor: menuBgColor, 
              color: titleColor, 
              border: `1px solid ${borderColor}` 
            } 
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
            {unreadCount > 0 && (
              <IconButton size="small" onClick={markAllAsRead} title="Tout marquer comme lu">
                <DoneAll fontSize="small" color="primary" />
              </IconButton>
            )}
          </Box>
          <Divider sx={{ borderColor: borderColor }} />
          
          {safeNotifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
               <Typography variant="body2" color="text.secondary">Aucune notification récente</Typography>
            </Box>
          ) : (
            recentNotifications.map((notif) => (
              <MenuItem 
                key={notif.id} 
                onClick={handleViewAllNotifications} 
                sx={{ 
                  whiteSpace: 'normal', 
                  borderLeft: notif.read ? 'none' : `3px solid #6366f1`,
                  bgcolor: notif.read ? 'transparent' : (isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(25, 118, 210, 0.04)')
                }}
              >
                <ListItemText 
                  primary={notif.title || notif.type} 
                  secondary={
                    <>
                      <Typography component="span" variant="body2" display="block" color="text.primary" sx={{ my: 0.5 }}>
                        {notif.message}
                      </Typography>
                      <Typography component="span" variant="caption" color="text.secondary">
                        {new Date(notif.created_at).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              </MenuItem>
            ))
          )}
          <Divider sx={{ borderColor: borderColor }} />
          <MenuItem onClick={handleViewAllNotifications} sx={{ justifyContent: 'center', color: 'primary.main', fontWeight: 600 }}>
            Voir tout l'historique
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