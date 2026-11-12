export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
  error?: string;
}

export interface ApiKeyItem {
  id: string;
  provider: string;
  name: string;
  key_hint: string;
  is_active: boolean;
  created_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  api_key?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyPolicy {
  id: string;
  company_id: string;
  title: string;
  file_name: string;
  file_size?: string;
  r2_url?: string;
  r2_key?: string;
  chunk_count?: number;
  pinecone_file_id?: string;
  status: string;
  created_at: string;
}

export interface ChatbotApiKeyItem {
  id: string;
  company_id: string;
  name: string;
  api_key: string;
  key_hint: string;
  is_active: boolean;
  last_used_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UnipileSettings {
  id?: string;
  provider: string;
  api_key_masked?: string;
  webhook_url?: string;
  account_id?: string;
  is_active: boolean;
  updated_at?: string;
}

/**
 * Register a new user account
 */
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || 'Failed to register' };
    }
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Cannot connect to backend server. Make sure it is running on port 8000.',
    };
  }
}

/**
 * Log in an existing user
 */
export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || 'Invalid email or password' };
    }
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Cannot connect to backend server. Make sure it is running on port 8000.',
    };
  }
}

/**
 * Fetch authenticated user profile
 */
export async function getProfile(token: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || 'Unauthorized' };
    }
    return result;
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Check backend and database health
 */
export async function checkBackendHealth(): Promise<{ status: string; database?: any }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return await res.json();
  } catch {
    return { status: 'offline' };
  }
}

/**
 * Fetch all saved API keys
 */
export async function fetchApiKeys(
  token: string
): Promise<{ success: boolean; data?: ApiKeyItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/api-keys`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Save an API Key
 */
export async function saveApiKey(
  data: { provider: string; name: string; api_key: string },
  token: string
): Promise<{ success: boolean; data?: ApiKeyItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/api-keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Delete an API key
 */
export async function deleteApiKey(
  id: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/api-keys/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  data: { name?: string; avatar_url?: string },
  token: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Change user password
 */
export async function changePassword(
  data: { currentPassword: string; newPassword: string },
  token: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Test AI Generation
 */
export async function generateAI(
  data: { prompt: string; provider?: string; model?: string },
  token: string
): Promise<{
  success: boolean;
  response?: string;
  provider?: string;
  model?: string;
  tokens?: number;
  durationMs?: number;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

// ==========================================
// Company & Policies API
// ==========================================

export async function getMyCompany(token: string): Promise<{
  success: boolean;
  company?: Company | null;
  companies?: Company[];
  pineconeConfigured?: boolean;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/companies/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function deleteCompany(
  id: string,
  token: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/companies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function createCompany(
  data: { name: string; description?: string; industry?: string; website?: string },
  token: string
): Promise<{ success: boolean; company?: Company; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function updateCompany(
  id: string,
  data: { name?: string; description?: string; industry?: string; website?: string },
  token: string
): Promise<{ success: boolean; company?: Company; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function uploadCompanyPolicy(
  data: {
    company_id: string;
    title: string;
    file_name: string;
    file_size?: string;
    file?: File | null;
    file_base64?: string;
  },
  token: string
): Promise<{ success: boolean; policy?: CompanyPolicy; message?: string; error?: string; pineconeConfigured?: boolean }> {
  try {
    let res: Response;
    if (data.file) {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('company_id', data.company_id);
      formData.append('title', data.title);
      formData.append('file_name', data.file_name);
      if (data.file_size) formData.append('file_size', data.file_size);

      res = await fetch(`${API_BASE}/api/companies/policies`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } else {
      res = await fetch(`${API_BASE}/api/companies/policies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    }
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function regenerateCompanyApiKey(token: string, companyId?: string): Promise<{
  success: boolean;
  api_key?: string;
  message?: string;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/chatbot/regenerate-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ company_id: companyId }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function fetchChatbotKeys(token: string, companyId?: string): Promise<{
  success: boolean;
  primaryKey?: string;
  keys?: ChatbotApiKeyItem[];
  companyId?: string;
  companyName?: string;
  error?: string;
}> {
  try {
    const query = companyId ? `?company_id=${encodeURIComponent(companyId)}` : '';
    const res = await fetch(`${API_BASE}/api/chatbot/keys${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function createChatbotKey(
  data: { name: string; company_id?: string },
  token: string
): Promise<{
  success: boolean;
  message?: string;
  key?: ChatbotApiKeyItem;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/chatbot/keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function deleteChatbotKey(
  id: string,
  token: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/chatbot/keys/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function queryChatbot(params: {
  message: string;
  apiKey: string;
}): Promise<{
  success: boolean;
  response?: string;
  company?: string;
  sources?: Array<{ title?: string; file_name?: string; score?: number }>;
  durationMs?: number;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/chatbot/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': params.apiKey,
      },
      body: JSON.stringify({ message: params.message }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function getCompanyPolicies(
  companyId: string,
  token: string
): Promise<{ success: boolean; policies?: CompanyPolicy[]; pineconeConfigured?: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/companies/${companyId}/policies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function deleteCompanyPolicy(
  id: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/companies/policies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

// ==========================================
// Email & Unipile Settings API
// ==========================================

export async function getUnipileSettings(token: string): Promise<{
  success: boolean;
  settings?: UnipileSettings | null;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/email/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function saveUnipileSettings(
  data: { api_key: string; webhook_url?: string; account_id?: string },
  token: string
): Promise<{ success: boolean; settings?: UnipileSettings; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/email/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

// Token & User localStorage helpers
export const AuthStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },
  setToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
  },
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const str = localStorage.getItem('auth_user');
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  },
  setUser(user: User) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_user', JSON.stringify(user));
  },
  clear() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
};
