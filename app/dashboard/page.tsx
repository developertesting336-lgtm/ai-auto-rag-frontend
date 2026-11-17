'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { toast } from '../../components/Toast';
import {
  AuthStorage,
  checkBackendHealth,
  getProfile,
  fetchApiKeys,
  saveApiKey,
  deleteApiKey,
  generateAI,
  updateProfile,
  changePassword,
  getMyCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  uploadCompanyPolicy,
  getCompanyPolicies,
  deleteCompanyPolicy,
  regenerateCompanyApiKey,
  fetchChatbotKeys,
  createChatbotKey,
  deleteChatbotKey,
  queryChatbot,
  getUnipileSettings,
  saveUnipileSettings,
  saveEmailPrompt,
  fetchInboundEmails,
  fetchInboundEmailById,
  simulateInboundEmail,
  fetchBillingStatus,
  fetchPaymentHistory,
  createCheckoutSession,
  createCustomerPortal,
  simulatePaymentSuccess,
  adjustTrialPeriod,
  clearPaymentHistory,
  BillingPlanItem,
  UserSubscription,
  PaymentItem,
  BillingStatusResponse,
  User,
  Company,
  CompanyPolicy,
  ChatbotApiKeyItem,
  UnipileSettings,
  InboundEmailItem,
  ApiKeyItem,
  API_BASE,
} from '../../lib/api';

// ============================================================================
// Fixed-Size SVG Icons (Strict 16x16 / 18x18 - Cannot Stretch)
// ============================================================================

function IconOverview({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function IconBuilding({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}

function IconMail({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconSparkles({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconKey({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  );
}

function IconSettings({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  );
}

function IconUploadCloud({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }}
    >
      <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  );
}

function IconFileText({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function IconTrash({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function IconCopy({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <path d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
  );
}

function IconCheck({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <path d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconMessageSquare({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function IconPlus({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <path d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function IconSearch({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconRefresh({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  );
}

function IconMailOpen({ className = '' }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 15, height: 15, minWidth: 15, minHeight: 15 }}
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  );
}

function IconCreditCard({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function IconLock({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      style={{ width: 14, height: 14, minWidth: 14, minHeight: 14 }}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

type NavSection = 'overview' | 'company' | 'chatbot' | 'email' | 'playground' | 'apikeys' | 'billing' | 'settings';

export default function DashboardPage() {
  const router = useRouter();

  // Core state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<NavSection>('overview');
  const [health, setHealth] = useState<{ status: string; database?: any } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Multi-Company state
  const [companiesList, setCompaniesList] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [isCreatingNewCompany, setIsCreatingNewCompany] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [policies, setPolicies] = useState<CompanyPolicy[]>([]);
  const [pineconeConfigured, setPineconeConfigured] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyForm, setCompanyForm] = useState({ name: '', industry: '', website: '', description: '' });
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyFeedback, setCompanyFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  // Policy upload state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [policyTitle, setPolicyTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [policyUploading, setPolicyUploading] = useState(false);
  const [policyFeedback, setPolicyFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  // Website Chatbot state
  const [copiedCompanyKey, setCopiedCompanyKey] = useState(false);
  const [copiedEmbedScript, setCopiedEmbedScript] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState(false);
  const [chatbotKeys, setChatbotKeys] = useState<ChatbotApiKeyItem[]>([]);
  const [newChatbotKeyName, setNewChatbotKeyName] = useState('');
  const [creatingChatbotKey, setCreatingChatbotKey] = useState(false);
  const [chatbotKeyFeedback, setChatbotKeyFeedback] = useState<{ text: string; error?: boolean } | null>(null);
  const [selectedEmbedKey, setSelectedEmbedKey] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; sources?: any[] }>>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI company assistant. I read your uploaded policy documents from Pinecone and answer customer queries based on them. Ask me anything!',
    },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Email / Unipile state
  const [unipileSettings, setUnipileSettings] = useState<UnipileSettings | null>(null);
  const [unipileApiKey, setUnipileApiKey] = useState('');
  const [unipileWebhookUrl, setUnipileWebhookUrl] = useState('');
  const [unipileAccountId, setUnipileAccountId] = useState('');
  const [unipileAiPrompt, setUnipileAiPrompt] = useState('');
  const [unipileSaving, setUnipileSaving] = useState(false);
  const [savingPrompt, setSavingPrompt] = useState(false);
  const [unipileFeedback, setUnipileFeedback] = useState<{ text: string; error?: boolean } | null>(null);
  const [promptFeedback, setPromptFeedback] = useState<{ text: string; error?: boolean } | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [inboundEmails, setInboundEmails] = useState<InboundEmailItem[]>([]);

  // Email Dashboard & Viewer state
  const [emailSubTab, setEmailSubTab] = useState<'inbox' | 'prompt' | 'settings'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<InboundEmailItem | null>(null);
  const [selectedEmailLive, setSelectedEmailLive] = useState<any | null>(null);
  const [loadingEmailDetail, setLoadingEmailDetail] = useState(false);
  const [simulatingEmail, setSimulatingEmail] = useState(false);
  const [emailSearchQuery, setEmailSearchQuery] = useState('');
  const [emailViewerTab, setEmailViewerTab] = useState<'body' | 'unipile' | 'raw'>('body');
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedDetailId, setCopiedDetailId] = useState(false);

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [keyProvider, setKeyProvider] = useState('gemini');
  const [keyName, setKeyName] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [savingKey, setSavingKey] = useState(false);

  // Billing & Subscription state (initialized instantly from localStorage to eliminate flicker)
  const [billingStatus, setBillingStatus] = useState<BillingStatusResponse | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem('auth_billing_status');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [paymentHistory, setPaymentHistory] = useState<PaymentItem[]>([]);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [billingFeedback, setBillingFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  const isBillingLoaded = billingStatus !== null;
  const hasActiveSubscription = Boolean(billingStatus?.hasActiveSubscription);
  const isTrialActive = Boolean(billingStatus?.isTrialActive);
  const isTrialExpired = Boolean(billingStatus?.isTrialExpired);
  const isPaid = Boolean(billingStatus?.isPaid);
  const trialDaysRemaining = billingStatus?.trialDaysRemaining ?? 0;
  const trialEndsAt = billingStatus?.trialEndsAt;
  const isPastDue = Boolean(billingStatus?.isPastDue);

  // 1-second precision live countdown state for 7-day free trial
  const [trialCountdown, setTrialCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    formatted: string;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    formatted: '',
  });

  useEffect(() => {
    if (!trialEndsAt) {
      setTrialCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, formatted: '' });
      return;
    }

    const updateTimer = () => {
      const targetTime = new Date(trialEndsAt).getTime();
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTrialCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          formatted: '0d 00h 00m 00s',
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTrialCountdown({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
          formatted: `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`,
        });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [trialEndsAt]);

  // Derived user API key status (Strictly requiring user-provided key)
  const hasGeminiKey = apiKeys.some((k) => k.provider?.toLowerCase() === 'gemini');
  const hasUserAiKey = apiKeys.some((k) => k.provider?.toLowerCase() === 'gemini' || k.provider?.toLowerCase() === 'openai');
  const isUnipileConnected = Boolean(unipileSettings?.is_active && (unipileSettings?.api_key_masked || unipileSettings?.account_id || inboundEmails.length > 0));
  const filteredInboundEmails = inboundEmails.filter((mail) => {
    if (!emailSearchQuery.trim()) return true;
    const q = emailSearchQuery.toLowerCase();
    return (
      (mail.subject || '').toLowerCase().includes(q) ||
      (mail.from_email || '').toLowerCase().includes(q) ||
      (mail.from_name || '').toLowerCase().includes(q) ||
      (mail.snippet || '').toLowerCase().includes(q) ||
      (mail.body || '').toLowerCase().includes(q) ||
      (mail.message_id || '').toLowerCase().includes(q)
    );
  });

  // AI Playground state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiProvider, setAiProvider] = useState('gemini');
  const [aiModel, setAiModel] = useState('gemini-1.5-flash');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ response?: string; tokens?: number; durationMs?: number; error?: string } | null>(null);

  // Settings state
  const [nameInput, setNameInput] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    const currentUser = AuthStorage.getUser();
    const storedToken = AuthStorage.getToken();

    if (!currentUser || !storedToken) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
    setNameInput(currentUser.name || '');
    setToken(storedToken);
    setLoading(false);

    checkBackendHealth().then((res) => setHealth(res));

    getProfile(storedToken).then((res) => {
      if (res.success && res.user) {
        setUser(res.user);
        setNameInput(res.user.name || '');
        AuthStorage.setUser(res.user);
      } else if (res.error?.includes('expired') || res.error === 'Unauthorized') {
        AuthStorage.clear();
        router.push('/login');
      }
    });

    loadCompanyData(storedToken);
    loadUnipileData(storedToken);
    loadApiKeys(storedToken);
    loadBillingData(storedToken);

    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const paymentStatus = searchParams.get('payment');
      if (paymentStatus === 'success') {
        setBillingFeedback({
          text: '🎉 Payment Successful! Your subscription is active, and all features (Unipile email automation & custom chatbots) are unlocked.',
        });
        setCurrentSection('billing');
      } else if (paymentStatus === 'cancelled') {
        setBillingFeedback({
          text: 'Checkout was cancelled. No charges were made.',
          error: true,
        });
        setCurrentSection('billing');
      }
    }
  }, [router]);

  const loadCompanyData = async (authToken: string, targetCompanyId?: string) => {
    const res = await getMyCompany(authToken);
    if (res.success && res.companies && res.companies.length > 0) {
      setCompaniesList(res.companies);
      const chosen = targetCompanyId
        ? (res.companies.find((c) => c.id === targetCompanyId) || res.companies[0])
        : (res.company || res.companies[0]);

      setCompany(chosen);
      setCompanyForm({
        name: chosen.name,
        industry: chosen.industry || '',
        website: chosen.website || '',
        description: chosen.description || '',
      });
      setPineconeConfigured(Boolean(res.pineconeConfigured));
      setSelectedEmbedKey(chosen.api_key || '');
      loadPolicies(chosen.id, authToken);
      loadChatbotKeys(authToken, chosen.id);
    } else {
      setCompaniesList([]);
      setCompany(null);
      setPolicies([]);
      setPineconeConfigured(Boolean(res.pineconeConfigured));
    }
  };

  const loadChatbotKeys = async (authToken: string, companyId?: string) => {
    const res = await fetchChatbotKeys(authToken, companyId);
    if (res.success && res.keys) {
      setChatbotKeys(res.keys);
      if (res.keys.length > 0 && !selectedEmbedKey) {
        setSelectedEmbedKey(res.keys[0].api_key);
      }
    } else {
      setChatbotKeys([]);
    }
  };

  const loadPolicies = async (companyId: string, authToken: string) => {
    const res = await getCompanyPolicies(companyId, authToken);
    if (res.success && res.policies) {
      setPolicies(res.policies);
    } else {
      setPolicies([]);
    }
  };

  const handleSelectCompany = (selectedComp: Company) => {
    setCompany(selectedComp);
    setCompanyForm({
      name: selectedComp.name,
      industry: selectedComp.industry || '',
      website: selectedComp.website || '',
      description: selectedComp.description || '',
    });
    setIsEditingCompany(false);
    setIsCreatingNewCompany(false);
    setCompanyDropdownOpen(false);
    setSelectedEmbedKey(selectedComp.api_key || '');
    if (token) {
      loadPolicies(selectedComp.id, token);
      loadChatbotKeys(token, selectedComp.id);
    }
    setChatMessages([
      {
        role: 'assistant',
        text: `Hello! I am the AI company assistant for ${selectedComp.name}. I read your uploaded policy documents from Pinecone and answer customer queries based on them. Ask me anything!`,
      },
    ]);
  };

  const handleStartCreateCompany = () => {
    setIsCreatingNewCompany(true);
    setIsEditingCompany(false);
    setCompanyDropdownOpen(false);
    setCompanyForm({ name: '', industry: '', website: '', description: '' });
    setCurrentSection('company');
  };

  const handleDeleteCompany = async (companyId: string) => {
    if (!token) return;
    const targetComp = companiesList.find((c) => c.id === companyId);
    if (!confirm(`Are you sure you want to delete "${targetComp?.name || 'this company'}"? This will permanently delete its knowledge base, Pinecone vectors, and chatbot keys.`)) {
      return;
    }

    setCompanyLoading(true);
    try {
      const res = await deleteCompany(companyId, token);
      if (res.success) {
        toast.success(res.message || `Company "${targetComp?.name || ''}" deleted successfully.`);
        setCompanyFeedback({ text: res.message || 'Company deleted successfully.' });
        const remaining = companiesList.filter((c) => c.id !== companyId);
        setCompaniesList(remaining);
        if (remaining.length > 0) {
          handleSelectCompany(remaining[0]);
        } else {
          setCompany(null);
          setPolicies([]);
          setChatbotKeys([]);
        }
      } else {
        toast.error(res.error || 'Failed to delete company.');
        setCompanyFeedback({ text: res.error || 'Failed to delete company.', error: true });
      }
    } finally {
      setCompanyLoading(false);
    }
  };

  const loadUnipileData = async (authToken: string) => {
    const res = await getUnipileSettings(authToken);
    if (res.success && res.settings) {
      setUnipileSettings(res.settings);
      setUnipileWebhookUrl(res.settings.webhook_url || '');
      setUnipileAccountId(res.settings.account_id || '');
      setUnipileAiPrompt(res.settings.ai_prompt || '');
    }
    const emailsRes = await fetchInboundEmails(authToken);
    if (emailsRes.success && emailsRes.emails) {
      setInboundEmails(emailsRes.emails);
    }
  };

  const loadApiKeys = async (authToken: string) => {
    const res = await fetchApiKeys(authToken);
    if (res.success && res.data) {
      setApiKeys(res.data);
      const hasAi = res.data.some((k: ApiKeyItem) => k.provider?.toLowerCase() === 'gemini' || k.provider?.toLowerCase() === 'openai');
      if (!hasAi) {
        setChatMessages([
          {
            role: 'assistant',
            text: '⚠️ Action Required: Please provide your Google Gemini API key in the "API Keys" tab before testing or embedding your chatbot script.',
          },
        ]);
      }
    }
  };

  const loadBillingData = async (authToken: string) => {
    setLoadingBilling(true);
    try {
      const [bStatus, pHistory] = await Promise.all([
        fetchBillingStatus(authToken),
        fetchPaymentHistory(authToken),
      ]);
      if (bStatus.success) {
        setBillingStatus(bStatus);
        try {
          localStorage.setItem('auth_billing_status', JSON.stringify(bStatus));
        } catch {}
      }
      if (pHistory.success && pHistory.payments) {
        setPaymentHistory(pHistory.payments);
      }
    } finally {
      setLoadingBilling(false);
    }
  };

  const handleSubscribePlan = async (planId: string) => {
    if (!token) return;
    setCheckoutLoading(planId);
    setBillingFeedback(null);
    try {
      const res = await createCheckoutSession(planId, token);
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        setBillingFeedback({ text: res.error || 'Failed to start Stripe checkout session.', error: true });
      }
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleClearPayments = async () => {
    if (!token) return;
    try {
      const res = await clearPaymentHistory(token);
      if (res.success) {
        setPaymentHistory([]);
        toast.success('Payments table deleted and emptied.');
        loadBillingData(token);
      } else {
        toast.error(res.error || 'Failed to empty payments table.');
      }
    } catch {
      toast.error('Error emptying payments table.');
    }
  };

  const handleAdjustTrial = async (action: 'reset' | 'expire') => {
    if (!token) return;
    setCheckoutLoading(`trial_${action}`);
    try {
      const res = await adjustTrialPeriod(action, token);
      if (res.success) {
        toast.success(res.message || 'Trial state updated successfully.');
        loadBillingData(token);
      } else {
        toast.error(res.error || 'Failed to adjust trial.');
      }
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleOpenCustomerPortal = async () => {
    if (!token) return;
    setCheckoutLoading('portal');
    try {
      const res = await createCustomerPortal(token);
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        setBillingFeedback({ text: res.error || 'No active Stripe customer found.', error: true });
      }
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleLogout = () => {
    AuthStorage.clear();
    router.push('/login');
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !companyForm.name.trim()) return;

    setCompanyLoading(true);
    setCompanyFeedback(null);

    try {
      if (company && !isCreatingNewCompany) {
        const res = await updateCompany(company.id, companyForm, token);
        if (res.success && res.company) {
          setCompany(res.company);
          setCompaniesList((prev) => prev.map((c) => (c.id === res.company!.id ? res.company! : c)));
          setIsEditingCompany(false);
          toast.success('Company profile updated successfully.');
          setCompanyFeedback({ text: 'Company profile updated successfully.' });
        } else {
          toast.error(res.error || 'Failed to update company.');
          setCompanyFeedback({ text: res.error || 'Failed to update company.', error: true });
        }
      } else {
        const res = await createCompany(companyForm, token);
        if (res.success && res.company) {
          setCompaniesList((prev) => [res.company!, ...prev]);
          setCompany(res.company);
          setIsCreatingNewCompany(false);
          setIsEditingCompany(false);
          setSelectedEmbedKey(res.company.api_key || '');
          toast.success(`Company "${res.company.name}" created successfully!`);
          setCompanyFeedback({ text: `Company "${res.company.name}" created! You can now upload PDF policies and test its chatbot.` });
          loadPolicies(res.company.id, token);
          loadChatbotKeys(token, res.company.id);
          setChatMessages([
            {
              role: 'assistant',
              text: `Hello! I am the AI company assistant for ${res.company.name}. I read your uploaded policy documents from Pinecone and answer customer queries based on them. Ask me anything!`,
            },
          ]);
        } else {
          toast.error(res.error || 'Failed to create company.');
          setCompanyFeedback({ text: res.error || 'Failed to create company.', error: true });
        }
      }
    } finally {
      setCompanyLoading(false);
    }
  };

  const handleUploadPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !company || !policyTitle.trim() || !selectedFile) return;

    if (!hasActiveSubscription) {
      toast.error('Active subscription required. Please activate a plan in Billing & Plans to upload policy documents.');
      setPolicyFeedback({ text: 'Active subscription required. Please upgrade in Billing & Plans to upload PDF policies.', error: true });
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Please select a valid PDF file.');
      setPolicyFeedback({ text: 'Please select a valid PDF file.', error: true });
      return;
    }

    setPolicyUploading(true);
    setPolicyFeedback(null);

    try {
      const fileSizeKB = `${(selectedFile.size / 1024).toFixed(1)} KB`;
      const res = await uploadCompanyPolicy(
        {
          company_id: company.id,
          title: policyTitle.trim(),
          file_name: selectedFile.name,
          file_size: fileSizeKB,
          file: selectedFile,
        },
        token
      );

      if (res.success && res.policy) {
        setPolicies([res.policy, ...policies]);
        setPolicyTitle('');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        toast.success(res.message || 'Policy document stored in R2 and indexed into Pinecone!');
        setPolicyFeedback({ text: res.message || 'Policy document stored in R2 and indexed into Pinecone.' });
      } else {
        toast.error(res.error || 'Failed to upload policy document.');
        setPolicyFeedback({ text: res.error || 'Failed to upload policy document.', error: true });
      }
    } finally {
      setPolicyUploading(false);
    }
  };

  const handleRegenerateCompanyKey = async () => {
    if (!token || !company) return;
    if (!confirm(`Regenerate API key for ${company.name}? Any live website widgets will need the new key.`)) return;
    setRegeneratingKey(true);
    try {
      const res = await regenerateCompanyApiKey(token, company.id);
      if (res.success && res.api_key) {
        const updated = { ...company, api_key: res.api_key };
        setCompany(updated);
        setCompaniesList((prev) => prev.map((c) => (c.id === company.id ? updated : c)));
        setSelectedEmbedKey(res.api_key);
      }
    } finally {
      setRegeneratingKey(false);
    }
  };

  const handleCreateChatbotKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !company) return;

    setCreatingChatbotKey(true);
    setChatbotKeyFeedback(null);
    try {
      const res = await createChatbotKey(
        { name: newChatbotKeyName.trim() || `${company.name} Chatbot Key`, company_id: company.id },
        token
      );
      if (res.success && res.key) {
        setChatbotKeys((prev) => [res.key!, ...prev]);
        setSelectedEmbedKey(res.key.api_key);
        setNewChatbotKeyName('');
        toast.success(`Chatbot API key "${res.key.name}" generated!`);
        setChatbotKeyFeedback({ text: `Key "${res.key.name}" generated! You can copy it below for your website.` });
      } else {
        toast.error(res.error || 'Failed to generate key.');
        setChatbotKeyFeedback({ text: res.error || 'Failed to generate key.', error: true });
      }
    } finally {
      setCreatingChatbotKey(false);
    }
  };

  const handleDeleteChatbotKey = async (keyId: string) => {
    if (!token) return;
    if (!confirm('Revoke this Chatbot API key? Any website widget using this key will stop responding.')) return;

    try {
      const res = await deleteChatbotKey(keyId, token);
      if (res.success) {
        setChatbotKeys((prev) => prev.filter((k) => k.id !== keyId));
        if (selectedEmbedKey === keyId) {
          setSelectedEmbedKey(company?.api_key || '');
        }
        toast.success('Chatbot key revoked successfully.');
      } else {
        toast.error(res.error || 'Failed to revoke key.');
      }
    } catch (err: any) {
      toast.error('Error revoking chatbot key.');
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasActiveSubscription) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: isTrialExpired
            ? '⚠️ 7-Day Free Trial Expired: Your 1-week free trial has ended. Please subscribe to an active plan in Billing & Plans to continue testing or embedding your AI chatbot.'
            : '⚠️ Subscription Required: Please activate an active plan in Billing & Plans to query this AI chatbot.',
        },
      ]);
      return;
    }

    if (!hasUserAiKey) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '⚠️ Google Gemini API key required: Please provide your Gemini API key in the "API Keys" tab before testing or querying this chatbot.',
        },
      ]);
      return;
    }

    const activeKey = selectedEmbedKey || company?.api_key;
    if (!chatInput.trim() || !activeKey || chatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setChatLoading(true);

    try {
      const res = await queryChatbot({ message: userText, apiKey: activeKey });
      if (res.success && res.response) {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', text: res.response!, sources: res.sources },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', text: res.error || 'Failed to retrieve response from AI.' },
        ]);
      }
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Error connecting to chatbot server.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleDeletePolicy = async (policyId: string) => {
    if (!token) return;
    if (!confirm('Remove this policy document from your knowledge base?')) return;

    try {
      const res = await deleteCompanyPolicy(policyId, token);
      if (res.success) {
        setPolicies(policies.filter((p) => p.id !== policyId));
        toast.success(res.message || 'Policy document removed from knowledge base.');
      } else {
        toast.error(res.error || 'Failed to delete policy.');
      }
    } catch (err: any) {
      toast.error('Error deleting policy document.');
    }
  };

  const handleSaveUnipile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!unipileApiKey.trim() && !unipileSettings?.api_key_masked) {
      toast.error('Please enter your Unipile API key.');
      setUnipileFeedback({ text: 'Please enter your Unipile API key.', error: true });
      return;
    }

    setUnipileSaving(true);
    setUnipileFeedback(null);

    try {
      const payload: { api_key?: string; webhook_url?: string; account_id?: string; ai_prompt?: string } = {
        webhook_url: unipileWebhookUrl.trim(),
        account_id: unipileAccountId.trim(),
        ai_prompt: unipileAiPrompt.trim(),
      };
      if (unipileApiKey.trim()) {
        payload.api_key = unipileApiKey.trim();
      }

      const res = await saveUnipileSettings(payload, token);

      if (res.success && res.settings) {
        setUnipileSettings(res.settings);
        setUnipileApiKey('');
        if (res.settings.ai_prompt !== undefined) {
          setUnipileAiPrompt(res.settings.ai_prompt);
        }
        toast.success('Unipile configuration updated successfully.');
        setUnipileFeedback({ text: 'Unipile configuration updated successfully.' });
        setTimeout(() => setUnipileFeedback(null), 3500);
      } else {
        toast.error(res.error || 'Failed to save settings.');
        setUnipileFeedback({ text: res.error || 'Failed to save settings.', error: true });
      }
    } finally {
      setUnipileSaving(false);
    }
  };

  const handleSaveEmailPrompt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!token) return;

    setSavingPrompt(true);
    setPromptFeedback(null);

    try {
      const res = await saveEmailPrompt(unipileAiPrompt.trim(), token);
      if (res.success) {
        toast.success('AI email rules and instructions saved successfully!');
        setPromptFeedback({ text: 'AI email rules and instructions saved successfully!' });
        setTimeout(() => setPromptFeedback(null), 3500);
      } else {
        toast.error(res.error || 'Failed to save prompt instructions.');
        setPromptFeedback({ text: res.error || 'Failed to save prompt instructions.', error: true });
      }
    } finally {
      setSavingPrompt(false);
    }
  };

  const copyInboundWebhookUrl = () => {
    const url = unipileSettings?.webhook_url || `${API_BASE}/api/email/webhook`;
    navigator.clipboard.writeText(url);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleOpenEmail = async (email: InboundEmailItem) => {
    setSelectedEmail(email);
    setSelectedEmailLive(null);
    setEmailViewerTab('body');
    if (!token) return;

    setLoadingEmailDetail(true);
    try {
      const res = await fetchInboundEmailById(email.id, token);
      if (res.success) {
        if (res.email) setSelectedEmail(res.email);
        if (res.unipileLive) setSelectedEmailLive(res.unipileLive);
      }
    } finally {
      setLoadingEmailDetail(false);
    }
  };

  const handleSimulateEmail = async () => {
    if (!token) return;
    if (!hasActiveSubscription) {
      toast.error(isTrialExpired
        ? '7-Day free trial expired. Please subscribe to an active plan in Billing & Plans to process email automations.'
        : 'Active plan required to simulate email automations.');
      return;
    }
    setSimulatingEmail(true);
    try {
      const res = await simulateInboundEmail(
        {
          from_name: 'Alex Johnson',
          from_email: 'alex.johnson@enterprise-client.com',
          subject: 'Questions regarding SLA response times and data privacy',
          body: `Hello Team,\n\nWe are currently evaluating your platform for our enterprise workflow automation.\n\nCould you please clarify:\n1. What is your guaranteed uptime SLA?\n2. How are policy documents secured in vector storage?\n3. Do you support custom model timeouts and retries?\n\nLooking forward to your response,\nAlex Johnson\nVP of Technology, Enterprise Client Inc.`,
        },
        token
      );
      if (res.success && res.email) {
        setInboundEmails((prev) => [res.email!, ...prev]);
        toast.success('Simulated email arrived and saved to database!');
        setUnipileFeedback({ text: 'Simulated inbound email created and saved to database! Click to inspect below.' });
        setTimeout(() => setUnipileFeedback(null), 4000);
      } else {
        toast.error(res.error || 'Failed to simulate email.');
        setUnipileFeedback({ text: res.error || 'Failed to simulate email.', error: true });
      }
    } finally {
      setSimulatingEmail(false);
    }
  };

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyValue.trim() || !token) return;

    setSavingKey(true);
    try {
      const res = await saveApiKey(
        {
          provider: keyProvider,
          name: keyName.trim() || `${keyProvider.toUpperCase()} Key`,
          api_key: keyValue.trim(),
        },
        token
      );
      if (res.success) {
        setKeyName('');
        setKeyValue('');
        loadApiKeys(token);
        toast.success(`${keyProvider.toUpperCase()} API key saved successfully!`);
        setChatMessages([
          {
            role: 'assistant',
            text: `Hello! I am your AI company assistant. I read your uploaded policy documents from Pinecone and answer customer queries based on them. Ask me anything!`,
          },
        ]);
      } else {
        toast.error(res.error || 'Failed to save API key');
      }
    } finally {
      setSavingKey(false);
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    if (!token || !confirm('Delete this integration key?')) return;
    try {
      const res = await deleteApiKey(id, token);
      if (res.success) {
        setApiKeys(apiKeys.filter((k) => k.id !== id));
        toast.success('Integration API key deleted.');
      } else {
        toast.error(res.error || 'Failed to delete API key.');
      }
    } catch (err: any) {
      toast.error('Error deleting API key.');
    }
  };

  const handleRunAiPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || !token) return;

    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await generateAI({ prompt: aiPrompt.trim(), provider: aiProvider, model: aiModel }, token);
      if (res.success) {
        setAiResult({ response: res.response, tokens: res.tokens, durationMs: res.durationMs });
      } else {
        setAiResult({ error: res.error || 'AI generation failed.' });
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !token) return;

    setProfileSaving(true);
    setProfileMessage(null);
    try {
      const res = await updateProfile({ name: nameInput.trim() }, token);
      if (res.success && res.user) {
        setUser(res.user);
        AuthStorage.setUser(res.user);
        setProfileMessage({ text: 'Profile updated.' });
      } else {
        setProfileMessage({ text: res.error || 'Failed to update profile.', error: true });
      }
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !token) return;

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ text: 'New passwords do not match.', error: true });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ text: 'New password must be at least 6 characters.', error: true });
      return;
    }

    setPasswordSaving(true);
    setPasswordMessage(null);
    try {
      const res = await changePassword({ currentPassword, newPassword }, token);
      if (res.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMessage({ text: 'Password changed successfully.' });
      } else {
        setPasswordMessage({ text: res.error || 'Failed to change password.', error: true });
      }
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-200 rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-tight">initializing workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 antialiased font-sans selection:bg-zinc-800 selection:text-white">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* =========================================================================
          MINIMALIST SIDEBAR (COMPACT, PROFESSIONAL 240px)
      ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-zinc-900/90 backdrop-blur-xl border-r border-zinc-800/80 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col">
          {/* Brand header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-800/80">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-white text-zinc-950 flex items-center justify-center font-bold text-xs tracking-tighter shrink-0">
                AF
              </div>
              <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                AutoFlow
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                v2.0
              </span>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-zinc-400 hover:text-zinc-200 p-1"
            >
              ✕
            </button>
          </div>

          {/* Workspace label */}
          <div className="px-4 pt-4 pb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Workspace
            </span>
          </div>

          {/* Navigation Links - Strict compact row heights */}
          <nav className="px-2 space-y-1">
            <button
              onClick={() => {
                setCurrentSection('overview');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center gap-2.5 text-xs font-medium transition-colors ${currentSection === 'overview'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                <IconOverview className={currentSection === 'overview' ? 'text-zinc-100' : 'text-zinc-400'} />
              </div>
              <span className="truncate">Overview</span>
            </button>

            <button
              onClick={() => {
                setCurrentSection('company');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center justify-between text-xs font-medium transition-colors ${currentSection === 'company'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <IconBuilding className={currentSection === 'company' ? 'text-zinc-100' : 'text-zinc-400'} />
                </div>
                <span className="truncate">Company</span>
              </div>
              {company && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-2" />}
            </button>

            <button
              onClick={() => {
                setCurrentSection('chatbot');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${currentSection === 'chatbot'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <IconMessageSquare className={currentSection === 'chatbot' ? 'text-zinc-100' : 'text-zinc-400'} />
                </div>
                <span className="truncate">Website Chatbot</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {!hasActiveSubscription && <IconLock className="w-3.5 h-3.5 text-amber-400" />}
                {hasActiveSubscription && company?.api_key && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </div>
            </button>

            <button
              onClick={() => {
                setCurrentSection('email');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${currentSection === 'email'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <IconMail className={currentSection === 'email' ? 'text-zinc-100' : 'text-zinc-400'} />
                </div>
                <span className="truncate">Email Automation</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {!hasActiveSubscription && <IconLock className="w-3.5 h-3.5 text-amber-400" />}
                {hasActiveSubscription && inboundEmails.length > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    {inboundEmails.length}
                  </span>
                )}
                {hasActiveSubscription && isUnipileConnected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </div>
            </button>

            <div className="pt-3 pb-1 px-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Developer
              </span>
            </div>

            <button
              onClick={() => {
                setCurrentSection('playground');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center gap-2.5 text-xs font-medium transition-colors cursor-pointer ${currentSection === 'playground'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                <IconSparkles className={currentSection === 'playground' ? 'text-zinc-100' : 'text-zinc-400'} />
              </div>
              <span className="truncate">AI Playground</span>
            </button>

            <button
              onClick={() => {
                setCurrentSection('apikeys');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${currentSection === 'apikeys'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <IconKey className={currentSection === 'apikeys' ? 'text-zinc-100' : 'text-zinc-400'} />
                </div>
                <span className="truncate">API Keys</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 shrink-0 ml-2">
                {apiKeys.length}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentSection('billing');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${currentSection === 'billing'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <IconCreditCard className={currentSection === 'billing' ? 'text-zinc-100' : 'text-zinc-400'} />
                </div>
                <span className="truncate">Billing & Plans</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ml-2 ${
                  !isBillingLoaded
                    ? 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                    : isPaid
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                    : isTrialActive
                    ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/60'
                    : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                }`}
              >
                {!isBillingLoaded
                  ? 'TRIAL'
                  : isPaid
                  ? (billingStatus?.subscription?.plan_id?.toUpperCase() || 'PAID')
                  : isTrialActive
                  ? (trialCountdown.days > 0 ? `TRIAL (${trialCountdown.days}D)` : `TRIAL (${trialCountdown.hours}H)`)
                  : 'EXPIRED'}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentSection('settings');
                setSidebarOpen(false);
              }}
              className={`w-full h-9 px-2.5 rounded-md flex items-center gap-2.5 text-xs font-medium transition-colors cursor-pointer ${currentSection === 'settings'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                <IconSettings className={currentSection === 'settings' ? 'text-zinc-100' : 'text-zinc-400'} />
              </div>
              <span className="truncate">Settings</span>
            </button>
          </nav>
        </div>

        {/* User profile & session bottom bar */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40">
          <div className="flex items-center justify-between px-1.5 py-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[11px] font-medium text-zinc-200 shrink-0">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 truncate">
                <div className="text-xs font-medium text-zinc-200 truncate">{user?.name}</div>
                <div className="text-[10px] font-mono text-zinc-500 truncate">{user?.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-[11px] font-mono text-zinc-400 hover:text-zinc-200 p-1 hover:bg-zinc-800 rounded transition-colors shrink-0"
              title="Sign out"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION SHELL
      ========================================================================= */}
      <div className="flex-1 lg:pl-60 flex flex-col min-h-screen">
        {/* Sleek Top Bar */}
        <header className="h-14 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500">dashboard</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-200 capitalize font-medium">{currentSection}</span>
            </div>
          </div>

          {/* Middle: 7-Day Free Trial Live Countdown Pill */}
          {isTrialActive && !isPaid && (
            <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-indigo-950/80 via-zinc-900 to-purple-950/80 border border-indigo-500/40 shadow-sm text-xs font-mono">
              <div className="flex items-center gap-1.5 text-indigo-300 font-semibold text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
                <span className="hidden sm:inline">7-Day Free Trial:</span>
                <span className="sm:hidden">Trial:</span>
              </div>

              {/* Digital Live Ticking Clock */}
              <div className="flex items-center gap-1 font-bold text-[11px] text-white tracking-wider">
                <span className="bg-zinc-950/90 px-1.5 py-0.5 rounded border border-indigo-500/30 text-indigo-300">
                  {trialCountdown.days}d
                </span>
                <span className="text-zinc-600">:</span>
                <span className="bg-zinc-950/90 px-1.5 py-0.5 rounded border border-indigo-500/30 text-indigo-300">
                  {String(trialCountdown.hours).padStart(2, '0')}h
                </span>
                <span className="text-zinc-600">:</span>
                <span className="bg-zinc-950/90 px-1.5 py-0.5 rounded border border-indigo-500/30 text-indigo-300">
                  {String(trialCountdown.minutes).padStart(2, '0')}m
                </span>
                <span className="text-zinc-600">:</span>
                <span className="bg-zinc-950/90 px-1.5 py-0.5 rounded border border-indigo-500/30 text-indigo-400">
                  {String(trialCountdown.seconds).padStart(2, '0')}s
                </span>
              </div>

              <span className="text-zinc-600 text-[10px] hidden sm:inline">•</span>

              <button
                type="button"
                onClick={() => setCurrentSection('billing')}
                className="text-[10px] font-semibold text-indigo-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                title="View subscription plans"
              >
                Upgrade Plan →
              </button>
            </div>
          )}

          {/* If Trial Expired */}
          {isTrialExpired && !isPaid && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
              <span className="text-[11px] font-semibold">Trial Expired</span>
              <span className="text-zinc-600">•</span>
              <button
                type="button"
                onClick={() => setCurrentSection('billing')}
                className="text-[10px] font-semibold text-rose-300 hover:text-white underline underline-offset-2 cursor-pointer"
              >
                Upgrade to Unlock →
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Multi-Company / Chatbot Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className="h-8 px-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 font-medium flex items-center gap-2 transition-all cursor-pointer"
                title="Switch active company or chatbot"
              >
                <IconBuilding className="w-3.5 h-3.5 text-zinc-400" />
                <span className="max-w-[130px] truncate">{company ? company.name : 'Select Company'}</span>
                <IconChevronDown className="w-3 h-3 text-zinc-500" />
              </button>

              {companyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCompanyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl z-50 p-1.5 space-y-1">
                    <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Companies & Chatbots ({companiesList.length})
                    </div>

                    <div className="max-h-56 overflow-y-auto space-y-0.5">
                      {companiesList.map((comp) => (
                        <button
                          key={comp.id}
                          onClick={() => handleSelectCompany(comp)}
                          className={`w-full px-2.5 py-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${company?.id === comp.id
                              ? 'bg-zinc-800 text-white'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                            }`}
                        >
                          <div className="truncate">
                            <div className="font-medium truncate">{comp.name}</div>
                            {comp.industry && (
                              <div className="text-[10px] text-zinc-500 truncate">{comp.industry}</div>
                            )}
                          </div>
                          {company?.id === comp.id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-zinc-800/80">
                      <button
                        onClick={handleStartCreateCompany}
                        className="w-full px-2.5 py-2 rounded-lg text-left text-xs font-medium text-emerald-400 hover:bg-emerald-950/30 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <IconPlus className="w-3.5 h-3.5" />
                        <span>Create New Company</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* System status pill */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>System Operational</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* =========================================================================
              VIEW 1: OVERVIEW (MODERN EXECUTIVE SUMMARY)
          ========================================================================= */}
          {currentSection === 'overview' && (
            <div className="space-y-6">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
                    Welcome back, {user?.name?.split(' ')[0]}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Telemetry, vector knowledge base status, and email webhook endpoints.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setCurrentSection('company')}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-white transition-colors flex items-center gap-1.5"
                  >
                    <IconBuilding className="w-3.5 h-3.5" />
                    <span>{company ? 'Manage Company' : 'Setup Company'}</span>
                  </button>
                  <button
                    onClick={() => setCurrentSection('billing')}
                    className="px-3 py-1.5 rounded-md text-xs font-medium border border-amber-700/80 bg-amber-950/40 text-amber-300 hover:bg-amber-900/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <IconCreditCard className="w-3.5 h-3.5 text-amber-400" />
                    <span>{hasActiveSubscription ? 'Billing & Plan' : 'Pay Subscription'}</span>
                  </button>
                </div>
              </div>

              {/* Paywall Banner for Inactive Subscription */}
              {!hasActiveSubscription && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-900/60 border border-amber-700/60 flex items-center justify-center text-amber-300 shrink-0">
                      <IconLock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-amber-200">
                        {isTrialExpired ? '7-Day Free Trial Ended — Payment Required' : 'Subscription Inactive — Payment Required'}
                      </h3>
                      <p className="text-[11px] text-amber-300/80 mt-0.5">
                        {isTrialExpired
                          ? 'Your 1-week free trial has expired. Unipile email automation and custom chatbot embeddings are paused until payment is made.'
                          : 'Unipile email automation and custom chatbot embeddings are locked until payment is made. Select a plan to activate all features immediately.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentSection('billing')}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
                  >
                    <span>Choose Plan & Pay</span>
                    <span>→</span>
                  </button>
                </div>
              )}

              {/* Minimalist Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1: Company */}
                <div
                  onClick={() => setCurrentSection('company')}
                  className="group p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Company</span>
                    <IconBuilding className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  </div>
                  <div className="text-base font-semibold truncate text-zinc-100">
                    {company ? company.name : 'Not Created Yet'}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    {company ? (company.industry || 'Active organization') : 'Click to register profile'}
                  </div>
                </div>

                {/* Metric 2: Pinecone Policies */}
                <div
                  onClick={() => setCurrentSection('company')}
                  className="group p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Vector Policies</span>
                    <IconFileText className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  </div>
                  <div className="text-2xl font-semibold tracking-tight text-zinc-100">
                    {policies.length}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    Pinecone DB indexed
                  </div>
                </div>

                {/* Metric 3: Email Integration */}
                <div
                  onClick={() => setCurrentSection('email')}
                  className="group p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Email Webhook</span>
                    <IconMail className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${isUnipileConnected ? 'bg-emerald-400' : 'bg-zinc-600'
                        }`}
                    />
                    <span className="text-sm font-semibold text-zinc-100">
                      {isUnipileConnected ? `${inboundEmails.length} Inbound Mail${inboundEmails.length === 1 ? '' : 's'}` : 'Unconfigured'}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    {isUnipileConnected ? 'Unipile active & listening' : 'Click to setup Unipile webhook'}
                  </div>
                </div>

                {/* Metric 4: AI Automation Engine */}
                <div
                  onClick={() => setCurrentSection('playground')}
                  className="group p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">AI Engine</span>
                    <IconSparkles className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-semibold text-zinc-100">Operational</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    {apiKeys.length > 0 ? `${apiKeys.length} integration key${apiKeys.length === 1 ? '' : 's'}` : 'Gemini 2.0 Flash'}
                  </div>
                </div>
              </div>

              {/* Status details split panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Panel 1: Pinecone Vector KB */}
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Pinecone Vector Knowledge Base
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-500">index: company-policies</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Policies uploaded in PDF format are vectorized for AI semantic retrieval and search via Pinecone Vector DB.
                  </p>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="text-zinc-500">Vector Index</span>
                      <span className="text-emerald-400">company-policies</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="text-zinc-500">Indexed Documents</span>
                      <span className="text-zinc-200">{policies.length} documents</span>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Unipile Email Configuration */}
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Unipile Email Sync
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-500">webhook channel</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Manage outbound and inbound corporate email pipelines. Connect your Unipile account to automate email workflows.
                  </p>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="text-zinc-500">API Key</span>
                      <span className="text-zinc-200">{unipileSettings?.api_key_masked || 'Not saved yet'}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="text-zinc-500">AI Prompt Rules</span>
                      <span className={unipileAiPrompt ? 'text-emerald-400' : 'text-zinc-400'}>
                        {unipileAiPrompt ? 'Configured' : 'Default'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="text-zinc-500">Inbound Endpoint</span>
                      <span className="text-zinc-200 truncate max-w-[200px]">/api/email/webhook/:token</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: COMPANY PAGE (REGISTRATION & PDF UPLOAD TO PINECONE)
          ========================================================================= */}
          {currentSection === 'company' && (
            <div className="space-y-6">
              {/* Alert Feedback */}
              {companyFeedback && (
                <div
                  className={`p-3.5 rounded-lg text-xs font-mono flex items-center justify-between ${companyFeedback.error
                      ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                      : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                    }`}
                >
                  <span>{companyFeedback.text}</span>
                  <button onClick={() => setCompanyFeedback(null)} className="hover:text-white">✕</button>
                </div>
              )}

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-base font-semibold text-zinc-100">
                    Company Profiles & Policy Knowledge Base
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Manage multiple companies. Each organization has its own isolated Pinecone vector knowledge base and chatbot.
                  </p>
                </div>
                <button
                  onClick={handleStartCreateCompany}
                  className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>New Company</span>
                </button>
              </div>

              {/* Company Switcher Tabs */}
              {companiesList.length > 0 && !isCreatingNewCompany && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-1 shrink-0">
                    Organizations ({companiesList.length}):
                  </span>
                  {companiesList.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCompany(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-2 cursor-pointer ${company?.id === c.id
                          ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                          : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700'
                        }`}
                    >
                      <IconBuilding className="w-3.5 h-3.5" />
                      <span>{c.name}</span>
                      {company?.id === c.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* State A: Company Not Created Yet OR Editing OR Creating New */}
              {(!company || isEditingCompany || isCreatingNewCompany) && (
                <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800/80 max-w-2xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                        {isCreatingNewCompany
                          ? 'Register New Company'
                          : company
                            ? 'Edit Company Profile'
                            : 'Register First Company'}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {isCreatingNewCompany
                          ? 'Set up a new company with its own independent policy knowledge base and chatbot.'
                          : 'Update organization profile details.'}
                      </p>
                    </div>
                    {(isEditingCompany || (isCreatingNewCompany && companiesList.length > 0)) && (
                      <button
                        onClick={() => {
                          setIsEditingCompany(false);
                          setIsCreatingNewCompany(false);
                        }}
                        className="text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Technologies Inc."
                        value={companyForm.name}
                        onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                          Industry
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Enterprise Software"
                          value={companyForm.industry}
                          onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                          className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans"
                        />
                      </div>

                      <div>
                        <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                          Website
                        </label>
                        <input
                          type="url"
                          placeholder="https://acme.com"
                          value={companyForm.website}
                          onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                          className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief synopsis of company operations..."
                        value={companyForm.description}
                        onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 resize-none font-sans"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={companyLoading}
                        className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {companyLoading
                          ? 'Saving...'
                          : isCreatingNewCompany
                            ? 'Create Company'
                            : company
                              ? 'Update Company'
                              : 'Save Company Profile'}
                      </button>
                      {(isEditingCompany || (isCreatingNewCompany && companiesList.length > 0)) && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingCompany(false);
                            setIsCreatingNewCompany(false);
                          }}
                          className="px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-200 text-xs transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* State B: Company Registered & Active -> Profile & Policy Upload to Pinecone */}
              {company && !isEditingCompany && !isCreatingNewCompany && (
                <>
                  {/* Company Profile Bar */}
                  <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-semibold text-zinc-100">{company.name}</h2>
                        {company.industry && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                            {company.industry}
                          </span>
                        )}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/60">
                          Active Organization
                        </span>
                      </div>
                      {company.description && (
                        <p className="text-xs text-zinc-400 mt-1 max-w-xl">{company.description}</p>
                      )}
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-zinc-500 hover:text-zinc-300 mt-1 inline-block"
                        >
                          {company.website} →
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => setIsEditingCompany(true)}
                        className="px-3 py-1.5 rounded-md border border-zinc-700 hover:bg-zinc-800 text-xs text-zinc-300 font-medium transition-colors cursor-pointer"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
                        className="px-3 py-1.5 rounded-md border border-rose-950 hover:bg-rose-950/40 text-xs text-rose-400 font-medium transition-colors cursor-pointer"
                        title="Delete this company and all its Pinecone vectors"
                      >
                        Delete Company
                      </button>
                    </div>
                  </div>

                  {/* Policy PDF Upload & Knowledge Base Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* PDF Upload Card */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                            Upload Policy Document
                          </h3>
                          <span className="text-[10px] font-mono text-purple-400">PDF to Pinecone</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Upload your policy in PDF format to vectorize into Pinecone DB.
                        </p>
                      </div>

                      {policyFeedback && (
                        <div
                          className={`p-3 rounded-md text-xs font-mono ${policyFeedback.error
                              ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                              : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                            }`}
                        >
                          {policyFeedback.text}
                        </div>
                      )}

                      {!hasActiveSubscription && (
                        <div className="p-3.5 rounded-lg bg-amber-950/25 border border-amber-800/60 text-xs text-amber-200 space-y-2">
                          <div className="flex items-start gap-2.5">
                            <IconLock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-amber-300">Feature Locked: Subscription Required</div>
                              <p className="text-[11px] text-amber-200/80 mt-0.5 leading-relaxed">
                                Uploading PDF documents and vectorizing them into Pinecone DB requires an active paid plan.
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCurrentSection('billing')}
                            className="w-full py-1.5 px-3 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <IconCreditCard className="w-3.5 h-3.5" />
                            <span>Activate Plan in Billing & Plans →</span>
                          </button>
                        </div>
                      )}

                      {!hasUserAiKey && (
                        <div className="p-3 rounded-md bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 flex items-center justify-between gap-2">
                          <span>⚠️ Add your Google Gemini API key in &ldquo;API Keys&rdquo; to enable Pinecone vectorization.</span>
                          <button
                            type="button"
                            onClick={() => {
                              setKeyProvider('gemini');
                              setCurrentSection('apikeys');
                            }}
                            className="text-[11px] font-semibold text-amber-300 underline hover:text-amber-100 shrink-0 cursor-pointer"
                          >
                            Add Key →
                          </button>
                        </div>
                      )}

                      <form onSubmit={handleUploadPolicy} className="space-y-3.5 text-xs">
                        <div>
                          <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">
                            Policy Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Employee Security Protocol 2026"
                            value={policyTitle}
                            onChange={(e) => setPolicyTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans"
                          />
                        </div>

                        {/* Modern File Dropzone */}
                        <div>
                          <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">
                            Policy PDF File *
                          </label>
                          <div
                            onClick={() => {
                              if (!hasActiveSubscription) {
                                toast.warning('Active subscription required to upload policy documents. Please upgrade in Billing & Plans.');
                                return;
                              }
                              fileInputRef.current?.click();
                            }}
                            className={`border border-dashed rounded-lg p-5 text-center transition-colors ${
                              !hasActiveSubscription
                                ? 'border-zinc-800/80 bg-zinc-950/30 cursor-not-allowed opacity-75'
                                : 'border-zinc-700/80 hover:border-zinc-500 cursor-pointer bg-zinc-950/40'
                            }`}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".pdf,application/pdf"
                              disabled={!hasActiveSubscription}
                              required
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedFile(e.target.files[0]);
                                }
                              }}
                            />
                            <div className="w-5 h-5 mx-auto mb-2 flex items-center justify-center text-zinc-500">
                              {!hasActiveSubscription ? (
                                <IconLock className="w-5 h-5 text-amber-400" />
                              ) : (
                                <IconUploadCloud className="w-5 h-5" />
                              )}
                            </div>
                            <div className="text-xs text-zinc-300 font-medium truncate">
                              {!hasActiveSubscription
                                ? 'Upload disabled without active subscription'
                                : selectedFile
                                ? selectedFile.name
                                : 'Choose a PDF file'}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 mt-1">
                              {!hasActiveSubscription
                                ? 'Subscription required to vectorize documents'
                                : selectedFile
                                ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                                : 'PDF documents up to 25MB'}
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!hasActiveSubscription || policyUploading || !selectedFile}
                          className={`w-full py-2.5 px-3 rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-2 ${
                            !hasActiveSubscription
                              ? 'bg-zinc-900/90 text-zinc-500 border border-zinc-800/90 cursor-not-allowed opacity-60'
                              : 'bg-zinc-100 text-zinc-950 hover:bg-white disabled:opacity-50 cursor-pointer'
                          }`}
                        >
                          {policyUploading ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                              <span>Uploading to R2 & Pinecone...</span>
                            </>
                          ) : !hasActiveSubscription ? (
                            <>
                              <IconLock className="w-3.5 h-3.5 text-zinc-500" />
                              <span>Upload Locked (Subscription Inactive)</span>
                            </>
                          ) : (
                            <>
                              <IconUploadCloud className="w-3.5 h-3.5" />
                              <span>Upload to R2 & Pinecone</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Policy Documents Table */}
                    <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                            Knowledge Base Documents ({policies.length})
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Files stored in Cloudflare R2 & vectorized into Pinecone DB.
                          </p>
                        </div>
                      </div>

                      {policies.length === 0 ? (
                        <div className="p-10 rounded-lg border border-dashed border-zinc-800 text-center text-xs text-zinc-500 font-mono">
                          No company policy documents uploaded yet. Upload a PDF to populate your Pinecone vector store.
                        </div>
                      ) : (
                        <div className="divide-y divide-zinc-800/80">
                          {policies.map((p) => (
                            <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div className="w-4 h-4 shrink-0 flex items-center justify-center mt-0.5">
                                  <IconFileText className="text-zinc-400" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium text-zinc-100 flex items-center gap-2 truncate">
                                    <span className="truncate">{p.title}</span>
                                    <span
                                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border shrink-0 ${p.status === 'indexed'
                                          ? 'border-emerald-800/60 text-emerald-400 bg-emerald-950/20'
                                          : 'border-zinc-700 text-zinc-400 bg-zinc-800/50'
                                        }`}
                                    >
                                      {p.status}
                                    </span>
                                  </div>
                                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5 flex items-center gap-2 truncate">
                                    <span className="truncate">{p.file_name}</span>
                                    {p.file_size && <span>• {p.file_size}</span>}
                                    {p.chunk_count ? <span>• {p.chunk_count} chunks</span> : null}
                                    <span>• {new Date(p.created_at).toLocaleDateString()}</span>
                                    {p.r2_url && (
                                      <a
                                        href={p.r2_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300 ml-1 inline-flex items-center gap-0.5 font-sans underline"
                                      >
                                        <span>R2 File</span>
                                        <span className="text-[10px]">↗</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeletePolicy(p.id)}
                                className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors shrink-0 ml-3"
                                title="Remove policy"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW: WEBSITE CHATBOT (R2 & PINECONE EMBEDDABLE CHATBOT INTEGRATION)
          ========================================================================= */}
          {currentSection === 'chatbot' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="pb-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-zinc-100">
                    Website Chatbot & Embed Integration
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Deploy an AI chatbot on your website that answers customer questions using your company policies from Pinecone DB.
                  </p>
                </div>
                {companiesList.length > 1 && (
                  <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs shrink-0 self-start sm:self-auto">
                    <span className="text-zinc-500 font-mono text-[11px]">Chatbot:</span>
                    <select
                      value={company?.id || ''}
                      onChange={(e) => {
                        const target = companiesList.find((c) => c.id === e.target.value);
                        if (target) handleSelectCompany(target);
                      }}
                      className="bg-transparent text-zinc-200 font-medium focus:outline-none cursor-pointer"
                    >
                      {companiesList.map((c) => (
                        <option key={c.id} value={c.id} className="bg-zinc-900 text-zinc-200">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {!company ? (
                <div className="p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
                    <IconBuilding className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200">Company Profile Required</h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Please create your company profile first before generating website chatbot credentials.
                  </p>
                  <button
                    onClick={() => setCurrentSection('company')}
                    className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white"
                  >
                    Set Up Company
                  </button>
                </div>
              ) : (
                <>
                  {/* Subscription Paywall Warning Banner if not paid / trial expired */}
                  {!hasActiveSubscription && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                          <IconLock className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-200">
                            {isTrialExpired
                              ? '7-Day Free Trial Expired — Chatbot Locked'
                              : 'Subscription Required for Website Chatbot & Embeds'}
                          </h4>
                          <p className="text-zinc-300 mt-0.5 leading-relaxed">
                            {isTrialExpired
                              ? 'Your 1-week free trial has ended. Chatbot queries and embed widgets are paused until a subscription is activated.'
                              : 'Generating Chatbot client API keys, testing policy Q&A, and embedding the chatbot widget on external websites require an active subscription plan.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentSection('billing')}
                        className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                      >
                        Subscribe to Unlock →
                      </button>
                    </div>
                  )}

                  {/* Google Gemini API Key Warning Banner if missing */}
                  {!hasUserAiKey && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                          <IconKey className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-200">Google Gemini API Key Required Before Implementation</h4>
                          <p className="text-zinc-300 mt-0.5 leading-relaxed">
                            You must provide your Google Gemini API key before you can generate chatbot keys, test responses, or implement the chatbot embed script on your website.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setKeyProvider('gemini');
                          setCurrentSection('apikeys');
                        }}
                        className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                      >
                        Provide Gemini Key Now →
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: API Key Manager & Script Embed */}
                    <div className="space-y-5">
                      {/* Alert Feedback */}
                      {chatbotKeyFeedback && (
                        <div
                          className={`p-3 rounded-lg text-xs font-mono flex items-center justify-between ${chatbotKeyFeedback.error
                              ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                              : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                            }`}
                        >
                          <span>{chatbotKeyFeedback.text}</span>
                          <button onClick={() => setChatbotKeyFeedback(null)} className="hover:text-white">✕</button>
                        </div>
                      )}

                      {/* Generate Key Form Card */}
                      <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Generate Chatbot API Key
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400">Website Integration</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Generate unique API keys to embed your company AI chatbot on external websites, customer portals, or landing pages.
                        </p>

                        <form onSubmit={handleCreateChatbotKey} className="flex gap-2 pt-1">
                          <input
                            type="text"
                            required
                            disabled={!hasUserAiKey || !hasActiveSubscription}
                            placeholder={!hasActiveSubscription ? "Subscription required to generate chatbot keys" : hasUserAiKey ? "Key label e.g. Production Website" : "Configure Gemini key in API Keys tab first"}
                            value={newChatbotKeyName}
                            onChange={(e) => setNewChatbotKeyName(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-sans text-xs disabled:opacity-50"
                          />
                          <button
                            type="submit"
                            disabled={creatingChatbotKey || !newChatbotKeyName.trim() || !hasUserAiKey || !hasActiveSubscription}
                            className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors disabled:opacity-50 shrink-0 flex items-center gap-1.5 cursor-pointer"
                          >
                            <IconPlus className="w-3.5 h-3.5" />
                            <span>{creatingChatbotKey ? 'Generating...' : '+ Generate Key'}</span>
                          </button>
                        </form>
                      </div>

                      {/* Active API Keys List Card */}
                      <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Active Chatbot Keys ({1 + chatbotKeys.length})
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">Live Auth</span>
                        </div>

                        <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                          {/* Primary Company Default Key */}
                          {company.api_key && (
                            <div
                              className={`p-3 rounded-lg border text-xs transition-all ${selectedEmbedKey === company.api_key
                                  ? 'bg-zinc-900 border-zinc-600'
                                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-zinc-200">Default Primary Key</span>
                                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                                    Default
                                  </span>
                                </div>
                                <button
                                  onClick={handleRegenerateCompanyKey}
                                  disabled={regeneratingKey}
                                  className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 underline"
                                >
                                  {regeneratingKey ? 'Rotating...' : 'Rotate'}
                                </button>
                              </div>
                              <div className="flex items-center gap-2 font-mono text-[11px]">
                                <span className="text-zinc-300 flex-1 truncate select-all">
                                  {company.api_key}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(company.api_key!);
                                    setCopiedCompanyKey(true);
                                    setTimeout(() => setCopiedCompanyKey(false), 2000);
                                  }}
                                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors shrink-0 flex items-center gap-1"
                                >
                                  {copiedCompanyKey ? <IconCheck className="text-emerald-400" /> : <IconCopy />}
                                  <span>{copiedCompanyKey ? 'Copied' : 'Copy'}</span>
                                </button>
                                <button
                                  onClick={() => setSelectedEmbedKey(company.api_key!)}
                                  className={`px-2 py-0.5 rounded text-[10px] transition-colors shrink-0 ${selectedEmbedKey === company.api_key
                                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/60'
                                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
                                    }`}
                                >
                                  {selectedEmbedKey === company.api_key ? 'Selected' : 'Use in Embed'}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Generated Keys */}
                          {chatbotKeys.map((k) => (
                            <div
                              key={k.id}
                              className={`p-3 rounded-lg border text-xs transition-all ${selectedEmbedKey === k.api_key
                                  ? 'bg-zinc-900 border-zinc-600'
                                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-medium text-zinc-200 truncate">{k.name}</span>
                                  <span className="text-[9px] font-mono text-zinc-500 shrink-0">
                                    {new Date(k.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleDeleteChatbotKey(k.id)}
                                  className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 transition-colors"
                                >
                                  Revoke
                                </button>
                              </div>
                              <div className="flex items-center gap-2 font-mono text-[11px]">
                                <span className="text-zinc-300 flex-1 truncate select-all">
                                  {k.api_key}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(k.api_key);
                                    alert(`Copied key for "${k.name}"`);
                                  }}
                                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors shrink-0 flex items-center gap-1"
                                >
                                  <IconCopy />
                                  <span>Copy</span>
                                </button>
                                <button
                                  onClick={() => setSelectedEmbedKey(k.api_key)}
                                  className={`px-2 py-0.5 rounded text-[10px] transition-colors shrink-0 ${selectedEmbedKey === k.api_key
                                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/60'
                                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
                                    }`}
                                >
                                  {selectedEmbedKey === k.api_key ? 'Selected' : 'Use in Embed'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Plug-and-Play Script Tag Embed */}
                      <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            1-Line HTML Embed Code
                          </span>
                          {hasUserAiKey ? (
                            <span className="text-[10px] font-mono text-indigo-400">Plug & Play</span>
                          ) : (
                            <span className="text-[10px] font-mono text-amber-400 font-semibold">🔒 Key Required</span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Paste this single tag right before the closing &lt;/body&gt; tag of your website. A floating AI chat bubble will immediately appear.
                        </p>

                        {!hasUserAiKey ? (
                          <div className="p-4 rounded-lg bg-zinc-950 border border-amber-900/60 space-y-3">
                            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                              <span className="text-amber-400">⚠️</span>
                              <span>Google Gemini API Key Required Before Script Implementation</span>
                            </div>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                              Please provide your Google Gemini API key in the &ldquo;API Keys&rdquo; tab before you can implement or embed this chatbot script. The script requires your authenticated API key to query Pinecone and generate AI responses.
                            </p>
                            <button
                              onClick={() => {
                                setKeyProvider('gemini');
                                setCurrentSection('apikeys');
                              }}
                              className="w-full py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                              <IconKey className="w-3.5 h-3.5" />
                              <span>Add Google Gemini Key to Unlock Script</span>
                            </button>
                          </div>
                        ) : (
                          <div className="relative bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-xs">
                            <pre className="text-zinc-300 text-[11px] whitespace-pre-wrap break-all selection:bg-zinc-800">
                              {`<script
  src="${API_BASE}/embed/chatbot.js"
  data-api-key="${selectedEmbedKey || company.api_key || 'YOUR_API_KEY'}"
></script>`}
                            </pre>
                            <button
                              onClick={() => {
                                const activeKey = selectedEmbedKey || company.api_key || 'YOUR_API_KEY';
                                const code = `<script src="${API_BASE}/embed/chatbot.js" data-api-key="${activeKey}"></script>`;
                                navigator.clipboard.writeText(code);
                                setCopiedEmbedScript(true);
                                setTimeout(() => setCopiedEmbedScript(false), 2000);
                              }}
                              className="mt-3 w-full py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {copiedEmbedScript ? <IconCheck className="text-emerald-400" /> : <IconCopy />}
                              <span>{copiedEmbedScript ? 'Copied Embed Tag' : 'Copy Embed Code'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* REST API Call Example */}
                      <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                          Direct REST API Endpoint
                        </span>
                        <p className="text-xs text-zinc-400">
                          Query the chatbot programmatically from any frontend, backend, or mobile app:
                        </p>
                        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-[11px] text-zinc-400 space-y-1">
                          <div><span className="text-emerald-400">POST</span> {API_BASE}/api/chatbot/query</div>
                          <div><span className="text-zinc-500">Header:</span> x-api-key: {selectedEmbedKey || company.api_key || 'af_live_...'}</div>
                          <div><span className="text-zinc-500">Body:</span> &#123; &quot;message&quot;: &quot;What is your return policy?&quot; &#125;</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Interactive Chatbot Tester */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between h-[580px]">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                              Live Chatbot Tester
                            </h3>
                          </div>
                          {companiesList.length > 1 ? (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] text-zinc-500 font-mono">Chatbot:</span>
                              <select
                                value={company.id}
                                onChange={(e) => {
                                  const found = companiesList.find((c) => c.id === e.target.value);
                                  if (found) handleSelectCompany(found);
                                }}
                                className="bg-zinc-950 border border-zinc-700 rounded px-2 py-0.5 text-xs text-zinc-200 font-medium focus:outline-none cursor-pointer"
                              >
                                {companiesList.map((c) => (
                                  <option key={c.id} value={c.id} className="bg-zinc-900 text-zinc-200">
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                              Testing Pinecone vector retrieval for {company.name}
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 shrink-0">
                          {policies.length} Policies
                        </span>
                      </div>

                      {/* Chat Messages Log */}
                      <div className="flex-1 overflow-y-auto py-3 space-y-3 font-sans text-xs">
                        {chatMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${msg.role === 'user'
                                  ? 'bg-zinc-800 text-zinc-100'
                                  : 'bg-zinc-950 border border-zinc-800 text-zinc-300'
                                }`}
                            >
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                              {msg.sources && msg.sources.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 flex-wrap">
                                  <span>Sources:</span>
                                  {msg.sources.map((s, idx) => (
                                    <span
                                      key={idx}
                                      className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                                    >
                                      {s.title || s.file_name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        {chatLoading && (
                          <div className="flex justify-start">
                            <div className="bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg p-3 text-xs flex items-center gap-2">
                              <div className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                              <span>Reading Pinecone embeddings & formulating answer...</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chat Input Form */}
                      <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={hasUserAiKey ? "Ask about company policies, rules, security..." : "Provide Google Gemini API key in 'API Keys' tab to chat..."}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={chatLoading || !hasUserAiKey}
                          className="flex-1 px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 text-xs font-sans disabled:opacity-60"
                        />
                        <button
                          type="submit"
                          disabled={chatLoading || !chatInput.trim() || !hasUserAiKey}
                          className="px-4 py-2 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 3: EMAIL PAGE (UNIPILE INTEGRATION - DEVELOPER-GRADE UI)
          ========================================================================= */}
          {currentSection === 'email' && (
            <div className="space-y-6 max-w-5xl">
              {/* Alert Feedback */}
              {unipileFeedback && (
                <div
                  className={`p-3.5 rounded-lg text-xs font-mono flex items-center justify-between ${
                    unipileFeedback.error
                      ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                      : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                  }`}
                >
                  <span>{unipileFeedback.text}</span>
                  <button onClick={() => setUnipileFeedback(null)} className="hover:text-white cursor-pointer">✕</button>
                </div>
              )}

              {/* Sub-navigation & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-zinc-800/80">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                      Unipile Email Automation
                    </h1>
                    {isUnipileConnected ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Connected & Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Awaiting Setup
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Live webhook-driven email pipeline: capture inbound emails, inspect live from Unipile, and configure AI auto-responder policies.
                  </p>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800/80 shrink-0 self-start sm:self-auto text-xs">
                  <button
                    type="button"
                    onClick={() => setEmailSubTab('inbox')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-2 cursor-pointer ${
                      emailSubTab === 'inbox'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <IconMail className="w-3.5 h-3.5" />
                    <span>Inbound Feed</span>
                    <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-700/80 text-zinc-200">
                      {inboundEmails.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEmailSubTab('prompt')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-2 cursor-pointer ${
                      emailSubTab === 'prompt'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <IconSparkles className="w-3.5 h-3.5" />
                    <span>AI Rules & Prompt</span>
                    {unipileAiPrompt && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEmailSubTab('settings')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-2 cursor-pointer ${
                      emailSubTab === 'settings'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <IconSettings className="w-3.5 h-3.5" />
                    <span>Webhook & Credentials</span>
                  </button>
                </div>
              </div>

              {/* Subscription Paywall Banner if unpaid / trial expired */}
              {!hasActiveSubscription && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-900/60 border border-amber-700/60 flex items-center justify-center text-amber-300 shrink-0">
                      <IconLock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-200">
                        {isTrialExpired
                          ? '7-Day Free Trial Expired — Email Automation Locked'
                          : 'Subscription Required for Unipile Email Automation'}
                      </h3>
                      <p className="text-zinc-300 mt-0.5 leading-relaxed">
                        {isTrialExpired
                          ? 'Your 1-week free trial has ended. Inbound webhook dispatching and automated email replies are paused until an active plan is purchased.'
                          : 'Inbound webhook dispatching, automated replies, and AI rule evaluation are locked. Subscribe to an active plan to start processing emails.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentSection('billing')}
                    className="px-4 py-2 rounded-md bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                  >
                    Upgrade in Billing →
                  </button>
                </div>
              )}

              {/* TAB 1: INBOUND FEED & EMAIL DASHBOARD */}
              {emailSubTab === 'inbox' && (
                <div className="space-y-6">
                  {/* Status & Quick Action Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Total Inbound Emails</span>
                      <div className="text-2xl font-bold text-zinc-100">{inboundEmails.length}</div>
                      <p className="text-[11px] text-zinc-500 font-mono">Logged from Unipile webhooks</p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Unipile Account ID</span>
                      <div className="text-sm font-semibold font-mono text-zinc-200 truncate">
                        {unipileSettings?.account_id || (unipileSettings?.is_active ? 'Active Linked Account' : 'Not configured')}
                      </div>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        {isUnipileConnected ? 'Status: Ready' : 'Status: Needs API Key'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">AI Rules Engine</span>
                      <div className="text-sm font-semibold text-zinc-200 truncate flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${unipileAiPrompt ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                        <span>{unipileAiPrompt ? 'Custom Instructions' : 'Default Auto-Reply'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailSubTab('prompt')}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono underline cursor-pointer"
                      >
                        Edit ignore/reply prompt →
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Webhook URL</span>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-mono text-zinc-300 truncate">
                          {unipileSettings?.webhook_url ? `${unipileSettings.webhook_url.slice(0, 24)}...` : 'Unique Endpoint'}
                        </span>
                        <button
                          type="button"
                          onClick={copyInboundWebhookUrl}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-mono cursor-pointer shrink-0"
                        >
                          {copiedWebhook ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-mono">POST handler for Unipile events</p>
                    </div>
                  </div>

                  {/* Toolbar: Search, Simulate Test Email, Refresh */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
                    <div className="relative flex-1">
                      <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Search emails by sender, email address, subject, or content..."
                        value={emailSearchQuery}
                        onChange={(e) => setEmailSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-700 focus:outline-none text-zinc-100 placeholder:text-zinc-600 text-xs font-mono"
                      />
                      {emailSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setEmailSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleSimulateEmail}
                        disabled={simulatingEmail}
                        className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        title="Simulate an incoming email arriving via Unipile Webhook"
                      >
                        <IconPlus className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{simulatingEmail ? 'Simulating...' : 'Simulate Test Email'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { if (token) loadUnipileData(token); }}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                        title="Refresh email feed"
                      >
                        <IconRefresh />
                      </button>
                    </div>
                  </div>

                  {/* Emails List */}
                  <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden">
                    <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconMail className="text-zinc-400" />
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                          Inbound Webhook Emails
                        </h2>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">
                        Showing {filteredInboundEmails.length} of {inboundEmails.length}
                      </span>
                    </div>

                    {filteredInboundEmails.length === 0 ? (
                      <div className="p-12 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center mx-auto text-zinc-400">
                          <IconMail className="w-6 h-6" />
                        </div>
                        {inboundEmails.length === 0 ? (
                          <>
                            <h3 className="text-sm font-semibold text-zinc-200">No Webhook Emails Received Yet</h3>
                            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                              When incoming emails arrive at your dedicated Unipile webhook, our system automatically saves the email ID, sender, recipient, subject, preview snippet, and full body to the database.
                            </p>
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={handleSimulateEmail}
                                disabled={simulatingEmail}
                                className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors cursor-pointer"
                              >
                                {simulatingEmail ? 'Creating...' : '+ Simulate First Inbound Email'}
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-sm font-semibold text-zinc-200">No Matching Emails Found</h3>
                            <p className="text-xs text-zinc-400">
                              No emails match your search query &ldquo;{emailSearchQuery}&rdquo;.
                            </p>
                            <button
                              type="button"
                              onClick={() => setEmailSearchQuery('')}
                              className="text-xs font-mono text-indigo-400 hover:text-indigo-300 cursor-pointer underline"
                            >
                              Clear search query
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-800/80">
                        {filteredInboundEmails.map((mail) => (
                          <div
                            key={mail.id}
                            onClick={() => handleOpenEmail(mail)}
                            className="p-4 hover:bg-zinc-800/40 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                              {/* Row 1: Sender info + Time */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-semibold text-xs text-zinc-100 group-hover:text-white transition-colors truncate">
                                    {mail.from_name || mail.from_email || 'Unknown Sender'}
                                  </span>
                                  {mail.from_email && (
                                    <span className="text-[11px] font-mono text-zinc-400 truncate hidden sm:inline">
                                      &lt;{mail.from_email}&gt;
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                                  {new Date(mail.created_at).toLocaleDateString([], {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>

                              {/* Row 2: Subject */}
                              <div className="text-xs font-medium text-zinc-200 group-hover:text-indigo-300 transition-colors truncate">
                                {mail.subject || '(No Subject)'}
                              </div>

                              {/* Row 3: Body Preview (Snippet) */}
                              <div className="text-[11px] text-zinc-400 line-clamp-1 font-mono leading-relaxed">
                                {mail.snippet || mail.body?.slice(0, 140) || 'No preview text'}
                              </div>
                            </div>

                            {/* Badges & Action */}
                            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                  mail.reply_status === 'auto_replied'
                                    ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                                    : mail.reply_status === 'ignored'
                                    ? 'bg-zinc-800 text-zinc-400 border-zinc-700/60'
                                    : 'bg-indigo-950/50 text-indigo-300 border-indigo-800/60'
                                }`}
                              >
                                {mail.reply_status}
                              </span>

                              {mail.message_id && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 hidden md:inline truncate max-w-[120px]">
                                  {mail.message_id}
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEmail(mail);
                                }}
                                className="px-2.5 py-1 rounded bg-zinc-800 group-hover:bg-zinc-700 text-[11px] text-zinc-300 group-hover:text-white font-medium transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <span>Open</span>
                                <span>→</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: AI AUTO-RESPONDER RULES */}
              {emailSubTab === 'prompt' && (
                <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                          AI Email Auto-Responder Prompt
                        </h2>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-400 border border-indigo-800/60">
                          Rules & Filtering
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        Instruct the AI on which incoming emails should be ignored, which emails receive automated replies, and custom guidelines to follow.
                      </p>
                    </div>
                    {unipileAiPrompt ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 shrink-0 self-start sm:self-auto flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Active Prompt
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 shrink-0 self-start sm:self-auto">
                        Default Rules
                      </span>
                    )}
                  </div>

                  {promptFeedback && (
                    <div
                      className={`p-3 rounded-lg text-xs font-mono flex items-center justify-between ${
                        promptFeedback.error
                          ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                          : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                      }`}
                    >
                      <span>{promptFeedback.text}</span>
                      <button onClick={() => setPromptFeedback(null)} className="hover:text-white cursor-pointer">✕</button>
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Preset Templates */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase text-zinc-500">Preset Rules:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setUnipileAiPrompt(`1. EMAILS TO IGNORE:
- Ignore all automated emails, newsletters, marketing promos, and system digests.
- Ignore automated receipts, payment confirmations, and billing notifications (e.g., Stripe, AWS, GitHub, no-reply@*).
- Ignore out-of-office autoreplies and undeliverable bounce messages.

2. EMAILS TO REPLY:
- Send helpful, polite replies to customer inquiries regarding our pricing, services, company policies, and support requests.
- Formulate answers strictly grounded in our verified company policy knowledge base.
- If the customer asks for a demo or enterprise sales quote, acknowledge warmly and ask for their company name and requirements.

3. TONE & SIGNATURE:
- Professional, concise, friendly, and authoritative.
- Sign off with:
Best regards,
Customer Support Team`);
                        }}
                        className="px-2.5 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer"
                      >
                        + Standard Ignore & Support
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setUnipileAiPrompt(`1. STRICT IGNORE:
- Do NOT reply to promotional pitches, cold outbound sales emails, billing receipts, or system digests.
- Do NOT reply to internal automated alerts.

2. IMMEDIATE REPLIES:
- Only reply to direct customer complaints, urgent support requests, and policy clarifications.
- Keep responses within 3 sentences whenever possible.

3. ESCALATION:
- If a customer mentions an unresolved bug or refund, inform them that a senior agent will follow up within 24 hours.`);
                        }}
                        className="px-2.5 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer"
                      >
                        + Strict Filtering Mode
                      </button>

                      {unipileAiPrompt && (
                        <button
                          type="button"
                          onClick={() => setUnipileAiPrompt('')}
                          className="px-2 py-1 rounded hover:bg-zinc-800 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer ml-auto"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Textarea */}
                    <div>
                      <textarea
                        rows={11}
                        placeholder={`Enter custom rules and instructions for incoming email processing...

Example:
1. EMAILS TO IGNORE:
- Ignore spam, newsletters, automated receipts (no-reply@...).
- Skip out-of-office autoreplies.

2. EMAILS TO REPLY:
- Answer inquiries about our company policies, pricing, and support.
- If unsure, escalate to human support.`}
                        value={unipileAiPrompt}
                        onChange={(e) => setUnipileAiPrompt(e.target.value)}
                        className="w-full p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-xs leading-relaxed resize-y"
                      />
                      <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-500 font-mono">
                        <span>{unipileAiPrompt.length} characters</span>
                        <span>Rules will govern automatic replies to incoming webhooks</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleSaveEmailPrompt()}
                        disabled={savingPrompt}
                        className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                      >
                        {savingPrompt ? 'Saving Prompt...' : 'Save AI Email Prompt'}
                      </button>

                      <p className="text-[11px] text-zinc-500 font-mono hidden sm:block">
                        Applies to all incoming webhook events for this account.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WEBHOOK & CREDENTIALS */}
              {emailSubTab === 'settings' && (
                <div className="space-y-6">
                  {/* Dedicated Webhook URL Card */}
                  <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Your Dedicated Inbound Webhook Endpoint
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">POST Ready • Multi-Tenant Scoped</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Paste this unique URL into your Unipile dashboard. When new emails arrive, Unipile will dispatch them to this endpoint, and our system automatically identifies your account even among millions of users:
                    </p>
                    <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 font-mono text-xs">
                      <span className="text-zinc-300 flex-1 truncate select-all px-2 text-[11px]">
                        {unipileSettings?.webhook_url || `${API_BASE}/api/email/webhook`}
                      </span>
                      <button
                        onClick={copyInboundWebhookUrl}
                        className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedWebhook ? <IconCheck className="text-emerald-400" /> : <IconCopy />}
                        <span>{copiedWebhook ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      Supported events: mail_received, message_received, email_sent
                    </p>
                  </div>

                  {/* Unipile Credentials Form */}
                  <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                          Unipile Configuration
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Store your Unipile API Key and account parameters to enable bidirectional email automation.
                        </p>
                      </div>
                      {unipileSettings?.is_active && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/60">
                          Active
                        </span>
                      )}
                    </div>

                    <form onSubmit={handleSaveUnipile} className="space-y-4 text-xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="font-mono uppercase text-[10px] text-zinc-400">
                            Unipile API Key *
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer"
                          >
                            {showApiKey ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          required
                          placeholder={unipileSettings?.api_key_masked ? `Stored: ${unipileSettings.api_key_masked}` : 'Enter your Unipile API key'}
                          value={unipileApiKey}
                          onChange={(e) => setUnipileApiKey(e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1.5">
                          Unipile Account ID (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. acc_01j7h8..."
                          value={unipileAccountId}
                          onChange={(e) => setUnipileAccountId(e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-xs"
                        />
                        <p className="text-[10px] text-zinc-500 mt-1">
                          Secondary identifier to route Unipile events directly to your account.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={unipileSaving}
                        className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {unipileSaving ? 'Saving to Database...' : 'Save Configuration'}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  EMAIL DETAIL VIEWER MODAL ("ON OPENING SHOW FROM UNIPILE")
              ========================================================================= */}
              {selectedEmail && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                    {/* Modal Top Bar */}
                    <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-950/70 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                selectedEmail.reply_status === 'auto_replied'
                                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                                  : selectedEmail.reply_status === 'ignored'
                                  ? 'bg-zinc-800 text-zinc-400 border-zinc-700/60'
                                  : 'bg-indigo-950/50 text-indigo-300 border-indigo-800/60'
                              }`}
                            >
                              {selectedEmail.reply_status}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">
                              {new Date(selectedEmail.created_at).toLocaleString()}
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-bold text-zinc-100 break-words">
                            {selectedEmail.subject || '(No Subject)'}
                          </h2>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEmail(null);
                            setSelectedEmailLive(null);
                          }}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Close (Esc)"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Sender & Recipient Metadata */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                        <div className="flex items-center gap-1.5 text-zinc-300 truncate">
                          <span className="text-zinc-500 uppercase text-[10px]">From:</span>
                          <span className="font-semibold text-zinc-200 truncate">
                            {selectedEmail.from_name || selectedEmail.from_email}
                          </span>
                          {selectedEmail.from_email && selectedEmail.from_name && (
                            <span className="text-zinc-400 text-[11px] truncate">
                              &lt;{selectedEmail.from_email}&gt;
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                          <span className="text-zinc-500 uppercase text-[10px]">To:</span>
                          <span className="truncate">{selectedEmail.to_email || 'Connected Mailbox'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-400 sm:col-span-2 text-[11px]">
                          <span className="text-zinc-500 uppercase text-[10px]">Unipile ID:</span>
                          <span className="text-zinc-300 truncate">{selectedEmail.message_id || selectedEmail.id}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(selectedEmail.message_id || selectedEmail.id);
                              setCopiedDetailId(true);
                              setTimeout(() => setCopiedDetailId(false), 2000);
                            }}
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                          >
                            {copiedDetailId ? 'Copied' : 'Copy ID'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Modal Sub-Tabs */}
                    <div className="flex items-center gap-2 px-5 pt-3 border-b border-zinc-800/80 bg-zinc-950/40 text-xs">
                      <button
                        type="button"
                        onClick={() => setEmailViewerTab('body')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-all cursor-pointer ${
                          emailViewerTab === 'body'
                            ? 'border-indigo-500 text-indigo-400'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        Formatted Email (Saved)
                      </button>

                      <button
                        type="button"
                        onClick={() => setEmailViewerTab('unipile')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          emailViewerTab === 'unipile'
                            ? 'border-indigo-500 text-indigo-400'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Show from Unipile (Live API)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEmailViewerTab('raw')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-all cursor-pointer ${
                          emailViewerTab === 'raw'
                            ? 'border-indigo-500 text-indigo-400'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        Raw Webhook Payload
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-5 overflow-y-auto flex-1 space-y-4">
                      {/* VIEW A: FORMATTED EMAIL */}
                      {emailViewerTab === 'body' && (
                        <div className="space-y-4">
                          {selectedEmail.snippet && (
                            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-400">
                              <span className="uppercase text-[10px] text-zinc-500 block mb-1">Snippet Preview</span>
                              {selectedEmail.snippet}
                            </div>
                          )}

                          <div>
                            <span className="uppercase text-[10px] font-mono text-zinc-500 block mb-1.5">
                              Message Content
                            </span>
                            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap select-text max-h-[380px] overflow-y-auto">
                              {selectedEmail.body || selectedEmail.snippet || '(Email has no plain body text)'}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* VIEW B: SHOW FROM UNIPILE (LIVE) */}
                      {emailViewerTab === 'unipile' && (
                        <div className="space-y-4">
                          {loadingEmailDetail ? (
                            <div className="p-12 text-center space-y-3 font-mono text-xs text-zinc-400">
                              <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
                              <p>Querying Unipile API endpoint https://api.unipile.com/api/v1/emails/{selectedEmail.message_id || selectedEmail.id}...</p>
                            </div>
                          ) : selectedEmailLive ? (
                            <div className="space-y-3">
                              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                  Live Synced with Unipile API
                                </span>
                                <span className="text-[10px] text-zinc-400">
                                  Provider: {selectedEmailLive.provider || 'Unipile'}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                                <div>
                                  <span className="text-zinc-500 text-[10px] block">Unipile Message ID:</span>
                                  <span className="text-zinc-200 truncate block">{selectedEmailLive.id || selectedEmail.message_id}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[10px] block">Unipile Account:</span>
                                  <span className="text-zinc-200 truncate block">{selectedEmailLive.account_id || selectedEmail.account_id || 'Connected'}</span>
                                </div>
                                {selectedEmailLive.folders && (
                                  <div className="col-span-2">
                                    <span className="text-zinc-500 text-[10px] block">Folders / Labels:</span>
                                    <div className="flex gap-1 flex-wrap mt-0.5">
                                      {(Array.isArray(selectedEmailLive.folders) ? selectedEmailLive.folders : [selectedEmailLive.folders]).map((f: any, idx: number) => (
                                        <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                                          {typeof f === 'string' ? f : f?.name || JSON.stringify(f)}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div>
                                <span className="uppercase text-[10px] font-mono text-zinc-500 block mb-1.5">
                                  Live Message Body
                                </span>
                                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap select-text max-h-[340px] overflow-y-auto">
                                  {selectedEmailLive.body || selectedEmailLive.text || selectedEmail.body || '(Empty body returned by Unipile)'}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                                  <span>Unipile Webhook Storage Verified</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                  This email was received via the Unipile webhook and its complete contents are persisted in the database.
                                  {unipileSettings?.api_key_masked
                                    ? ' Live Unipile API synchronization was checked against https://api.unipile.com/api/v1/emails.'
                                    : ' To query live headers from Unipile, make sure your Unipile API key is saved in the Webhook & Credentials tab.'}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEmail(selectedEmail)}
                                  className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 mt-2"
                                >
                                  <IconRefresh className="w-3.5 h-3.5" />
                                  <span>Refetch from Unipile</span>
                                </button>
                              </div>

                              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap select-text max-h-[300px] overflow-y-auto">
                                {selectedEmail.body || selectedEmail.snippet || '(No body text)'}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* VIEW C: RAW WEBHOOK PAYLOAD */}
                      {emailViewerTab === 'raw' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                            <span>PostgreSQL Stored JSONB Payload</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(JSON.stringify(selectedEmail.raw_payload || selectedEmail, null, 2));
                                setCopiedBody(true);
                                setTimeout(() => setCopiedBody(false), 2000);
                              }}
                              className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                            >
                              {copiedBody ? 'Copied' : 'Copy JSON'}
                            </button>
                          </div>
                          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-[380px] select-all leading-relaxed">
                            {JSON.stringify(selectedEmail.raw_payload || selectedEmail, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Modal Footer */}
                    <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/70 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedEmail.body || selectedEmail.snippet || '');
                          setCopiedBody(true);
                          setTimeout(() => setCopiedBody(false), 2000);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedBody ? <IconCheck className="text-emerald-400" /> : <IconCopy />}
                        <span>{copiedBody ? 'Copied to Clipboard' : 'Copy Email Body'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEmail(null);
                          setSelectedEmailLive(null);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 4: AI PLAYGROUND (TERMINAL/CONSOLE AESTHETIC)
          ========================================================================= */}
          {currentSection === 'playground' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                    Model Playground
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Test LLM inference with Gemini or OpenAI models.
                  </p>
                </div>

                <form onSubmit={handleRunAiPrompt} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Provider</label>
                      <select
                        value={aiProvider}
                        onChange={(e) => {
                          setAiProvider(e.target.value);
                          if (e.target.value === 'gemini') setAiModel('gemini-2.0-flash');
                          if (e.target.value === 'openai') setAiModel('gpt-4o-mini');
                        }}
                        className="w-full px-2.5 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs"
                      >
                        <option value="gemini">Google Gemini</option>
                        <option value="openai">OpenAI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Model</label>
                      <select
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs"
                      >
                        {aiProvider === 'gemini' ? (
                          <>
                            <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                          </>
                        ) : (
                          <>
                            <option value="gpt-4o-mini">gpt-4o-mini</option>
                            <option value="gpt-4o">gpt-4o</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Prompt</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Ask or command the model..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="w-full p-3 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 resize-none font-mono text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {aiLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <IconSparkles />
                        <span>Run Prompt</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Output Console */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                    Inference Output
                  </span>
                  {aiResult && !aiResult.error && (
                    <span className="text-[11px] font-mono text-zinc-500">
                      {aiResult.durationMs}ms • {aiResult.tokens} tokens
                    </span>
                  )}
                </div>

                <div className="flex-1 min-h-[220px] p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-y-auto">
                  {aiLoading ? (
                    <span className="text-zinc-500 animate-pulse">Waiting for model completion...</span>
                  ) : aiResult?.error ? (
                    <span className="text-rose-400">{aiResult.error}</span>
                  ) : aiResult?.response ? (
                    <span className="text-zinc-200">{aiResult.response}</span>
                  ) : (
                    <span className="text-zinc-600">Submit a prompt on the left to inspect raw model output.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: API KEYS & PROVIDERS
          ========================================================================= */}
          {currentSection === 'apikeys' && (
            <div className="space-y-6">
              {/* Informative Chatbot Keys Banner */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <div>
                  <h3 className="font-semibold text-zinc-200">Looking for your Website Chatbot API Keys?</h3>
                  <p className="text-zinc-400 mt-0.5">Generate and manage keys to embed your AI chatbot on external websites, customer portals, or apps.</p>
                </div>
                <button
                  onClick={() => setCurrentSection('chatbot')}
                  className="px-3.5 py-1.5 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <IconMessageSquare className="w-3.5 h-3.5" />
                  <span>Website Chatbot Keys →</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                      Add Provider Key
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">Stored securely in your PostgreSQL database.</p>
                  </div>

                  <form onSubmit={handleSaveApiKey} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Provider</label>
                      <select
                        value={keyProvider}
                        onChange={(e) => setKeyProvider(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs"
                      >
                        <option value="gemini">Google Gemini</option>
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Production Key"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">API Key</label>
                      <input
                        type="password"
                        required
                        placeholder="sk-..."
                        value={keyValue}
                        onChange={(e) => setKeyValue(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={savingKey}
                      className="w-full py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors disabled:opacity-50"
                    >
                      {savingKey ? 'Saving...' : 'Save API Key'}
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                        Configured Keys ({apiKeys.length})
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Masked key representations.</p>
                    </div>
                  </div>

                  {apiKeys.length === 0 ? (
                    <div className="p-8 rounded-lg border border-dashed border-zinc-800 text-center text-xs text-zinc-500 font-mono">
                      No API keys added yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-zinc-800/80">
                      {apiKeys.map((k) => (
                        <div key={k.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-medium text-zinc-100 flex items-center gap-2">
                              <span>{k.name}</span>
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                {k.provider}
                              </span>
                            </div>
                            <div className="text-[11px] font-mono text-zinc-500 mt-0.5">hint: {k.key_hint}</div>
                          </div>

                          <button
                            onClick={() => handleDeleteApiKey(k.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: BILLING, PLANS & INVOICES (STRIPE INTEGRATION)
          ========================================================================= */}
          {currentSection === 'billing' && (
            <div className="space-y-8 max-w-5xl">
              {/* Alert Feedback */}
              {billingFeedback && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono flex items-center justify-between shadow-lg ${
                    billingFeedback.error
                      ? 'bg-rose-950/50 border border-rose-900/80 text-rose-300'
                      : 'bg-emerald-950/50 border border-emerald-900/80 text-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{billingFeedback.text}</span>
                  </div>
                  <button onClick={() => setBillingFeedback(null)} className="hover:text-white cursor-pointer ml-4">
                    ✕
                  </button>
                </div>
              )}

              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800/80">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                      Billing, Plans & Invoices
                    </h1>
                    {!isBillingLoaded ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        Checking Status...
                      </span>
                    ) : isPaid ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Subscription ({billingStatus?.subscription?.plan_name || 'Paid Plan'})
                      </span>
                    ) : isTrialActive ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-700/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        7-Day Free Trial ({trialCountdown.days}d {String(trialCountdown.hours).padStart(2, '0')}h {String(trialCountdown.minutes).padStart(2, '0')}m Remaining)
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-400 border border-rose-800/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        Trial Expired — Features Locked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Manage your subscription plan, view payment due dates, and track historical Stripe invoices.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleAdjustTrial('reset')}
                    disabled={checkoutLoading === 'trial_reset'}
                    className="px-2.5 py-1.5 rounded-lg border border-indigo-800/80 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 text-xs font-mono transition-colors cursor-pointer"
                    title="Reset 7-day trial to test active state"
                  >
                    {checkoutLoading === 'trial_reset' ? 'Updating...' : '⚡ Test Trial (7 Days)'}
                  </button>
                  <button
                    onClick={() => handleAdjustTrial('expire')}
                    disabled={checkoutLoading === 'trial_expire'}
                    className="px-2.5 py-1.5 rounded-lg border border-amber-800/80 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
                    title="Simulate Day 8 to test expired locked state"
                  >
                    {checkoutLoading === 'trial_expire' ? 'Updating...' : '⚡ Test Trial (Expired)'}
                  </button>
                  <button
                    onClick={() => { if (token) loadBillingData(token); }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <IconRefresh className="w-3.5 h-3.5" />
                    <span>Refresh Status</span>
                  </button>

                  {billingStatus?.subscription?.stripe_customer_id && (
                    <button
                      onClick={handleOpenCustomerPortal}
                      disabled={checkoutLoading === 'portal'}
                      className="px-3 py-1.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {checkoutLoading === 'portal' ? 'Opening...' : 'Stripe Customer Portal ↗'}
                    </button>
                  )}
                </div>
              </div>

              {/* Status & Payment Due Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Current Plan */}
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Current Plan</span>
                  <div className="text-lg font-bold text-zinc-100 truncate">
                    {!isBillingLoaded ? (
                      <span className="text-zinc-500 animate-pulse">Checking Plan...</span>
                    ) : isPaid ? (
                      billingStatus?.subscription?.plan_name || 'Active Paid Plan'
                    ) : isTrialActive ? (
                      '7-Day Free Trial'
                    ) : (
                      'Trial Expired (Unpaid)'
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    {!isBillingLoaded ? (
                      'Syncing with database...'
                    ) : isPaid ? (
                      `$${((billingStatus?.subscription?.amount || 0) / 100).toFixed(2)} / ${billingStatus?.subscription?.interval || 'month'}`
                    ) : isTrialActive ? (
                      '$0.00 (1-Week Free Trial)'
                    ) : (
                      '$0.00 / month (locked)'
                    )}
                  </div>
                </div>

                {/* Card 2: Next Payment Due */}
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {!isBillingLoaded ? 'Trial Countdown' : isPaid ? 'Payment Due / Renewal' : 'Trial Countdown'}
                  </span>
                  <div className="text-base font-semibold text-zinc-100 truncate font-mono">
                    {!isBillingLoaded ? (
                      <span className="text-zinc-500 animate-pulse">Calculating...</span>
                    ) : isPaid && billingStatus?.subscription?.current_period_end ? (
                      new Date(billingStatus.subscription.current_period_end).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    ) : isTrialActive ? (
                      `${trialCountdown.days}d ${String(trialCountdown.hours).padStart(2, '0')}h ${String(trialCountdown.minutes).padStart(2, '0')}m left`
                    ) : (
                      'Immediate'
                    )}
                  </div>
                  <div className="text-[11px] font-mono">
                    {!isBillingLoaded ? (
                      <span className="text-zinc-500">Retrieving countdown...</span>
                    ) : isPastDue ? (
                      <span className="text-rose-400">⚠️ Payment overdue</span>
                    ) : isPaid ? (
                      <span className="text-emerald-400">Auto-renews via Stripe</span>
                    ) : isTrialActive ? (
                      <span className="text-indigo-300">
                        Ends {trialEndsAt ? new Date(trialEndsAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'in 7 days'}
                      </span>
                    ) : (
                      <span className="text-rose-400">Trial ended • Pay below</span>
                    )}
                  </div>
                </div>

                {/* Card 3: Unipile & Chatbot Status */}
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Automation Gating</span>
                  <div className="text-base font-semibold text-zinc-100 truncate flex items-center gap-2">
                    {!isBillingLoaded ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
                        <span className="text-zinc-400">Loading...</span>
                      </>
                    ) : (
                      <>
                        <span className={`w-2 h-2 rounded-full ${hasActiveSubscription ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        <span>{isPaid ? 'Unlocked (Paid Plan)' : isTrialActive ? 'Unlocked (7-Day Trial)' : 'Locked (Trial Expired)'}</span>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    {!isBillingLoaded ? 'Checking access...' : hasActiveSubscription ? 'Unipile + Chatbot active' : 'Chatbot & email stopped'}
                  </div>
                </div>

                {/* Card 4: Stripe Gateway */}
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Payment Processor</span>
                  <div className="text-base font-semibold text-zinc-100 truncate flex items-center gap-1.5">
                    <span>Stripe Checkout</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400">
                    256-bit SSL Encrypted
                  </div>
                </div>
              </div>

              {/* Plans Selection Section */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                    Select a Plan to Unlock Automated Email & Chatbots
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Choose the plan that fits your volume. You can pay via Stripe hosted checkout or use test activation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(billingStatus?.plans && billingStatus.plans.length > 0
                    ? billingStatus.plans
                    : [
                        {
                          id: 'starter',
                          name: 'Starter Plan',
                          price: 19,
                          amount: 1900,
                          interval: 'month',
                          description: 'For solo founders launching their first automated customer chatbot.',
                          features: [
                            '1 Company profile',
                            'Up to 10 PDF Documents in Pinecone',
                            'Website Chatbot 1-Line Embed Script',
                            'Dedicated Unipile Webhook Listener',
                            'Basic Inbound Email Ingest',
                            'Standard Gemini 1.5 Flash Model',
                          ],
                          popular: false,
                        },
                        {
                          id: 'pro',
                          name: 'Pro Automation',
                          price: 49,
                          amount: 4900,
                          interval: 'month',
                          description: 'For growing teams requiring robust email automation and multi-company chatbots.',
                          features: [
                            'Unlimited Company Profiles',
                            'Unlimited PDF Knowledge Base Vector Storage',
                            'Custom Multi-Tenant Chatbot API Keys',
                            'AI Email Auto-Responder with Rule Engine',
                            'Live Unipile API Synchronization & Viewer',
                            'High-Speed Gemini 2.0 Flash Inference',
                            'Priority Email Support',
                          ],
                          popular: true,
                        },
                        {
                          id: 'enterprise',
                          name: 'Enterprise Scale',
                          price: 99,
                          amount: 9900,
                          interval: 'month',
                          description: 'High throughput, guaranteed SLAs, and dedicated webhook processing pipelines.',
                          features: [
                            'Everything in Pro, without usage caps',
                            'Dedicated Webhook Concurrency & Retries',
                            'Multi-Model Fallbacks & Custom Timeout Logic',
                            '99.9% Uptime SLA Guarantee',
                            'Custom Knowledge Base Partitioning',
                            '24/7 Dedicated Support',
                          ],
                          popular: false,
                        },
                      ]
                  ).map((plan: any) => {
                    const isCurrentPlan = isPaid && billingStatus?.subscription?.plan_id === plan.id;
                    return (
                      <div
                        key={plan.id}
                        className={`p-6 rounded-2xl flex flex-col justify-between transition-all relative ${
                          plan.popular
                            ? 'bg-zinc-900 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-500/10'
                            : 'bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-[10px] font-mono uppercase tracking-wider text-white font-semibold">
                            Most Popular
                          </div>
                        )}

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-bold text-zinc-100">{plan.name}</h3>
                              {isCurrentPlan && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                                  Current Plan
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{plan.description}</p>
                          </div>

                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-white">${plan.price}</span>
                            <span className="text-xs font-mono text-zinc-400">/ {plan.interval}</span>
                          </div>

                          <div className="border-t border-zinc-800/80 pt-4 space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                              What&apos;s Included:
                            </span>
                            <ul className="space-y-2 text-xs text-zinc-300">
                              {plan.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <IconCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                  <span className="leading-snug">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-6">
                          <button
                            type="button"
                            onClick={() => handleSubscribePlan(plan.id)}
                            disabled={checkoutLoading === plan.id}
                            className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              plan.popular
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                                : 'bg-zinc-100 hover:bg-white text-zinc-950'
                            }`}
                          >
                            <IconCreditCard className="w-4 h-4" />
                            <span>
                              {checkoutLoading === plan.id
                                ? 'Redirecting to Stripe...'
                                : isCurrentPlan
                                ? 'Renew Plan with Stripe'
                                : `Pay $${plan.price} with Stripe`}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Past Payments & Invoices Table */}
              <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden space-y-0">
                <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Payment History & Invoices
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      All historical Stripe transactions, invoices, and payment receipts.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {paymentHistory.length > 0 && (
                      <button
                        onClick={handleClearPayments}
                        className="px-2.5 py-1 rounded text-[11px] font-mono text-rose-400 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-900/60 transition-colors cursor-pointer"
                        title="Delete all payments and empty table"
                      >
                        Empty Table
                      </button>
                    )}
                    <span className="text-xs font-mono text-zinc-500">
                      {paymentHistory.length} transaction{paymentHistory.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                {paymentHistory.length === 0 ? (
                  <div className="p-10 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
                      <IconCreditCard className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-medium text-zinc-300">No Payment History Yet</div>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      You are currently on the 7-day free trial ($0.00 charged). Whenever you subscribe to a paid plan via Stripe Checkout, the verified transaction receipt and PDF invoice will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-950/60 text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Invoice / ID</th>
                          <th className="py-3 px-4">Plan</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4 text-right">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                        {paymentHistory.map((pmt) => (
                          <tr key={pmt.id} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="py-3 px-4 font-mono text-[11px] text-zinc-400 truncate max-w-[150px]">
                              {pmt.stripe_invoice_id || pmt.stripe_payment_intent_id || pmt.id}
                            </td>
                            <td className="py-3 px-4 font-sans font-medium text-zinc-200">
                              {pmt.plan_name || 'Automation Plan'}
                            </td>
                            <td className="py-3 px-4 font-semibold text-zinc-100">
                              ${((pmt.amount || 0) / 100).toFixed(2)} {pmt.currency.toUpperCase()}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded border ${
                                  pmt.status === 'paid'
                                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                                    : pmt.status === 'failed'
                                    ? 'bg-rose-950/60 text-rose-400 border-rose-800/60'
                                    : 'bg-zinc-800 text-zinc-400 border-zinc-700/60'
                                }`}
                              >
                                {pmt.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-zinc-400 text-[11px]">
                              {pmt.paid_at
                                ? new Date(pmt.paid_at).toLocaleString([], {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : new Date(pmt.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {pmt.receipt_url || pmt.invoice_pdf ? (
                                <a
                                  href={pmt.receipt_url || pmt.invoice_pdf}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-indigo-400 hover:text-indigo-300 underline font-sans text-xs inline-flex items-center gap-1"
                                >
                                  <span>View</span>
                                  <span className="text-[10px]">↗</span>
                                </a>
                              ) : (
                                <span className="text-zinc-600 text-[11px]">System Record</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 7: ACCOUNT SETTINGS
          ========================================================================= */}
          {currentSection === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                    Profile Details
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Update display credentials.</p>
                </div>

                {profileMessage && (
                  <div
                    className={`p-3 rounded-md text-xs font-mono ${profileMessage.error
                        ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                        : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                      }`}
                  >
                    {profileMessage.text}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Email</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full px-3 py-1.5 rounded-md bg-zinc-950/50 border border-zinc-800 text-zinc-500 font-mono text-xs cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Display Name</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-xs transition-colors"
                  >
                    {profileSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </form>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                    Password Security
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Rotate account password.</p>
                </div>

                {passwordMessage && (
                  <div
                    className={`p-3 rounded-md text-xs font-mono ${passwordMessage.error
                        ? 'bg-rose-950/40 border border-rose-900/80 text-rose-300'
                        : 'bg-emerald-950/40 border border-emerald-900/80 text-emerald-300'
                      }`}
                  >
                    {passwordMessage.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[10px] text-zinc-400 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-zinc-100 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordSaving}
                    className="px-4 py-2 rounded-md border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-xs transition-colors"
                  >
                    {passwordSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
