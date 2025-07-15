import {request} from '@/utils/api/clientApi.js';

export const accountsService = {
  getAccountDetails: (id, includePercentages = false, comparisonDays = 7) => {
    return request(`/accounts/${id}/details`, {
      params: {
        includePercentages: includePercentages, // Inclure les pourcentages de variation
        comparisonDays: comparisonDays // Comparer avec les 7 derniers jours
      }
    });
  },

  getAccountAnalysis: (id, filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const url = params
      ? `/accounts/${id}/analysis?${params}`
      : `/accounts/${id}/analysis`;
    return request(url);
  },
};