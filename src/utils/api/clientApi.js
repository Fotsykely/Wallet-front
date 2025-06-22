/* eslint-disable no-unused-vars */
// Centralisation des appels API avec logs

const API_URL = import.meta.env.VITE_API_URL;

function logRequest(method, endpoint, data) {
  console.log(`[API] ${method.toUpperCase()} ${endpoint}`, data || '');
}

function logResponse(endpoint, response) {
  console.log(`[API] Réponse ${endpoint}:`, response);
}

function logError(endpoint, error) {
  console.error(`[API] Erreur ${endpoint}:`, error);
}

export async function request(endpoint, { method = 'GET', data, params, headers } = {}) {
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const query = new URLSearchParams(params).toString();
    url += `?${query}`;
  }

  logRequest(method, url, data);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const contentType = res.headers.get('content-type');
    let responseData;
    if (contentType && contentType.includes('application/json')) {
      responseData = await res.json();
    } else {
      responseData = await res.text();
    }

    if (!res.ok) {
      logError(url, responseData);
      throw new Error(responseData?.error || res.statusText);
    }

    logResponse(url, responseData);
    return responseData;
  } catch (error) {
    logError(url, error);
    throw error;
  }
}