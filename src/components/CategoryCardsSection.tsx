import React from 'react';
import { QRCategory } from '../types/qr';
import { QR_CATEGORIES } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardsSectionProps {
  onSelectCategory: (category: QRCategory) => void;
}

export const CategoryCardsSection: React.FC<CategoryCardsSectionProps> = ({ onSelectCategory }) => {
  const groups: Array<'Basic' | 'Communication' | 'Wi-Fi & Social' | 'Business & Utilities'> = [
    'Basic',
    'Communication',
    'Wi-Fi & Social',
    'Business & Utilities',
  ];

  return (
    <section id="types" className="py-16 bg-white border-y border-neutral-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Supported Payloads & Standards
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            19 Dedicated QR Code Categories
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            Every category adheres strictly to official protocol specifications (vCard 3.0, iCalendar, standard Wi-Fi strings, mailto, and tel), ensuring guaranteed native scanning on all iOS and Android devices.
          </p>
        </div>

        <div className="space-y-10">
          {groups.map((group) => {
            const items = QR_CATEGORIES.filter((c) => c.group === group);
            return (
              <div key={group}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-100">
                  {group}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {items.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className="group p-5 bg-neutral-50/60 hover:bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl text-left transition-all hover:shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 text-neutral-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <CategoryIcon category={cat.id} className="w-4 h-4" />
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 group-hover:text-neutral-950">
                          {cat.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                          {cat.shortDesc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-600 truncate">
                        e.g. {cat.example}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
