import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { notificationService } from '@/services/api/notifications';

export const NotifierContext = createContext(null);

export const useNotifier = () => {
  const ctx = useContext(NotifierContext);
  if (!ctx) throw new Error('useNotifier must be used within NotificationProvider');
  return ctx;
};

export const NotifierController = () => {
  // État Snackar (Visuel éphémère)
  const [snackbar, setSnackbar] = useState({
    open: false, message: '', severity: 'success', autoHide: 3000
  });

  // État Historique (Persistant via DB)
  const [notifications, setNotifications] = useState([]);

  // Charger les notifications au démarrage
  const refreshNotifications = useCallback(async () => {
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  }, []);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  // Periodic refresh every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      refreshNotifications();
    }, 7000); // Every 7 seconds
    return () => clearInterval(timer);
  }, [refreshNotifications]);
  
  /**
   * Afficher une notification
   */
  const show = useCallback(async (message, severity = 'success', options = {}) => {
    // 1. Visuel immédiat
    setSnackbar(s => ({ ...s, open: true, message, severity, ...options }));

    // 2. Persistance en DB (sauf si skipHistory demandé)
    if (!options.skipHistory) {
      try {
        const title = severity === 'error' ? 'Erreur' : severity === 'warning' ? 'Attention' : 'Info';
        // Optimistic update pour l'UI instantanée
        const tempId = Date.now();
        const pendingNotif = { 
            id: tempId, message, type: severity, title, 
            read: false, created_at: new Date().toISOString() 
        };
        setNotifications(prev => [pendingNotif, ...prev]);

        // Appel API réel
        await notificationService.create(severity, message, title);
        
        // Rafraîchir pour avoir les vrais ID de la DB
        refreshNotifications();
      } catch (err) {
        console.error("Failed to save notification", err);
      }
    }
  }, [refreshNotifications]);

  const hide = useCallback(() => setSnackbar(s => ({ ...s, open: false })), []);

  const markAsRead = async (id) => {
    // Optimistic
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    await notificationService.markAsRead(id);
    refreshNotifications();
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    await notificationService.markAsRead(null);
    refreshNotifications();
  };

  const deleteNotification = async (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    await notificationService.delete(id);
  };

  const clearAll = async () => {
    setNotifications([]);
    await notificationService.deleteAll();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    snackbar,
    notifications,
    unreadCount,
    show,
    hide,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    refreshNotifications
  };
};