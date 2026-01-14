import {request} from '@/utils/api/clientApi.js';

export const accountsService = {
  getAccountDetails: (id, includePercentages = false, comparisonDays = 7) => {
    return request(`/accounts/${id}/details`, {
      params: {
        includePercentages,
        comparisonDays
      }
    });
  },

  getAccountAnalysis: (id, filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const url = params ? `/accounts/${id}/analysis?${params}` : `/accounts/${id}/analysis`;
    return request(url);
  },

  // new: get raw account and update account
  getAccount: (id) => request(`/accounts/${id}`),
  updateAccount: (id, data) => request(`/accounts/${id}`, { method: 'PUT', data }),
};