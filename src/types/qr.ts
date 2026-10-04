export type QRCategory =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'vcard'
  | 'wifi'
  | 'social'
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'business'
  | 'location'
  | 'event'
  | 'payment'
  | 'app';

export type ModuleStyle = 'square' | 'rounded' | 'dots' | 'smooth';
export type CornerStyle = 'square' | 'rounded' | 'circle' | 'squircle';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRDesignOptions {
  fgColor: string;
  bgColor: string;
  transparentBg: boolean;
  moduleStyle: ModuleStyle;
  cornerStyle: CornerStyle;
  margin: number; // quiet zone in module units (0, 1, 2, 4)
  errorCorrection: ErrorCorrectionLevel;
  resolution: number; // 512, 1024, 2048, 4096
  logo: {
    url: string;
    sizePercent: number; // 15 to 28
    hasBackground: boolean;
  } | null;
}

export interface VerificationResult {
  tested: boolean;
  success: boolean;
  decodedText?: string;
  matchesPayload?: boolean;
  message?: string;
}

// Category Specific Data Models
export interface UrlFormData {
  url: string;
}

export interface TextFormData {
  text: string;
}

export interface EmailFormData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneFormData {
  phone: string;
}

export interface SmsFormData {
  phone: string;
  message: string;
}

export interface WhatsAppFormData {
  phone: string;
  message: string;
}

export interface VCardFormData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  note: string;
}

export interface WiFiFormData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface SocialFormData {
  platform: 'custom' | 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'youtube' | 'tiktok' | 'github';
  handleOrUrl: string;
}

export interface LocationFormData {
  latitude: string;
  longitude: string;
  locationName: string;
}

export interface EventFormData {
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
}

export interface PaymentFormData {
  type: 'paypal' | 'upi' | 'crypto' | 'sepa';
  // PayPal
  paypalUsername: string;
  paypalAmount: string;
  // UPI
  upiId: string;
  upiName: string;
  upiAmount: string;
  // Crypto
  cryptoType: 'bitcoin' | 'ethereum';
  cryptoAddress: string;
  cryptoAmount: string;
  // SEPA
  sepaIban: string;
  sepaBic: string;
  sepaRecipient: string;
  sepaAmount: string;
  sepaReference: string;
}

export interface AppDownloadFormData {
  appStoreUrl: string;
  playStoreUrl: string;
  defaultUrl: string;
}

export interface BusinessFormData {
  businessName: string;
  industry: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  description: string;
}

export interface CategoryMeta {
  id: QRCategory;
  name: string;
  shortDesc: string;
  group: 'Basic' | 'Communication' | 'Wi-Fi & Social' | 'Business & Utilities';
  icon: string;
  example: string;
}

export interface QRPresetTemplate {
  id: string;
  name: string;
  categoryTag: 'Corporate' | 'Tech & SaaS' | 'Hospitality' | 'Creative' | 'Eco & Organic' | 'Luxury & Event';
  description: string;
  options: Omit<QRDesignOptions, 'resolution' | 'logo'> & {
    logo?: QRDesignOptions['logo'];
  };
}

export interface BatchQRItem {
  id: string;
  name: string;
  category: QRCategory;
  categoryLabel: string;
  payload: string;
  options: QRDesignOptions;
  createdAt: number;
  selected: boolean;
}
