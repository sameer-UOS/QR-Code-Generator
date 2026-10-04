import React from 'react';
import { Utensils, Wifi, Contact, PackageCheck, CalendarDays, Store } from 'lucide-react';
import { QRCategory } from '../types/qr';

interface UseCasesSectionProps {
  onSelectCategory: (category: QRCategory) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onSelectCategory }) => {
  const cases = [
    {
      icon: Utensils,
      title: 'Restaurants & Hospitality',
      category: 'url' as QRCategory,
      tag: 'Contactless Menus',
      desc: 'Display clean QR stickers on dining tables linking directly to your live PDF menu, online ordering portal, or Google review page.',
    },
    {
      icon: Wifi,
      title: 'Hotels, Cafes & Airbnb',
      category: 'wifi' as QRCategory,
      tag: 'One-Tap Wi-Fi',
      desc: 'Allow guests to connect to high-speed guest Wi-Fi instantly without deciphering handwritten passwords or typing lengthy security keys.',
    },
    {
      icon: Contact,
      title: 'Executives & Freelancers',
      category: 'vcard' as QRCategory,
      tag: 'Digital Business Cards',
      desc: 'Print a vCard 3.0 code on the back of your business card. Prospects scan and save your contact information directly into their phonebook.',
    },
    {
      icon: PackageCheck,
      title: 'Retail & Packaging',
      category: 'url' as QRCategory,
      tag: 'Product Manuals',
      desc: 'Replace bulky printed instruction booklets with a high-resolution vector QR code leading to digital setup guides and warranty forms.',
    },
    {
      icon: CalendarDays,
      title: 'Conferences & Events',
      category: 'event' as QRCategory,
      tag: 'Calendar Invites',
      desc: 'Encode keynotes, venue locations, and start times into an iCalendar code so attendees can add sessions to Google Calendar or Apple iCal.',
    },
    {
      icon: Store,
      title: 'Local Businesses & Retail',
      category: 'business' as QRCategory,
      tag: 'Storefront Portals',
      desc: 'Place window decals with your store hours, WhatsApp customer service link, and Google Maps directions for after-hours shoppers.',
    },
  ];

  return (
    <section className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Real-World Applications
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Designed for Everyday Scenarios
          </h2>
          <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
            See how entrepreneurs, designers, event hosts, and retail stores use QuickQR to bridge offline physical materials with online destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-neutral-500">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => onSelectCategory(c.category)}
                    className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Generate for this use case</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
