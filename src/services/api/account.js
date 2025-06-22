import {request} from '@/utils/api/clientApi.js';

export const accountsService = {
  getAccountDetails: (id) => request(`/accounts/${id}/details`),
};