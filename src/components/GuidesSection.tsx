import React, { useState } from 'react';
import { GUIDES, GuideArticle } from '../data/guides';
import { BookOpen, ArrowRight, X, Check } from 'lucide-react';
import { QRCategory } from '../types/qr';

interface GuidesSectionProps {
  onSelectCategory: (cat: QRCategory) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ onSelectCategory }) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideArticle | null>(null);

  return (
    <section id="guides" className="py-20 bg-white border-b border-neutral-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Educational Resources
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Comprehensive QR Code Guides
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            Practical tutorials, specifications, and print recommendations written by software and print engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDES.map((g) => (
            <article
              key={g.id}
              className="p-6 sm:p-7 bg-neutral-50/70 border border-neutral-200 hover:border-neutral-300 rounded-2xl flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                  <span className="font-semibold text-neutral-900">{g.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{g.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                  {g.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {g.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedGuide(g)}
                  className="text-xs font-bold text-neutral-900 hover:text-neutral-700 inline-flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Guide</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCategory(g.targetCategory as QRCategory)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Guide Reader Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
            <button
              type="button"
              onClick={() => setSelectedGuide(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
              <span className="font-semibold text-neutral-900">{selectedGuide.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedGuide.readTime}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mb-4">
              {selectedGuide.title}
            </h2>

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              {selectedGuide.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Tips Callout */}
            <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                Key Engineering Tips
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600">
                {selectedGuide.keyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
              >
                Close Guide
              </button>
              <button
                type="button"
                onClick={() => {
                  const cat = selectedGuide.targetCategory as QRCategory;
                  setSelectedGuide(null);
                  onSelectCategory(cat);
                }}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-all"
              >
                <span>Launch Generator for this Type</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
