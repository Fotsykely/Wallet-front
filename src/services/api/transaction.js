import {request} from '@/utils/api/clientApi.js';

export const transactionService = {
  getAccountTransaction: (id, filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const url = params
      ? `/transactions/account/${id}?${params}`
      : `/transactions/account/${id}`;
    return request(url);
  },
};