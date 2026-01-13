import { createContext, useContext } from 'react';

// Création du contexte (non exporté par défaut, mais nommé)
export const NotifierContext = createContext(null);

// Le hook personnalisé est maintenant isolé ici
export const useNotifier = () => {
  const ctx = useContext(NotifierContext);
  if (!ctx) throw new Error('useNotifier must be used within NotificationProvider');
  return ctx;
};