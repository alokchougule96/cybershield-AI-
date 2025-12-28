
export interface SecurityAlert {
  id: string;
  type: 'phishing' | 'breach' | 'spam' | 'privacy' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

export interface RiskAnalysis {
  score: number;
  label: string;
  color: string;
  reasons: string[];
  recommendations: string[];
}

export interface PasswordResult {
  score: number;
  entropy: number;
  feedback: string;
  breachFound: boolean;
  suggestions: string[];
}

export interface SpamAnalysis {
  isSpam: boolean;
  confidence: number;
  threatType: string;
  explanation: string;
}

export enum SecurityModule {
  PHISHING = 'PHISHING',
  PASSWORD = 'PASSWORD',
  PRIVACY = 'PRIVACY',
  DOCS = 'DOCS',
  SPAM = 'SPAM'
}
