const BASE_URL = 'http://localhost:3000';

class ApiService {
  async request(endpoint, options = {}) {

    const { signal, headers, withCredentials = false, ...restOptions } = options;

    const config = {
      credentials: withCredentials ? 'include' : 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      signal, 
      ...restOptions,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.error || data.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }
      throw error;
    }
  }

  get(endpoint, headers = {}, withCredentials = false) {
    return this.request(endpoint, { method: 'GET', headers, withCredentials });
  }

  post(endpoint, body, headers = {}, withCredentials = false) {
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      withCredentials,
    });
  }


}

export const api = new ApiService();