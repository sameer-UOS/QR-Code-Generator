import React from 'react';
import { Check, X, Shield, RefreshCw } from 'lucide-react';

export const StaticVsDynamicSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Architecture & Transparency
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Static vs. Dynamic QR Codes
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            Understanding the technical difference prevents expensive mistakes. Here is an honest, objective comparison of how both types work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Static Card (QuickQR) */}
          <div className="bg-neutral-50 border-2 border-neutral-900 rounded-2xl p-7 flex flex-col justify-between relative shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  What QuickQR Creates
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-900 text-white rounded">
                  Recommended for 95% of Users
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Static QR Codes
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                The actual content (URL, Wi-Fi password, or vCard) is converted directly into black-and-white pixels. Because no intermediary host or database is involved, your QR code operates independently forever.
              </p>

              <div className="space-y-3 border-t border-neutral-200/80 pt-5">
                <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Never expires:</strong> Works permanently as long as your destination remains online.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Private:</strong> Data is never processed or stored on external servers.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero recurring cost:</strong> Free forever with no subscription traps.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Offline capable:</strong> Text, vCard, Wi-Fi, and SMS work without any internet connection.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-500 pt-1">
                  <X className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Cannot edit encoded destination after physical printing.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-600 font-medium">
              Best for: Wi-Fi, business cards, websites, menus, events, packaging, flyers.
            </div>
          </div>

          {/* Dynamic Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Alternative Architecture
                </span>
                <span className="text-xs font-medium text-neutral-500">
                  Server-Dependent
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Dynamic QR Codes
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                The QR code encodes a short redirect link (e.g. <code>provider.com/xyz</code>). When scanned, traffic routes through that company’s server before redirecting to your final website.
              </p>

              <div className="space-y-3 border-t border-neutral-100 pt-5">
                <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                  <span><strong>Editable link:</strong> You can change the target URL after physical distribution.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                  <span><strong>Scan analytics:</strong> Logs timestamps, countries, and device types.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-amber-800">
                  <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Risk of broken links:</strong> If the provider shuts down or you cancel their plan, all your printed materials break instantly.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-amber-800">
                  <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Privacy concern:</strong> Scans pass through a third-party analytics tracker.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-amber-800">
                  <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Usually requires a paid subscription ($10–$40/mo).</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              Best for: Large enterprise marketing teams requiring A/B testing or post-print redirects.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
