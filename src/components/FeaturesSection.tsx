import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCode2,
  Sliders,
  Sparkles,
  Printer,
  Eye,
  Lock,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-neutral-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Why Professionals Choose QuickQR
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Engineered for Precision, Privacy, and Print Durability
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            Most online QR makers trap you with hidden subscriptions, dynamic links that expire after 14 days, or low-resolution downloads. QuickQR is built differently.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Privacy (Col Span 2) */}
          <div className="md:col-span-2 bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                100% Client-Side Private Generation
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                All QR calculations, matrix geometry, and image exports happen strictly inside your browser’s V8 JavaScript engine. Your private Wi-Fi passwords, phone numbers, and contact records are never sent over the network to any server or recorded in a database.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-6 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 text-neutral-800 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                Zero network logging
              </span>
              <span>·</span>
              <span>No user tracking cookies</span>
              <span>·</span>
              <span>GDPR & CCPA compliant by design</span>
            </div>
          </div>

          {/* Card 2: Optical Verification (Col Span 1) */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-5">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Built-in Scanner Verification
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                An embedded optical barcode reader tests every rendered frame in real time, confirming that standard iPhone and Android cameras can parse the encoded data.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Diagnostic decodability guarantee</span>
            </div>
          </div>

          {/* Card 3: Vector SVG & Print-Ready PDF (Col Span 1) */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-5">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Scalable Vector SVG & PDF
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Download mathematically crisp vector SVG files for Illustrator and Figma, or export an A4 print sheet with centering, guides, and metadata.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              Infinite scalability without raster pixelation.
            </div>
          </div>

          {/* Card 4: Aesthetic Customizer (Col Span 2) */}
          <div className="md:col-span-2 bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-5">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Tailored Aesthetics with Safety Guardrails
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                Personalize module shapes (classic square, rounded, circular dots), customize the 3 corner finder eyes, add your center company logo with an automatic knockout shield, and inspect your WCAG optical contrast ratio before sending to print.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
              <span>Automatic Level Q/H Error Correction</span>
              <span>·</span>
              <span>4-Module Quiet Zone Enforcement</span>
              <span>·</span>
              <span>Live Contrast Alert</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
