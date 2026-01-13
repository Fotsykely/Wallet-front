import React, { useCallback, useState } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NotifierContext } from './NotifierContext'; // Importez le contexte ici

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState({
    open: false, message: '', severity: 'success', autoHide: 3000,
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
  });

  const show = useCallback((message, severity = 'success', options = {}) => {
    setState(s => ({ ...s, open: true, message, severity, ...options }));
  }, []);

  const hide = useCallback(() => setState(s => ({ ...s, open: false })), []);

  return (
    <NotifierContext.Provider value={{ show, hide }}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={state.autoHide}
        onClose={hide}
        anchorOrigin={state.anchorOrigin}
      >
        <Alert
          onClose={hide}
          severity={state.severity}
          sx={{ width: '100%' }}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={hide}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {state.message}
        </Alert>
      </Snackbar>
    </NotifierContext.Provider>
  );
};
