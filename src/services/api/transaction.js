import {request} from '@/utils/api/clientApi.js';

export const transactionService = {
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
  }
};