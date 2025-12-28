import { request } from '@/utils/api/clientApi';

export const budgetService = {
  getBudget: (account_id, month) =>
    request('/budgets', { params: { account_id, month } }),
  setBudget: (data) =>
    request('/budgets', { method: 'POST', data }),
};