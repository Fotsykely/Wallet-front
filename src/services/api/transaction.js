import {request} from '@/utils/api/clientApi.js';
import { Update } from '@mui/icons-material';

export const transactionService = {
  // Using: transactionService.getAccountTransaction(1, { month: '2026-03' })
  // or: transactionService.getAccountTransaction(1, { year: '2026' })
  // or: transactionService.getAccountTransaction(1, { date: '2026-03-15' })
  getAccountTransaction: (id, filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const url = params
      ? `/transactions/account/${id}?${params}`
      : `/transactions/account/${id}`;
    return request(url);
  },

  createTransaction: (id, date, category, description, amount) => {
    const today = new Date().toISOString().split('T')[0];
    const signedAmount = category === 'income' ? Math.abs(Number(amount)) : -Math.abs(Number(amount));
    return request(
      '/transactions',
      {
        method: 'POST',
        data: {
            "account_id": id,
            "date": date || today,
            "category": category,
            "description": description,
            "amount": signedAmount
        }
      }
    );
  },

  deleteTransaction: (id) => {
    return request(`/transactions/${id}`, {
      method: 'DELETE'
    });
  },

  UpdateTransaction: (id, date, category, description, amount) => {
    const signedAmount = category === 'income' ? Math.abs(Number(amount)) : -Math.abs(Number(amount));
    return request(
      `/transactions/${id}`,
      {
        method: 'PATCH',
        data: {
          "date": date,
          "category": category,
          "description": description,
          "amount": signedAmount
        }
      }
    );
  },
};