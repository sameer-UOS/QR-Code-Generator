import {
  QRCategory,
  UrlFormData,
  TextFormData,
  EmailFormData,
  PhoneFormData,
  SmsFormData,
  WhatsAppFormData,
  VCardFormData,
  WiFiFormData,
  SocialFormData,
  LocationFormData,
  EventFormData,
  PaymentFormData,
  AppDownloadFormData,
  BusinessFormData,
} from '../types/qr';

// Helper to escape Wi-Fi special characters (\, ;, ,, :, ")
export function escapeWiFi(str: string): string {
  return str.replace(/([\\;,:\"])/g, '\\$1');
}

// Clean phone numbers (keeps leading +, removes spaces, dashes, parentheses)
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

// Format Date for iCalendar (YYYYMMDDTHHmmssZ)
export function formatICalDate(dateStr: string, timeStr: string): string {
  if (!dateStr) return '';
  const d = new Date(`${dateStr}T${timeStr || '00:00'}:00`);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// URL Encoder & Validator
export function encodeUrlPayload(data: UrlFormData): { payload: string; error?: string } {
  let raw = (data.url || '').trim();
  if (!raw) {
    return { payload: '', error: 'Please enter a valid website URL.' };
  }

  // Prepend https:// if protocol is missing
  if (!/^https?:\/\//i.test(raw)) {
    raw = 'https://' + raw;
  }

  try {
    const parsed = new URL(raw);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { payload: '', error: 'Only http and https URL protocols are supported.' };
    }
    return { payload: parsed.toString() };
  } catch {
    return { payload: '', error: 'Invalid URL format. Please check your link.' };
  }
}

// Text Encoder
export function encodeTextPayload(data: TextFormData): { payload: string; error?: string } {
  const text = (data.text || '').trim();
  if (!text) {
    return { payload: '', error: 'Please enter some text.' };
  }
  return { payload: text };
}

// Email Encoder
export function encodeEmailPayload(data: EmailFormData): { payload: string; error?: string } {
  const email = (data.email || '').trim();
  if (!email) {
    return { payload: '', error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { payload: '', error: 'Please enter a valid email address.' };
  }

  const params: string[] = [];
  if (data.subject?.trim()) {
    params.push(`subject=${encodeURIComponent(data.subject.trim())}`);
  }
  if (data.body?.trim()) {
    params.push(`body=${encodeURIComponent(data.body.trim())}`);
  }

  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return { payload: `mailto:${email}${query}` };
}

// Phone Encoder
export function encodePhonePayload(data: PhoneFormData): { payload: string; error?: string } {
  const raw = (data.phone || '').trim();
  if (!raw) {
    return { payload: '', error: 'Phone number is required.' };
  }
  const sanitized = sanitizePhone(raw);
  if (sanitized.length < 3) {
    return { payload: '', error: 'Phone number is too short.' };
  }
  return { payload: `tel:${sanitized}` };
}

// SMS Encoder
export function encodeSmsPayload(data: SmsFormData): { payload: string; error?: string } {
  const phone = (data.phone || '').trim();
  if (!phone) {
    return { payload: '', error: 'Recipient phone number is required.' };
  }
  const sanitized = sanitizePhone(phone);
  const msg = (data.message || '').trim();
  // SMSTO: is universally handled by iOS & Android camera scanners
  return { payload: `SMSTO:${sanitized}:${msg}` };
}

// WhatsApp Encoder
export function encodeWhatsAppPayload(data: WhatsAppFormData): { payload: string; error?: string } {
  const phone = (data.phone || '').trim();
  if (!phone) {
    return { payload: '', error: 'WhatsApp phone number with country code is required.' };
  }
  // Wa.me expects digits only without leading '+'
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return { payload: '', error: 'Please include country code (e.g. 1 for US, 44 for UK).' };
  }

  const text = (data.message || '').trim();
  const url = text 
    ? `https://wa.me/${digitsOnly}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digitsOnly}`;
  return { payload: url };
}

// Wi-Fi Encoder
export function encodeWiFiPayload(data: WiFiFormData): { payload: string; error?: string } {
  const ssid = (data.ssid || '').trim();
  if (!ssid) {
    return { payload: '', error: 'Network name (SSID) is required.' };
  }

  const sec = data.security || 'WPA';
  if (sec !== 'nopass' && !(data.password || '').trim()) {
    return { payload: '', error: 'Password is required for secured Wi-Fi networks.' };
  }

  const escapedSsid = escapeWiFi(ssid);
  const escapedPassword = sec !== 'nopass' ? escapeWiFi(data.password || '') : '';
  const hiddenFlag = data.hidden ? 'true' : 'false';

  return { payload: `WIFI:T:${sec};S:${escapedSsid};P:${escapedPassword};H:${hiddenFlag};;` };
}

// Contact / vCard 3.0 Encoder
export function encodeVCardPayload(data: VCardFormData): { payload: string; error?: string } {
  const first = (data.firstName || '').trim();
  const last = (data.lastName || '').trim();
  if (!first && !last && !data.organization?.trim()) {
    return { payload: '', error: 'Please provide at least a name or organization.' };
  }

  const fullName = [first, last].filter(Boolean).join(' ') || (data.organization || '').trim();
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${last};${first};;;`,
    `FN:${fullName}`,
  ];

  if (data.organization?.trim()) lines.push(`ORG:${data.organization.trim()}`);
  if (data.title?.trim()) lines.push(`TITLE:${data.title.trim()}`);
  if (data.phone?.trim()) lines.push(`TEL;TYPE=CELL,VOICE:${sanitizePhone(data.phone.trim())}`);
  if (data.email?.trim()) lines.push(`EMAIL;TYPE=PREF,INTERNET:${data.email.trim()}`);
  if (data.website?.trim()) lines.push(`URL:${data.website.trim().startsWith('http') ? data.website.trim() : 'https://' + data.website.trim()}`);
  
  if (data.street?.trim() || data.city?.trim() || data.country?.trim()) {
    lines.push(`ADR;TYPE=WORK:;;${data.street || ''};${data.city || ''};${data.state || ''};${data.zip || ''};${data.country || ''}`);
  }

  if (data.note?.trim()) lines.push(`NOTE:${data.note.trim()}`);
  lines.push('END:VCARD');

  return { payload: lines.join('\r\n') };
}

// Social Media Encoder
export function encodeSocialPayload(data: SocialFormData): { payload: string; error?: string } {
  const raw = (data.handleOrUrl || '').trim();
  if (!raw) {
    return { payload: '', error: 'Please enter a profile username or URL.' };
  }

  if (/^https?:\/\//i.test(raw)) {
    return { payload: raw };
  }

  const handle = raw.replace(/^@/, '');
  switch (data.platform) {
    case 'instagram': return { payload: `https://instagram.com/${handle}` };
    case 'twitter': return { payload: `https://x.com/${handle}` };
    case 'linkedin': return { payload: `https://linkedin.com/in/${handle}` };
    case 'facebook': return { payload: `https://facebook.com/${handle}` };
    case 'youtube': return { payload: `https://youtube.com/@${handle}` };
    case 'tiktok': return { payload: `https://tiktok.com/@${handle}` };
    case 'github': return { payload: `https://github.com/${handle}` };
    default: return { payload: `https://${handle}` };
  }
}

// Location Encoder (Google Maps URL for seamless opening on iOS & Android)
export function encodeLocationPayload(data: LocationFormData): { payload: string; error?: string } {
  const lat = (data.latitude || '').trim();
  const lng = (data.longitude || '').trim();

  if (!lat || !lng) {
    return { payload: '', error: 'Both latitude and longitude coordinates are required.' };
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (isNaN(latNum) || latNum < -90 || latNum > 90) {
    return { payload: '', error: 'Latitude must be a valid number between -90 and 90.' };
  }
  if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
    return { payload: '', error: 'Longitude must be a valid number between -180 and 180.' };
  }

  const query = `${latNum},${lngNum}`;
  // Universal Google Maps search URL opens natively in Apple Maps on iOS and Google Maps on Android
  return { payload: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` };
}

// Event (iCalendar VEVENT) Encoder
export function encodeEventPayload(data: EventFormData): { payload: string; error?: string } {
  const title = (data.title || '').trim();
  if (!title) {
    return { payload: '', error: 'Event title is required.' };
  }

  if (!data.startDate) {
    return { payload: '', error: 'Start date is required.' };
  }

  const startIso = formatICalDate(data.startDate, data.startTime || '09:00');
  const endIso = data.endDate 
    ? formatICalDate(data.endDate, data.endTime || '10:00')
    : startIso;

  if (!startIso) {
    return { payload: '', error: 'Invalid start date format.' };
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QuickQR Generator//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title.replace(/[\r\n]/g, ' ')}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
  ];

  if (data.location?.trim()) {
    lines.push(`LOCATION:${data.location.trim().replace(/[\r\n]/g, ' ')}`);
  }
  if (data.description?.trim()) {
    lines.push(`DESCRIPTION:${data.description.trim().replace(/[\r\n]/g, ' ')}`);
  }

  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return { payload: lines.join('\r\n') };
}

// Payment Encoder (Clear, spec-compliant payloads)
export function encodePaymentPayload(data: PaymentFormData): { payload: string; error?: string } {
  switch (data.type) {
    case 'paypal': {
      const user = (data.paypalUsername || '').trim().replace(/^@/, '');
      if (!user) return { payload: '', error: 'PayPal username is required.' };
      const amt = (data.paypalAmount || '').trim();
      const url = amt ? `https://paypal.me/${user}/${amt}` : `https://paypal.me/${user}`;
      return { payload: url };
    }
    case 'upi': {
      const vpa = (data.upiId || '').trim();
      if (!vpa || !vpa.includes('@')) return { payload: '', error: 'Valid UPI Virtual Payment Address (VPA) is required.' };
      const name = (data.upiName || 'Merchant').trim();
      let upi = `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(name)}&cu=INR`;
      if (data.upiAmount?.trim()) {
        upi += `&am=${encodeURIComponent(data.upiAmount.trim())}`;
      }
      return { payload: upi };
    }
    case 'crypto': {
      const addr = (data.cryptoAddress || '').trim();
      if (!addr) return { payload: '', error: 'Cryptocurrency wallet address is required.' };
      const coin = data.cryptoType || 'bitcoin';
      const amt = (data.cryptoAmount || '').trim();
      return { payload: amt ? `${coin}:${addr}?amount=${amt}` : `${coin}:${addr}` };
    }
    case 'sepa': {
      const iban = (data.sepaIban || '').trim().replace(/\s/g, '');
      const recipient = (data.sepaRecipient || '').trim();
      if (!iban) return { payload: '', error: 'IBAN is required for SEPA payments.' };
      if (!recipient) return { payload: '', error: 'Recipient name is required.' };
      const amt = (data.sepaAmount || '').trim();
      const bic = (data.sepaBic || '').trim();
      const ref = (data.sepaReference || '').trim();
      // European Payments Council Standard QR
      const epcLines = [
        'BCD',
        '002',
        '1',
        'SCT',
        bic,
        recipient,
        iban,
        amt ? `EUR${amt}` : '',
        '',
        ref,
        ''
      ];
      return { payload: epcLines.join('\n') };
    }
    default:
      return { payload: '', error: 'Unknown payment type.' };
  }
}

// App Download Encoder
export function encodeAppDownloadPayload(data: AppDownloadFormData): { payload: string; error?: string } {
  const defaultUrl = (data.defaultUrl || '').trim();
  const ios = (data.appStoreUrl || '').trim();
  const android = (data.playStoreUrl || '').trim();

  const chosen = defaultUrl || ios || android;
  if (!chosen) {
    return { payload: '', error: 'Please provide at least one App Store or web download URL.' };
  }

  let finalUrl = chosen;
  if (!/^https?:\/\//i.test(finalUrl)) {
    finalUrl = 'https://' + finalUrl;
  }
  return { payload: finalUrl };
}

// Business Info Encoder
export function encodeBusinessPayload(data: BusinessFormData): { payload: string; error?: string } {
  const name = (data.businessName || '').trim();
  if (!name) {
    return { payload: '', error: 'Business name is required.' };
  }

  // Format as rich vCard 3.0 business profile card
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `ORG:${name}`,
    `FN:${name}`,
  ];

  if (data.phone?.trim()) lines.push(`TEL;TYPE=WORK,VOICE:${sanitizePhone(data.phone.trim())}`);
  if (data.email?.trim()) lines.push(`EMAIL;TYPE=PREF,INTERNET:${data.email.trim()}`);
  if (data.website?.trim()) lines.push(`URL:${data.website.trim().startsWith('http') ? data.website.trim() : 'https://' + data.website.trim()}`);
  if (data.address?.trim()) lines.push(`ADR;TYPE=WORK:;;${data.address.trim()};;;;`);
  if (data.description?.trim()) lines.push(`NOTE:${data.description.trim()}`);
  lines.push('END:VCARD');

  return { payload: lines.join('\r\n') };
}

// Central Dispatcher
export function generatePayload(
  category: QRCategory,
  formData: any
): { payload: string; error?: string } {
  switch (category) {
    case 'url':
      return encodeUrlPayload(formData as UrlFormData);
    case 'text':
      return encodeTextPayload(formData as TextFormData);
    case 'email':
      return encodeEmailPayload(formData as EmailFormData);
    case 'phone':
      return encodePhonePayload(formData as PhoneFormData);
    case 'sms':
      return encodeSmsPayload(formData as SmsFormData);
    case 'whatsapp':
      return encodeWhatsAppPayload(formData as WhatsAppFormData);
    case 'vcard':
      return encodeVCardPayload(formData as VCardFormData);
    case 'wifi':
      return encodeWiFiPayload(formData as WiFiFormData);
    case 'social':
    case 'youtube':
    case 'instagram':
    case 'facebook':
    case 'linkedin':
    case 'twitter':
      return encodeSocialPayload(formData as SocialFormData);
    case 'location':
      return encodeLocationPayload(formData as LocationFormData);
    case 'event':
      return encodeEventPayload(formData as EventFormData);
    case 'payment':
      return encodePaymentPayload(formData as PaymentFormData);
    case 'app':
      return encodeAppDownloadPayload(formData as AppDownloadFormData);
    case 'business':
      return encodeBusinessPayload(formData as BusinessFormData);
    default:
      return { payload: '', error: 'Unknown category' };
  }
}
