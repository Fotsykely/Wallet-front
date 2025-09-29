import {request} from '@/utils/api/clientApi.js';

export const recurringService = {
  getRecurrings: (filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const url = params ? `/recurrings?${params}` : '/recurrings';
    return request(url);
  },

  getRecurringByAccountId: (accountId, filter = {}) => {
    return request(`/recurrings/account/${accountId}`, {
      params: filter
    });
  },

  createRecurring: (accountId, type, description, amount, recurrence, recurrenceDate) => {
    return request('/recurrings', {
      method: 'POST',
      data: {
        account_id: accountId,
        type,
        description,
        amount,
        recurrence,
        recurrence_date: recurrenceDate
      }
    });
  },

  updateRecurrings: (accountId, type, description, amount, recurrence, recurrenceDate) => {
    return request(`/recurrings/${accountId}`, {
      method: 'PUT',
      data: {
      type, 
      description,
      amount,
      recurrence,
      recurrence_date: recurrenceDate
      }
    });
  },

  deleteRecurring: (id) => {
    return request(`/recurrings/${id}`, {
      method: 'DELETE'
    });
  },
}; 