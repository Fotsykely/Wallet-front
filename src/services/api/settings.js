import { request } from '@/utils/api/clientApi';

export const settingsService = {
  // Récupérer les params globaux
  getSettings: () => request('/maintenance/settings'),
  
  // Sauvegarder une clé (ex: user_email)
  saveSetting: (key, value) => request('/maintenance/settings', {
    method: 'POST',
    data: { key, value }
  }),

  // Export JSON
  exportData: () => request('/maintenance/export'),

  // Import JSON
  importData: (jsonData) => request('/maintenance/import', {
    method: 'POST',
    data: { data: jsonData }
  }),

  // Reset DB
  resetData: () => request('/maintenance/reset', { method: 'DELETE' })
};