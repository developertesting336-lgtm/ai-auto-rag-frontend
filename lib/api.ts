import { BACKEND_URL } from '../config';

export const API_BASE = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  BACKEND_URL ||
  process.env.BACKEND_URL ||
  'https://ai-auto-rag-backend.vercel.app'
).replace(/\/+$/, '');

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

export interface AiModelItem {
  id: string;
  user_id: string;
  name: string;
  provider: string;
  model_name: string;
  key_hint: string;
  base_url?: string;
  temperature?: string | number;
  max_tokens?: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface EmailCampaignItem {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  webhook_token: string;
  webhook_url: string;
  unipile_key_hint?: string;
  unipile_account_id?: string;
  unipile_dsn?: string;
  ai_model_id?: string;
  ai_model_name?: string;
  ai_provider?: string;
  ai_prompt: string;
  status: string; // 'active', 'paused'
  total_received: number;
  total_replied: number;
  created_at: string;
  updated_at: string;
  logs?: CampaignEmailLogItem[];
}

export interface CampaignEmailLogItem {
  id: string;
  campaign_id: string;
  user_id?: string;
  message_id?: string;
  account_id?: string;
  from_email?: string;
  from_name?: string;
  to_email?: string;
  subject?: string;
  snippet?: string;
  body?: string;
  reply_status: string;
  ai_generated_reply?: string;
  ai_model_used?: string;
  error_message?: string;
  created_at: string;
}

export interface UnipileSettings {
  id?: string;
  provider: string;
  api_key_masked?: string;
  webhook_token?: string;
  webhook_url?: string;
  account_id?: string;
  ai_prompt?: string;
  is_active: boolean;
  updated_at?: string;
}

export interface InboundEmailItem {
  id: string;
  user_id: string;
  account_id?: string;
  message_id?: string;
  from_email: string;
  from_name?: string;
  to_email?: string;
  subject: string;
  snippet?: string;
  body?: string;
  reply_status: string;
  reply_text?: string;
  raw_payload?: any;
  created_at: string;
}

export interface BillingPlanItem {
  id: string;
  name: string;
  price: number;
  amount: number;
  currency: string;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan_id: string;
  plan_name: string;
  amount: number;
  currency: string;
  interval: string;
  status: 'active' | 'past_due' | 'canceled' | 'inactive' | 'trialing' | 'unpaid';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentItem {
  id: string;
  user_id: string;
  stripe_payment_intent_id?: string;
  stripe_invoice_id?: string;
  amount: number; // in cents
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  plan_id?: string;
  plan_name?: string;
  receipt_url?: string;
  invoice_pdf?: string;
  failure_reason?: string;
  paid_at?: string;
  created_at: string;
}

export interface BillingStatusResponse {
  success: boolean;
  hasActiveSubscription: boolean;
  isTrialActive?: boolean;
  isTrialExpired?: boolean;
  isPaid?: boolean;
  trialDaysRemaining?: number;
  trialEndsAt?: string | null;
  status: string;
  subscription?: UserSubscription | null;
  paymentDue?: string | null;
  isPastDue: boolean;
  plans: BillingPlanItem[];
  error?: string;
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
 * Update an existing API key (name and/or api_key)
 */
export async function updateApiKey(
  id: string,
  data: { name?: string; api_key?: string; provider?: string },
  token: string
): Promise<{ success: boolean; data?: ApiKeyItem; error?: string; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/api-keys/${id}`, {
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
): Promise<{ success: boolean; message?: string; error?: string }> {
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
  data: { api_key?: string; webhook_url?: string; account_id?: string; ai_prompt?: string },
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

export async function saveEmailPrompt(
  prompt: string,
  token: string
): Promise<{ success: boolean; ai_prompt?: string; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/email/prompt`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function fetchInboundEmails(token: string): Promise<{
  success: boolean;
  emails?: InboundEmailItem[];
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/email/inbound`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function fetchInboundEmailById(
  id: string,
  token: string
): Promise<{
  success: boolean;
  email?: InboundEmailItem;
  unipileLive?: any;
  unipileNote?: string;
  source?: string;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/email/inbound/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function simulateInboundEmail(
  data: { from_name?: string; from_email?: string; subject?: string; body?: string },
  token: string
): Promise<{ success: boolean; email?: InboundEmailItem; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/email/simulate`, {
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
 * Fetch subscription status and available plans
 */
export async function fetchBillingStatus(token: string): Promise<BillingStatusResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      hasActiveSubscription: false,
      status: 'unpaid',
      isPastDue: false,
      plans: [],
      error: err.message || 'Connection error',
    };
  }
}

/**
 * Fetch past payments and invoices history
 */
export async function fetchPaymentHistory(
  token: string
): Promise<{ success: boolean; payments?: PaymentItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/history`, {
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
 * Create Stripe Checkout Session
 */
export async function createCheckoutSession(
  planId: string,
  token: string
): Promise<{ success: boolean; url?: string; sessionId?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ planId }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Create Stripe Customer Portal Session
 */
export async function createCustomerPortal(
  token: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Simulate or Test Payment Success directly (Instant Sandbox Activation)
 */
export async function simulatePaymentSuccess(
  planId: string,
  token: string
): Promise<{ success: boolean; subscription?: UserSubscription; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/simulate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ planId }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Developer helper: adjust trial between Active 7-day trial and Expired trial
 */
export async function adjustTrialPeriod(
  action: 'reset' | 'expire',
  token: string
): Promise<{ success: boolean; message?: string; error?: string; [key: string]: any }> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/adjust-trial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

/**
 * Permanently empty payments history table
 */
export async function clearPaymentHistory(
  token: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/billing/clear-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

// =========================================================================
// AI MODELS API CLIENT
// =========================================================================

export async function fetchAiModels(
  token: string
): Promise<{ success: boolean; models?: AiModelItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai-models`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function createAiModel(
  token: string,
  payload: {
    name: string;
    provider: string;
    model_name?: string;
    api_key: string;
    base_url?: string;
    temperature?: number;
    max_tokens?: number;
  }
): Promise<{ success: boolean; message?: string; model?: AiModelItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai-models`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function updateAiModel(
  token: string,
  id: string,
  payload: Partial<AiModelItem> & { api_key?: string }
): Promise<{ success: boolean; message?: string; model?: AiModelItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai-models/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function deleteAiModel(
  token: string,
  id: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai-models/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function testAiModel(
  token: string,
  id: string,
  prompt?: string
): Promise<{ success: boolean; message?: string; reply?: string; durationMs?: number; tokens?: number; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai-models/${id}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

// =========================================================================
// EMAIL CAMPAIGNS API CLIENT (UNIPILE WEBHOOK & PROMPT AUTOMATION)
// =========================================================================

export async function fetchCampaigns(
  token: string
): Promise<{ success: boolean; campaigns?: EmailCampaignItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function createCampaign(
  token: string,
  payload: {
    name: string;
    description?: string;
    unipile_api_key?: string;
    unipile_account_id?: string;
    unipile_dsn?: string;
    ai_model_id?: string;
    ai_prompt: string;
    status?: string;
  }
): Promise<{ success: boolean; message?: string; campaign?: EmailCampaignItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function fetchCampaignById(
  token: string,
  id: string
): Promise<{ success: boolean; campaign?: EmailCampaignItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function updateCampaign(
  token: string,
  id: string,
  payload: Partial<EmailCampaignItem> & { unipile_api_key?: string }
): Promise<{ success: boolean; message?: string; campaign?: EmailCampaignItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function deleteCampaign(
  token: string,
  id: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function simulateCampaignTrigger(
  token: string,
  id: string,
  payload: {
    from_email?: string;
    from_name?: string;
    subject?: string;
    body?: string;
  }
): Promise<{
  success: boolean;
  message?: string;
  reply?: string;
  durationMs?: number;
  modelUsed?: string;
  log?: CampaignEmailLogItem;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns/${id}/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Connection error' };
  }
}

export async function fetchCampaignLogs(
  token: string,
  id: string
): Promise<{ success: boolean; logs?: CampaignEmailLogItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns/${id}/logs`, {
      headers: { Authorization: `Bearer ${token}` },
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

// ============================================================================
// HEALTH & PUSH NOTIFICATIONS API
// ============================================================================

export interface ModelHealthItem {
  id: string;
  name: string;
  provider: string;
  model_name?: string;
  key_hint: string;
  temperature?: string | number;
  is_active: boolean;
  created_at: string;
  health: {
    status: 'healthy' | 'error' | 'untested';
    latency_ms: number | null;
    error_message: string | null;
    check_type: string | null;
    last_checked: string | null;
  };
}

export interface HealthLogItem {
  id: string;
  model_id: string;
  status: 'healthy' | 'error';
  latency_ms: number;
  error_message: string | null;
  check_type: string;
  created_at: string;
}

export interface UserNotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  data?: any;
  is_read: boolean;
  created_at: string;
}

export interface HealthOverviewData {
  overall_status: 'operational' | 'degraded';
  total_models: number;
  healthy_count: number;
  failing_count: number;
  untested_count: number;
  last_check_time: string | null;
  interval_hours: number;
  models: ModelHealthItem[];
  recent_logs: HealthLogItem[];
  unread_alerts_count: number;
}

export async function fetchHealthOverview(
  token: string
): Promise<{ success: boolean; data?: HealthOverviewData; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch health telemetry' };
  }
}

export async function runHealthCheckNow(
  token: string
): Promise<{ success: boolean; message?: string; outcome?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health/run-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to run health check' };
  }
}

export async function checkSingleModelHealth(
  modelId: string,
  token: string
): Promise<{ success: boolean; outcome?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health/check/${modelId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to test model health' };
  }
}

export async function fetchUserNotifications(
  token: string
): Promise<{ success: boolean; notifications?: UserNotificationItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health/notifications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch notifications' };
  }
}

export async function markNotificationsAsRead(
  token: string,
  id?: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health/notifications/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to mark read' };
  }
}

export async function sendTestNotificationApi(
  token: string
): Promise<{ success: boolean; message?: string; notification?: UserNotificationItem; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health/notifications/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to send test notification' };
  }
}
