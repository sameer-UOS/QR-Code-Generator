import React from 'react';
import { X, Shield, FileText, Info } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'about' | 'cookies' | null;

interface LegalModalsProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Privacy Policy */}
        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-neutral-900">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold">Privacy Policy & Client-Side Architecture</h2>
            </div>
            <p className="text-neutral-500 text-xs">
              Last updated: October 2026 · Built on 100% Client-Side Privacy Standards
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">1. Browser-Side Execution</h3>
            <p>
              QuickQR does not transmit, intercept, or log the QR code content you generate. All calculations—including string concatenation for Wi-Fi payloads, vCards, phone numbers, and event schedules—are executed entirely in client-side JavaScript within your own web browser.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">2. Sensitive Data & Wi-Fi Passwords</h3>
            <p>
              When you enter a Wi-Fi password or personal telephone number, that data is passed directly to the HTML5 Canvas drawing context on your machine. No telemetry or server logs capture this payload.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">3. Static QR Code Disclosure</h3>
            <p>
              Please note that standard static QR codes encode plain text directly into optical dots. Anyone with a smartphone camera who scans your printed QR code can read the encoded text. Therefore, do not encode private secrets that you do not intend the recipient to see.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">4. Zero Cookies & Zero Third-Party Trackers</h3>
            <p>
              QuickQR does not use advertising tracking cookies, user profiling scripts, or analytics pixels that record your generated payloads.
            </p>
          </div>
        )}

        {/* Terms of Service */}
        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-neutral-900">
              <FileText className="w-5 h-5 text-neutral-900" />
              <h2 className="text-xl font-bold">Terms of Service</h2>
            </div>
            <p className="text-neutral-500 text-xs">
              Effective Date: October 2026
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">1. License & Usage Rights</h3>
            <p>
              All QR codes generated through QuickQR are yours to use freely for both non-commercial and commercial applications, including printed merchandise, packaging, restaurant menus, advertisements, and publications. No royalty or attribution to QuickQR is required.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">2. No Guarantee of Target Availability</h3>
            <p>
              QuickQR generates static barcode symbols according to ISO/IEC 18004 standards. We are not responsible for the ongoing availability of third-party destination URLs, websites, or external payment networks that you encode into your codes.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">3. Prohibited Use</h3>
            <p>
              You agree not to use QuickQR to generate QR codes that facilitate malicious phishing campaigns, deceptive malware downloads, or illegal schemes.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">4. Disclaimer of Warranty</h3>
            <p>
              The service is provided "as is" without warranty of any kind. Always test your generated QR codes with multiple devices and lighting conditions before mass printing.
            </p>
          </div>
        )}

        {/* Cookie Policy */}
        {type === 'cookies' && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-neutral-900">
              <Shield className="w-5 h-5 text-neutral-900" />
              <h2 className="text-xl font-bold">Cookie & Tracking Policy</h2>
            </div>
            <p className="text-neutral-500 text-xs">
              Clean Privacy Standard
            </p>
            <p>
              QuickQR operates with zero tracking cookies. We do not use advertising trackers, persistent behavioral cookies, or cross-site fingerprinting technologies.
            </p>
            <p>
              Any customization preferences (such as your chosen colors or active tab) are stored temporarily in your local browser state during your active session and are never transmitted to any third party.
            </p>
          </div>
        )}

        {/* About QuickQR */}
        {type === 'about' && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-neutral-900">
              <Info className="w-5 h-5 text-neutral-900" />
              <h2 className="text-xl font-bold">About QuickQR</h2>
            </div>
            <p>
              QuickQR was built to solve a simple, pervasive annoyance: traditional online QR code generators lure users in with "free" promises, only to lock downloads behind paywalls, deactivate links after 14 days, or require mandatory email signups.
            </p>
            <p>
              We believe basic static QR code generation belongs in the browser as a clean, public utility. QuickQR compiles 19 standards into a fast, privacy-first interface with real-time optical scanning verification and vector SVG/PDF exports.
            </p>
            <div className="p-3 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-800">
              Standard Compliance: ISO/IEC 18004:2015 · RFC 2426 (vCard 3.0) · RFC 5545 (iCalendar)
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
