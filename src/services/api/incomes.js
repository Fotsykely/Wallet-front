import { request } from '../../../utils/api/clientApi';

// Service pour les revenus (incomes)
export const incomesService = {
  getIncomes: () => request('/incomes'),
  getIncome: (id) => request(`/incomes/${id}`),
  createIncome: (data) => request('/incomes', { method: 'POST', data }),
  updateIncome: (id, data) => request(`/incomes/${id}`, { method: 'PUT', data }),
  deleteIncome: (id) => request(`/incomes/${id}`, { method: 'DELETE' }),
};