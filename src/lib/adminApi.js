const API_URL = 'https://api.itsvenox.de/api';
const TOKEN_KEY = 'venox_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    clearToken();
    window.location.reload();
    throw new Error('Unauthorized');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const adminApi = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request('/auth/me'),
  listContacts: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
    ).toString();
    return request(`/admin/contacts${qs ? '?' + qs : ''}`);
  },
  getContact: (id) => request(`/admin/contacts/${id}`),
  updateContact: (id, patch) =>
    request(`/admin/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),
  deleteContact: (id) =>
    request(`/admin/contacts/${id}`, { method: 'DELETE' }),
  stats: () => request('/admin/stats'),
};