import React from 'react';
import { QrCode, ArrowRight, Archive } from 'lucide-react';

interface HeaderProps {
  onScrollToGenerator: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'about') => void;
  batchCount?: number;
  onOpenBatch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToGenerator,
  onOpenLegal,
  batchCount = 0,
  onOpenBatch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-neutral-900 font-bold text-xl tracking-tight group"
        >
          <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <span>QuickQR</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <a href="#generator" className="hover:text-neutral-900 transition-colors">Generator</a>
          <a href="#types" className="hover:text-neutral-900 transition-colors">QR Types</a>
          <a href="#features" className="hover:text-neutral-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">How It Works</a>
          <a href="#best-practices" className="hover:text-neutral-900 transition-colors">Best Practices</a>
          <a href="#guides" className="hover:text-neutral-900 transition-colors">Guides</a>
          <a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {onOpenBatch && (
            <button
              onClick={onOpenBatch}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                batchCount > 0
                  ? 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <Archive className="w-3.5 h-3.5 text-neutral-700" />
              <span>Batch ZIP</span>
              {batchCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                  {batchCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onScrollToGenerator}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shadow-sm active:scale-95"
          >
            <span>Create QR Code</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

