import React from 'react';
import { QRCategory } from '../types/qr';

interface FormInputProps {
  category: QRCategory;
  formData: any;
  onChange: (field: string, value: any) => void;
  error?: string;
}

export const QRFormInputs: React.FC<FormInputProps> = ({
  category,
  formData,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Specific Fields */}
      {category === 'url' && (
        <div>
          <label htmlFor="url-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Website URL <span className="text-red-500">*</span>
          </label>
          <input
            id="url-input"
            type="url"
            value={formData?.url || ''}
            onChange={(e) => onChange('url', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          <p className="mt-1.5 text-xs text-neutral-500">
            Enter any public website, landing page, Google Doc, or menu link.
          </p>
        </div>
      )}

      {category === 'text' && (
        <div>
          <label htmlFor="text-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Plain Text Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="text-input"
            rows={4}
            value={formData?.text || ''}
            onChange={(e) => onChange('text', e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-y"
          />
          <div className="flex justify-between items-center mt-1 text-xs text-neutral-500">
            <span>Encodes raw UTF-8 text directly.</span>
            <span>{(formData?.text || '').length} characters</span>
          </div>
        </div>
      )}

      {category === 'email' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Recipient Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email-address"
              type="email"
              value={formData?.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="contact@example.com"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="email-subject" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Subject Line
            </label>
            <input
              id="email-subject"
              type="text"
              value={formData?.subject || ''}
              onChange={(e) => onChange('subject', e.target.value)}
              placeholder="Inquiry regarding services"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="email-body" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Pre-filled Email Body
            </label>
            <textarea
              id="email-body"
              rows={3}
              value={formData?.body || ''}
              onChange={(e) => onChange('body', e.target.value)}
              placeholder="Hello, I would like to learn more..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {category === 'phone' && (
        <div>
          <label htmlFor="phone-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone-input"
            type="tel"
            value={formData?.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 234-5678"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          <p className="mt-1.5 text-xs text-neutral-500">
            Scanning this code triggers the native phone dialer immediately.
          </p>
        </div>
      )}

      {category === 'sms' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="sms-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Recipient Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="sms-phone"
              type="tel"
              value={formData?.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="sms-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Default Text Message
            </label>
            <textarea
              id="sms-message"
              rows={3}
              value={formData?.message || ''}
              onChange={(e) => onChange('message', e.target.value)}
              placeholder="Hi, I am reaching out regarding..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {category === 'whatsapp' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="wa-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              WhatsApp Phone Number with Country Code <span className="text-red-500">*</span>
            </label>
            <input
              id="wa-phone"
              type="tel"
              value={formData?.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="15551234567 (no plus or spaces)"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Format: Country code + phone number without '+' (e.g. 14155552671 for US, 447911123456 for UK).
            </p>
          </div>
          <div>
            <label htmlFor="wa-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Pre-filled Message (Optional)
            </label>
            <textarea
              id="wa-message"
              rows={3}
              value={formData?.message || ''}
              onChange={(e) => onChange('message', e.target.value)}
              placeholder="Hi! I scanned your QR code and would like to chat."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {category === 'vcard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="vcard-fn" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="vcard-fn"
                type="text"
                value={formData?.firstName || ''}
                onChange={(e) => onChange('firstName', e.target.value)}
                placeholder="Alex"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="vcard-ln" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Last Name
              </label>
              <input
                id="vcard-ln"
                type="text"
                value={formData?.lastName || ''}
                onChange={(e) => onChange('lastName', e.target.value)}
                placeholder="Morgan"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="vcard-org" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Company / Organization
              </label>
              <input
                id="vcard-org"
                type="text"
                value={formData?.organization || ''}
                onChange={(e) => onChange('organization', e.target.value)}
                placeholder="Acme Inc."
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="vcard-title" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Job Title
              </label>
              <input
                id="vcard-title"
                type="text"
                value={formData?.title || ''}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="Senior Engineer"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="vcard-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Phone Number
              </label>
              <input
                id="vcard-phone"
                type="tel"
                value={formData?.phone || ''}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="+1 555-0199"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="vcard-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Email
              </label>
              <input
                id="vcard-email"
                type="email"
                value={formData?.email || ''}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="alex@acme.com"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="vcard-web" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Website
            </label>
            <input
              id="vcard-web"
              type="url"
              value={formData?.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://acme.com"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label htmlFor="vcard-street" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Office Address
            </label>
            <input
              id="vcard-street"
              type="text"
              value={formData?.street || ''}
              onChange={(e) => onChange('street', e.target.value)}
              placeholder="100 Market St, San Francisco, CA"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>
      )}

      {category === 'wifi' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="wifi-ssid" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Network Name (SSID) <span className="text-red-500">*</span>
            </label>
            <input
              id="wifi-ssid"
              type="text"
              value={formData?.ssid || ''}
              onChange={(e) => onChange('ssid', e.target.value)}
              placeholder="MyHomeWifi-5G"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="wifi-sec" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Encryption / Security Type
            </label>
            <select
              id="wifi-sec"
              value={formData?.security || 'WPA'}
              onChange={(e) => onChange('security', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="WPA">WPA / WPA2 / WPA3 (Standard Recommended)</option>
              <option value="WEP">WEP (Legacy)</option>
              <option value="nopass">None (Open / No Password)</option>
            </select>
          </div>

          {formData?.security !== 'nopass' && (
            <div>
              <label htmlFor="wifi-pw" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                Wi-Fi Password <span className="text-red-500">*</span>
              </label>
              <input
                id="wifi-pw"
                type="text"
                value={formData?.password || ''}
                onChange={(e) => onChange('password', e.target.value)}
                placeholder="Enter network password"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent font-mono"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="wifi-hidden"
              checked={!!formData?.hidden}
              onChange={(e) => onChange('hidden', e.target.checked)}
              className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
            />
            <label htmlFor="wifi-hidden" className="text-xs text-neutral-700 cursor-pointer">
              Hidden Network (SSID broadcast is disabled on router)
            </label>
          </div>
        </div>
      )}

      {(category === 'social' ||
        category === 'instagram' ||
        category === 'youtube' ||
        category === 'twitter' ||
        category === 'linkedin' ||
        category === 'facebook') && (
        <div className="space-y-3">
          {category === 'social' && (
            <div>
              <label htmlFor="social-platform" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                Social Platform
              </label>
              <select
                id="social-platform"
                value={formData?.platform || 'instagram'}
                onChange={(e) => onChange('platform', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="instagram">Instagram</option>
                <option value="twitter">X / Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="tiktok">TikTok</option>
                <option value="github">GitHub</option>
                <option value="custom">Custom Web Profile</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="social-handle" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Username or Full Profile Link <span className="text-red-500">*</span>
            </label>
            <input
              id="social-handle"
              type="text"
              value={formData?.handleOrUrl || ''}
              onChange={(e) => onChange('handleOrUrl', e.target.value)}
              placeholder="@username or https://..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
            <p className="mt-1.5 text-xs text-neutral-500">
              You can enter either your handle (e.g. <code>@design_daily</code>) or paste the full profile URL.
            </p>
          </div>
        </div>
      )}

      {category === 'business' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="biz-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              id="biz-name"
              type="text"
              value={formData?.businessName || ''}
              onChange={(e) => onChange('businessName', e.target.value)}
              placeholder="Lumina Artisan Coffee"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="biz-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Phone
              </label>
              <input
                id="biz-phone"
                type="tel"
                value={formData?.phone || ''}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="+1 555-0123"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="biz-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Email
              </label>
              <input
                id="biz-email"
                type="email"
                value={formData?.email || ''}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="hello@lumina.com"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
          <div>
            <label htmlFor="biz-web" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Website
            </label>
            <input
              id="biz-web"
              type="url"
              value={formData?.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://lumina.com"
              className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="biz-addr" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Physical Address
            </label>
            <input
              id="biz-addr"
              type="text"
              value={formData?.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder="428 Valencia St, San Francisco, CA"
              className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="biz-desc" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Short Description / Opening Hours
            </label>
            <textarea
              id="biz-desc"
              rows={2}
              value={formData?.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Specialty Roastery & Cafe. Open daily 7am-6pm."
              className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>
      )}

      {category === 'location' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="loc-lat" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                Latitude (-90 to 90) <span className="text-red-500">*</span>
              </label>
              <input
                id="loc-lat"
                type="text"
                value={formData?.latitude || ''}
                onChange={(e) => onChange('latitude', e.target.value)}
                placeholder="37.7749"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
              />
            </div>
            <div>
              <label htmlFor="loc-lng" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                Longitude (-180 to 180) <span className="text-red-500">*</span>
              </label>
              <input
                id="loc-lng"
                type="text"
                value={formData?.longitude || ''}
                onChange={(e) => onChange('longitude', e.target.value)}
                placeholder="-122.4194"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
              />
            </div>
          </div>
          <div>
            <label htmlFor="loc-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Location Label / Place Name
            </label>
            <input
              id="loc-name"
              type="text"
              value={formData?.locationName || ''}
              onChange={(e) => onChange('locationName', e.target.value)}
              placeholder="San Francisco City Hall"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          {/* Quick coordinate presets */}
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Quick Sample Locations:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'San Francisco', lat: '37.7749', lng: '-122.4194' },
                { name: 'New York', lat: '40.7128', lng: '-74.0060' },
                { name: 'London', lat: '51.5074', lng: '-0.1278' },
                { name: 'Tokyo', lat: '35.6762', lng: '139.6503' },
                { name: 'Paris', lat: '48.8566', lng: '2.3522' },
              ].map((loc) => (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => {
                    onChange('latitude', loc.lat);
                    onChange('longitude', loc.lng);
                    onChange('locationName', loc.name);
                  }}
                  className="px-2 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {category === 'event' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="evt-title" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              id="evt-title"
              type="text"
              value={formData?.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Global Tech Summit 2026"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="evt-loc" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Venue / Location
            </label>
            <input
              id="evt-loc"
              type="text"
              value={formData?.location || ''}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="Moscone Center, Hall A"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-sdate" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="evt-sdate"
                type="date"
                value={formData?.startDate || ''}
                onChange={(e) => onChange('startDate', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="evt-stime" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                Start Time
              </label>
              <input
                id="evt-stime"
                type="time"
                value={formData?.startTime || '09:00'}
                onChange={(e) => onChange('startTime', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-edate" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                End Date
              </label>
              <input
                id="evt-edate"
                type="date"
                value={formData?.endDate || ''}
                onChange={(e) => onChange('endDate', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="evt-etime" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                End Time
              </label>
              <input
                id="evt-etime"
                type="time"
                value={formData?.endTime || '17:00'}
                onChange={(e) => onChange('endTime', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
          <div>
            <label htmlFor="evt-desc" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Event Description
            </label>
            <textarea
              id="evt-desc"
              rows={2}
              value={formData?.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Join keynote speakers and product showcases..."
              className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>
      )}

      {category === 'payment' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Payment Gateway / Method
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-100 rounded-lg text-xs font-medium">
              {[
                { id: 'paypal', label: 'PayPal' },
                { id: 'upi', label: 'UPI (India)' },
                { id: 'sepa', label: 'SEPA (EU)' },
                { id: 'crypto', label: 'Crypto' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onChange('type', m.id)}
                  className={`py-1.5 rounded transition-all ${
                    formData?.type === m.id
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {formData?.type === 'paypal' && (
            <div className="space-y-3">
              <div>
                <label htmlFor="pp-user" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  PayPal.Me Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="pp-user"
                  type="text"
                  value={formData?.paypalUsername || ''}
                  onChange={(e) => onChange('paypalUsername', e.target.value)}
                  placeholder="yourusername"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label htmlFor="pp-amt" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Requested Amount (Optional)
                </label>
                <input
                  id="pp-amt"
                  type="text"
                  value={formData?.paypalAmount || ''}
                  onChange={(e) => onChange('paypalAmount', e.target.value)}
                  placeholder="25.00"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
          )}

          {formData?.type === 'upi' && (
            <div className="space-y-3">
              <div>
                <label htmlFor="upi-vpa" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  UPI ID (VPA) <span className="text-red-500">*</span>
                </label>
                <input
                  id="upi-vpa"
                  type="text"
                  value={formData?.upiId || ''}
                  onChange={(e) => onChange('upiId', e.target.value)}
                  placeholder="merchant@upi or mobile@okhdfcbank"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="upi-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Payee Name
                  </label>
                  <input
                    id="upi-name"
                    type="text"
                    value={formData?.upiName || ''}
                    onChange={(e) => onChange('upiName', e.target.value)}
                    placeholder="Cafe / Store Name"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label htmlFor="upi-amt" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Amount (INR)
                  </label>
                  <input
                    id="upi-amt"
                    type="text"
                    value={formData?.upiAmount || ''}
                    onChange={(e) => onChange('upiAmount', e.target.value)}
                    placeholder="250"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>
          )}

          {formData?.type === 'sepa' && (
            <div className="space-y-3">
              <div>
                <label htmlFor="sepa-iban" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  IBAN <span className="text-red-500">*</span>
                </label>
                <input
                  id="sepa-iban"
                  type="text"
                  value={formData?.sepaIban || ''}
                  onChange={(e) => onChange('sepaIban', e.target.value)}
                  placeholder="DE89 3704 0044 0532 0130 00"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="sepa-recip" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Recipient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="sepa-recip"
                    type="text"
                    value={formData?.sepaRecipient || ''}
                    onChange={(e) => onChange('sepaRecipient', e.target.value)}
                    placeholder="Company GmbH"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label htmlFor="sepa-bic" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    BIC (Optional)
                  </label>
                  <input
                    id="sepa-bic"
                    type="text"
                    value={formData?.sepaBic || ''}
                    onChange={(e) => onChange('sepaBic', e.target.value)}
                    placeholder="DBEUMM21XXX"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="sepa-amt" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Amount (EUR)
                  </label>
                  <input
                    id="sepa-amt"
                    type="text"
                    value={formData?.sepaAmount || ''}
                    onChange={(e) => onChange('sepaAmount', e.target.value)}
                    placeholder="49.00"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label htmlFor="sepa-ref" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Reference / Invoice
                  </label>
                  <input
                    id="sepa-ref"
                    type="text"
                    value={formData?.sepaReference || ''}
                    onChange={(e) => onChange('sepaReference', e.target.value)}
                    placeholder="INV-2026-004"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>
          )}

          {formData?.type === 'crypto' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Cryptocurrency
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange('cryptoType', 'bitcoin')}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                      formData?.cryptoType !== 'ethereum'
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    Bitcoin (BTC)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('cryptoType', 'ethereum')}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                      formData?.cryptoType === 'ethereum'
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    Ethereum (ETH)
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="crypto-addr" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Public Wallet Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="crypto-addr"
                  type="text"
                  value={formData?.cryptoAddress || ''}
                  onChange={(e) => onChange('cryptoAddress', e.target.value)}
                  placeholder="bc1q... or 0x..."
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
                />
              </div>
              <div>
                <label htmlFor="crypto-amt" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Amount (Optional)
                </label>
                <input
                  id="crypto-amt"
                  type="text"
                  value={formData?.cryptoAmount || ''}
                  onChange={(e) => onChange('cryptoAmount', e.target.value)}
                  placeholder="0.005"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {category === 'app' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="app-default" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Website / Universal Download URL <span className="text-red-500">*</span>
            </label>
            <input
              id="app-default"
              type="url"
              value={formData?.defaultUrl || ''}
              onChange={(e) => onChange('defaultUrl', e.target.value)}
              placeholder="https://myapp.com/download"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="app-ios" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Apple App Store Link (Optional)
            </label>
            <input
              id="app-ios"
              type="url"
              value={formData?.appStoreUrl || ''}
              onChange={(e) => onChange('appStoreUrl', e.target.value)}
              placeholder="https://apps.apple.com/app/id..."
              className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="app-play" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
              Google Play Store Link (Optional)
            </label>
            <input
              id="app-play"
              type="url"
              value={formData?.playStoreUrl || ''}
              onChange={(e) => onChange('playStoreUrl', e.target.value)}
              placeholder="https://play.google.com/store/apps/details?id=..."
              className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>
      )}

      {/* Accessible validation error message */}
      {error && (
        <div 
          role="alert" 
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
