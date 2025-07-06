import {request} from '@/utils/api/clientApi.js';

export const accountsService = {
  getAccountDetails: (id) => request(`/accounts/${id}/details`),

  getAccountAnalysis: (id, filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const url = params
      ? `/accounts/${id}/analysis?${params}`
      : `/accounts/${id}/analysis`;
    return request(url);
  },
};