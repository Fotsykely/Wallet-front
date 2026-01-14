/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, List, ListItem, ListItemAvatar, 
  ListItemText, Avatar, IconButton, Paper, Chip, Button
  , Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { 
  AccountBalanceWallet, Warning, CheckCircle, 
  Info, DeleteOutline, Check, DeleteSweep
} from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function NotificationsPage() {
  const { isDark } = useOutletContext();
  
  // AJOUT DE VALEURS PAR DÉFAUT pour éviter le crash si le contexte est vide
  const { 
    notifications = [], 
    markAsRead = () => {},   
    markAllAsRead = () => {}, 
    deleteNotification = () => {}, 
    clearAll = () => {},
    unreadCount = 0,
    show = () => {},
    refreshNotifications
  } = useNotifier() || {};
  
  // Automatic refresh on opening the page
  useEffect(() => {
    if (typeof refreshNotifications === 'function') refreshNotifications();
  }, [refreshNotifications]);

  // Modal to show notification details and make as read
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

  const handleOpen = (notif) => {
    setSelectedNotif(notif);
    setOpenDialog(true);
  };
  const handleClose = () => {
    setSelectedNotif(null);
    setOpenDialog(false);
  };
  const handleMarkAsRead = async () => {
    if (!selectedNotif) return;
    await markAsRead(selectedNotif.id);
    show('Notification marquée comme lue', 'success', { skipHistory: true });
    handleClose();
  };

  // 2. SÉCURISATION : On s'assure que c'est bien un tableau
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  const handleMarkAllRead = () => {
    markAllAsRead();
    show('Toutes les notifications marquées comme lues', 'success', { skipHistory: true });
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };

  const handleClearAll = () => {
    if(confirm('Voulez-vous vraiment effacer tout l\'historique des notifications ?')) {
      clearAll();
      show('Historique effacé', 'info', { skipHistory: true });
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Warning color="error" />;
      case 'success': return <CheckCircle color="success" />;
      default: return <Info color="info" />;
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return `${date.toLocaleDateString()} à ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } catch (e) {
      return '';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h6" color={isDark ? 'white' : 'textPrimary'}>
          Historique ({unreadCount} non lues)
        </Typography>
        <Box display="flex" gap={1}>
          {/* 3. UTILISATION DE LA VARIABLE SÉCURISÉE safeNotifications.length */}
          {safeNotifications.length > 0 && (
            <Button 
              startIcon={<DeleteSweep />} 
              onClick={handleClearAll}
              color="error"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Tout effacer
            </Button>
          )}
          <Chip 
            icon={<Check />} 
            label="Tout marquer comme lu" 
            onClick={handleMarkAllRead} 
            clickable 
            color="primary" 
            variant="outlined" 
            disabled={unreadCount === 0}
          />
        </Box>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: isDark ? '#18181b' : 'white',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          borderRadius: 2,
          overflow: 'hidden',
          minHeight: 200
        }}
      >
        <List disablePadding>
          <AnimatePresence mode="popLayout">
            {/* 4. UTILISATION DE safeNotifications PARTOUT */}
            {safeNotifications.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Box p={6} textAlign="center">
                  <Typography color="text.secondary" variant="body1">
                      Aucune notification pour le moment.
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      Les alertes de budget, confirmation de sauvegarde et erreurs apparaîtront ici.
                  </Typography>
                </Box>
              </motion.div>
            )}
            
            {safeNotifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ListItem
                  button
                  alignItems="flex-start"
                  sx={{ 
                    bgcolor: notif.read ? 'transparent' : (isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(25, 118, 210, 0.04)'),
                    borderBottom: `1px solid ${isDark ? '#374151' : '#f0f0f0'}`,
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' }
                  }}
                  secondaryAction={
                    <IconButton edge="end" onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }} title="Supprimer">
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  }
                  onClick={() => handleOpen(notif)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: isDark ? '#27272a' : '#f5f5f5' }}>
                      {getIcon(notif.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" pr={4} flexWrap="wrap">
                        <Typography variant="subtitle1" fontWeight={notif.read ? 400 : 700} color={isDark ? 'white' : 'textPrimary'}>
                          {notif.title || 'Notification'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(notif.created_at)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" mt={0.5}>
                        {notif.message}
                      </Typography>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{selectedNotif?.title || 'Notification'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedNotif?.message}
          </DialogContentText>
          <Box mt={1} color="text.secondary" fontSize="0.85rem">
            {selectedNotif?.created_at ? formatDate(selectedNotif.created_at) : ''}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={handleMarkAsRead} color="primary" variant="contained">Marquer comme lu</Button>
        </DialogActions>
      </Dialog>
     </Box>
   );
 }