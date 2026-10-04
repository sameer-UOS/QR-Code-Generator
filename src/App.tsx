import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QRGenerator } from './components/QRGenerator';
import { CategoryCardsSection } from './components/CategoryCardsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { UseCasesSection } from './components/UseCasesSection';
import { StaticVsDynamicSection } from './components/StaticVsDynamicSection';
import { BestPracticesSection } from './components/BestPracticesSection';
import { GuidesSection } from './components/GuidesSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { BatchExportModal } from './components/BatchExportModal';
import { BatchQRItem, QRCategory, QRDesignOptions } from './types/qr';
import { ArrowRight, QrCode } from 'lucide-react';

const INITIAL_BATCH_ITEMS: BatchQRItem[] = [
  {
    id: 'demo-1',
    name: 'Website Portfolio',
    category: 'url',
    categoryLabel: 'Website / URL',
    payload: 'https://example.com',
    options: {
      fgColor: '#000000',
      bgColor: '#ffffff',
      transparentBg: false,
      moduleStyle: 'square',
      cornerStyle: 'square',
      margin: 4,
      errorCorrection: 'M',
      resolution: 1024,
      logo: null,
    },
    createdAt: Date.now() - 30000,
    selected: true,
  },
  {
    id: 'demo-2',
    name: 'Guest Wi-Fi Access',
    category: 'wifi',
    categoryLabel: 'Wi-Fi Network',
    payload: 'WIFI:T:WPA;S:Studio-Guest-5G;P:WelcomeGuest2026;H:false;;',
    options: {
      fgColor: '#0f172a',
      bgColor: '#ffffff',
      transparentBg: false,
      moduleStyle: 'rounded',
      cornerStyle: 'rounded',
      margin: 4,
      errorCorrection: 'M',
      resolution: 1024,
      logo: null,
    },
    createdAt: Date.now() - 20000,
    selected: true,
  },
  {
    id: 'demo-3',
    name: 'Alex Morgan vCard',
    category: 'vcard',
    categoryLabel: 'Contact (vCard)',
    payload:
      'BEGIN:VCARD\r\nVERSION:3.0\r\nN:Morgan;Alex;;;\r\nFN:Alex Morgan\r\nORG:Nexus Innovations\r\nTITLE:Product Director\r\nTEL;TYPE=CELL,VOICE:+15553492011\r\nEMAIL;TYPE=PREF,INTERNET:alex.morgan@example.com\r\nEND:VCARD',
    options: {
      fgColor: '#1e1b4b',
      bgColor: '#ffffff',
      transparentBg: false,
      moduleStyle: 'dots',
      cornerStyle: 'circle',
      margin: 4,
      errorCorrection: 'Q',
      resolution: 1024,
      logo: null,
    },
    createdAt: Date.now() - 10000,
    selected: true,
  },
];

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<QRCategory>('url');
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);
  const [batchItems, setBatchItems] = useState<BatchQRItem[]>(INITIAL_BATCH_ITEMS);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);

  const scrollToGenerator = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTypes = () => {
    const el = document.getElementById('types');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat: QRCategory) => {
    setSelectedCategory(cat);
    scrollToGenerator();
  };

  // Batch collection handlers
  const handleAddToBatch = (itemData: Omit<BatchQRItem, 'id' | 'createdAt'>) => {
    const newItem: BatchQRItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: Date.now(),
      selected: true,
    };
    setBatchItems((prev) => [newItem, ...prev]);
  };

  const handleToggleSelectBatch = (id: string) => {
    setBatchItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAllBatch = (select: boolean) => {
    setBatchItems((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const handleRemoveBatchItem = (id: string) => {
    setBatchItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearBatch = () => {
    setBatchItems([]);
  };

  const handleUpdateBatchName = (id: string, name: string) => {
    setBatchItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const handleBulkAddLines = (lines: string[], defaultOptions: QRDesignOptions) => {
    const newItems: BatchQRItem[] = lines.map((line, idx) => {
      const parts = line.split(',');
      const payload = parts[0].trim();
      const customName = parts[1]?.trim() || `Code ${batchItems.length + idx + 1}`;
      return {
        id: `bulk-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
        name: customName,
        category: 'url',
        categoryLabel: 'Bulk Item',
        payload,
        options: { ...defaultOptions },
        createdAt: Date.now() + idx,
        selected: true,
      };
    });
    setBatchItems((prev) => [...newItems, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation */}
      <Header
        onScrollToGenerator={scrollToGenerator}
        onOpenLegal={setActiveLegalModal}
        batchCount={batchItems.length}
        onOpenBatch={() => setIsBatchModalOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onScrollToGenerator={scrollToGenerator}
          onScrollToTypes={scrollToTypes}
        />

        {/* 2. Interactive Working Generator (visible above or near the fold) */}
        <QRGenerator
          key={selectedCategory}
          initialCategory={selectedCategory}
          onCategorySelected={setSelectedCategory}
          onAddToBatch={handleAddToBatch}
          batchCount={batchItems.length}
          onOpenBatch={() => setIsBatchModalOpen(true)}
        />

        {/* 3. Categorized QR Code Types (19 categories) */}
        <CategoryCardsSection onSelectCategory={handleCategorySelect} />

        {/* 4. Core Features (Bento Grid) */}
        <FeaturesSection />

        {/* 5. How It Works (3 Steps) */}
        <HowItWorksSection onScrollToGenerator={scrollToGenerator} />

        {/* 6. Real-World Use Cases */}
        <UseCasesSection onSelectCategory={handleCategorySelect} />

        {/* 7. Static vs Dynamic QR Codes Guide */}
        <StaticVsDynamicSection />

        {/* 8. Scanning & Print Best Practices */}
        <BestPracticesSection />

        {/* 9. Comprehensive Educational Guides */}
        <GuidesSection onSelectCategory={handleCategorySelect} />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Final Call To Action */}
        <section className="py-20 bg-neutral-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6 text-white">
              <QrCode className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Create Your QR Code for Free
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              No account creation, no expiration dates, and no watermarks. Generate high-resolution, machine-verified QR codes or export entire batches in a single ZIP archive.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={scrollToGenerator}
                className="px-7 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Launch Free Generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsBatchModalOpen(true)}
                className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all border border-neutral-700"
              >
                <span>Open Batch ZIP Export ({batchItems.length})</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={setActiveLegalModal}
        onScrollToGenerator={scrollToGenerator}
        onScrollToTypes={scrollToTypes}
      />

      {/* Batch Collection & ZIP Export Modal */}
      <BatchExportModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        items={batchItems}
        onToggleSelect={handleToggleSelectBatch}
        onSelectAll={handleSelectAllBatch}
        onRemoveItem={handleRemoveBatchItem}
        onClearAll={handleClearBatch}
        onUpdateName={handleUpdateBatchName}
        onBulkAdd={handleBulkAddLines}
        currentDesignOptions={{
          fgColor: '#000000',
          bgColor: '#ffffff',
          transparentBg: false,
          moduleStyle: 'square',
          cornerStyle: 'square',
          margin: 4,
          errorCorrection: 'M',
          resolution: 1024,
          logo: null,
        }}
      />

      {/* Legal & Privacy Dialogs */}
      <LegalModals
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}

export default App;

