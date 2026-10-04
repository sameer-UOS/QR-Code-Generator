import React from 'react';
import { Eye, Ruler, Palette, ShieldCheck } from 'lucide-react';

export const BestPracticesSection: React.FC = () => {
  const practices = [
    {
      icon: Ruler,
      title: 'The 10:1 Distance Formula',
      rule: 'Width ≥ Scan Distance ÷ 10',
      desc: 'If a visitor scans from 1 meter away, the QR code must be at least 10 cm wide. For handheld business cards and menus (scanned from ~20 cm), keep it at least 2 × 2 cm (0.8 × 0.8 in).',
    },
    {
      icon: Palette,
      title: 'Contrast Over Decoration',
      rule: 'Minimum 4:1 Optical Ratio',
      desc: 'Always use a dark foreground on a light background. Never use inverted colors or pastel shades on white paper; smartphone cameras require sharp optical contrast to recognize the finder eyes.',
    },
    {
      icon: Eye,
      title: 'Respect the Quiet Zone',
      rule: '4 Modules Blank Border',
      desc: 'Leave a clear, unprinted buffer of at least 4 module widths around the entire QR square. If text, icons, or borders touch the code edges, camera decoders will fail to isolate the matrix.',
    },
    {
      icon: ShieldCheck,
      title: 'Logo Overlay Discipline',
      rule: 'Maximum 25% Code Width',
      desc: 'Always use Level Q (25%) or Level H (30%) Error Correction when placing a brand logo in the center. Ensure the logo has a knockout background so modules do not bleed into your mark.',
    },
  ];

  return (
    <section id="best-practices" className="py-20 bg-neutral-50 border-b border-neutral-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Print & Production Standards
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            QR Code Scanning & Design Best Practices
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            Follow these optical engineering guidelines to ensure your QR codes scan reliably across older phones, low-light restaurants, and large outdoor banners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {practices.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-1">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-neutral-500 mb-3">
                    {p.rule}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 text-[11px] font-medium text-emerald-700">
                  Built into QuickQR defaults
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
