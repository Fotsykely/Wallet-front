import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NotifierContext, NotifierController } from './NotifierContext';

export const NotificationProvider = ({ children }) => {
  // Récupère le controller (utilise les hooks internes)
  const controller = NotifierController();
  const { snackbar = {}, hide } = controller;

  return (
    <NotifierContext.Provider value={controller}>
      {children}
      <Snackbar
        open={!!snackbar.open}
        autoHideDuration={snackbar.autoHide}
        onClose={hide}
        anchorOrigin={snackbar.anchorOrigin || { vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={hide}
          severity={snackbar.severity || 'success'}
          sx={{ width: '100%' }}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={hide}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </NotifierContext.Provider>
  );
};
