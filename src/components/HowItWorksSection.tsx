import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onScrollToGenerator: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onScrollToGenerator }) => {
  const steps = [
    {
      num: '01',
      title: 'Select Category & Enter Data',
      desc: 'Choose from 19 standard formats including URL, Wi-Fi credentials, vCard contact information, or WhatsApp chat links. Input is validated automatically in real time.',
    },
    {
      num: '02',
      title: 'Customize Appearance & Brand',
      desc: 'Pick contrast-safe color pairings, choose your preferred module pattern and corner eyes, or upload your company logo with an automatic knockout protection shield.',
    },
    {
      num: '03',
      title: 'Verify Decodability & Export',
      desc: 'Watch the built-in optical scanner verify machine readability, then download your finished QR code in high-resolution PNG, JPG, vector SVG, or print-ready PDF.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-neutral-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            How QuickQR Works
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            Generate production-grade QR codes in less than 30 seconds with zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className="relative p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-mono font-bold text-neutral-400 mb-4">
                  {s.num}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/60 text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                <span>Immediate client preview</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onScrollToGenerator}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span>Start Generating Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
