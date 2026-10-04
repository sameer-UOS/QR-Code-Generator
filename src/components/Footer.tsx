import React from 'react';
import { QrCode, Heart } from 'lucide-react';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
  onScrollToGenerator: () => void;
  onScrollToTypes: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onScrollToGenerator,
  onScrollToTypes,
}) => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-neutral-100">
          {/* Brand Col (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-neutral-900 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <span>QuickQR</span>
            </a>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
              The modern, private, client-side QR code generator. Generate, customize, and export high-resolution QR codes with zero registration, zero tracking, and permanent validity.
            </p>
            <div className="text-xs text-neutral-400">
              Compliant with ISO/IEC 18004 QR barcode specifications.
            </div>
          </div>

          {/* Col 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={onScrollToGenerator}
                  className="hover:text-neutral-900 transition-colors"
                >
                  QR Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToTypes}
                  className="hover:text-neutral-900 transition-colors"
                >
                  All 19 QR Types
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-neutral-900 transition-colors">
                  Platform Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Educational */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <a href="#best-practices" className="hover:text-neutral-900 transition-colors">
                  Print Best Practices
                </a>
              </li>
              <li>
                <a href="#guides" className="hover:text-neutral-900 transition-colors">
                  Educational Guides
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-neutral-900 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-neutral-900 transition-colors"
                >
                  About QuickQR
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Legal & Privacy
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-neutral-900 transition-colors text-left"
                >
                  Privacy Policy (Client-Side)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-neutral-900 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('cookies')}
                  className="hover:text-neutral-900 transition-colors text-left"
                >
                  Cookie Policy (Zero Cookies)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} QuickQR. 100% Free & Open Web Utility.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with optical precision for web & print.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
