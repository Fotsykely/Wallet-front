import { request } from '@/utils/api/clientApi';

export const notificationService = {
  getAll: () => request('/notifications'),
  create: (type, message, title) => request('/notifications', {
    method: 'POST',
    data: { type, message, title }
  }),
  markAsRead: (id = null) => request('/notifications/read', {
    method: 'PUT',
    data: { id }
  }),
  delete: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),
  deleteAll: () => request('/notifications/all', { method: 'DELETE' })
};