import React from 'react';
import { ArrowRight, ShieldCheck, Zap, DownloadCloud, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToGenerator: () => void;
  onScrollToTypes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToGenerator,
  onScrollToTypes,
}) => {
  return (
    <section className="pt-10 pb-8 sm:pt-14 sm:pb-10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle trust kicker without pill clutter */}
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center justify-center gap-2">
          <span>Client-Side Processing</span>
          <span aria-hidden="true">·</span>
          <span>Zero Mandatory Registration</span>
          <span aria-hidden="true">·</span>
          <span>Free Forever</span>
        </div>

        {/* Main H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-5 text-balance">
          Free QR Code Generator
        </h1>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Create free QR codes for websites, Wi-Fi, contact information, social media, and more. Customize your design, verify optical readability, and download in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={onScrollToGenerator}
            className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span>Create QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onScrollToTypes}
            className="px-5 py-3.5 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 rounded-xl text-sm font-semibold transition-all hover:bg-neutral-50"
          >
            Explore QR Types
          </button>
        </div>

        {/* Key proof indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-neutral-200/80 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Instant Preview</div>
              <div className="text-[11px] text-neutral-500">Real-time canvas updates</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">100% Private</div>
              <div className="text-[11px] text-neutral-500">Data never leaves browser</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <DownloadCloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">SVG, PNG & PDF</div>
              <div className="text-[11px] text-neutral-500">Print-ready high resolution</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Never Expires</div>
              <div className="text-[11px] text-neutral-500">Permanent static payloads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
