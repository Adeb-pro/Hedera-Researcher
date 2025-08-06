// Provider types for connect page
export interface WalletProvider {
  name: string;
  icon: string;
  description?: string;
  isInstalled?: boolean;
  connect?: () => Promise<void>;
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

// Notification settings
export interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  type: 'toggle' | 'select' | 'input';
  options?: Array<{ label: string; value: string }>;
  value?: string | boolean | number;
}

// Project form data
export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  fundingGoal: number;
  timeline: string;
  requirements: string;
  objectives: string[];
  methodology?: string;
  expectedOutcomes?: string;
}

// Publication form data
export interface PublicationFormData {
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  category: string;
  file: File | null;
  doi?: string;
  journal?: string;
  publicationDate?: string;
}

// Review form data  
export interface ReviewFormData {
  rating: number;
  comments: string;
  recommendation: 'accept' | 'reject' | 'revise';
  strengths: string;
  weaknesses: string;
  suggestions: string;
  confidenceLevel: number;
}

// Blockchain provider type
export interface BlockchainProvider {
  request: (params: { 
    method: string; 
    params?: unknown[] 
  }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  isConnected?: boolean;
  selectedAddress?: string;
  chainId?: string;
}

// Event handler types
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T> = (data: T) => void | Promise<void>;
export type FileHandler = (file: File) => void | Promise<void>;

// Form event types
export interface FormSubmitEvent<T = Record<string, unknown>> {
  preventDefault: () => void;
  target: {
    elements: T;
    reset: () => void;
  };
}