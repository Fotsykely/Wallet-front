import React, { useState } from 'react';
import { 
  Box, Typography, List, ListItem, ListItemAvatar, 
  ListItemText, Avatar, IconButton, Paper, Chip 
} from '@mui/material';
import { 
  AccountBalanceWallet, Warning, CheckCircle, 
  Info, DeleteOutline, Check 
} from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'warning', title: 'Budget dépassé', message: 'Vous avez dépassé 80% de votre budget Alimentation.', date: 'Il y a 2 heures', read: false },
  { id: 2, type: 'success', title: 'Salaire reçu', message: 'Virement entrant de 2,500,000 Ar détecté.', date: 'Hier', read: true },
  { id: 3, type: 'info', title: 'Mise à jour système', message: 'La nouvelle version du Wallet est disponible.', date: 'Il y a 3 jours', read: true },
  { id: 4, type: 'warning', title: 'Facture impayée', message: 'Rappel : Facture JIRAMA arrive à échéance.', date: 'Il y a 4 jours', read: false },
];

export default function NotificationsPage() {
  const { isDark } = useOutletContext();
  const { show } = useNotifier();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    show('Toutes les notifications marquées comme lues', 'success');
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    show('Notification supprimée', 'info');
  };

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <Warning color="warning" />;
      case 'success': return <AccountBalanceWallet color="success" />;
      default: return <Info color="info" />;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" color={isDark ? 'white' : 'textPrimary'}>
          Récentes ({notifications.filter(n => !n.read).length} non lues)
        </Typography>
        <Chip 
          icon={<Check />} 
          label="Tout marquer comme lu" 
          onClick={handleMarkAllRead} 
          clickable 
          color="primary" 
          variant="outlined" 
        />
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: isDark ? '#18181b' : 'white',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <List>
          <AnimatePresence>
            {notifications.length === 0 && (
              <Box p={4} textAlign="center">
                <Typography color="text.secondary">Aucune notification</Typography>
              </Box>
            )}
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{ 
                    bgcolor: notif.read ? 'transparent' : (isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(25, 118, 210, 0.05)'),
                    borderBottom: `1px solid ${isDark ? '#374151' : '#f0f0f0'}`
                  }}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(notif.id)}>
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: isDark ? '#27272a' : '#f5f5f5' }}>
                      {getIcon(notif.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" pr={4}>
                        <Typography variant="subtitle1" fontWeight={notif.read ? 400 : 600}>
                          {notif.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notif.date}
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
    </Box>
  );
}