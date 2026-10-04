import React, { useState, useMemo } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { BatchQRItem, QRCategory, QRDesignOptions } from '../types/qr';
import { QR_CATEGORIES, DEFAULT_FORM_DATA } from '../data/categories';
import { PRESET_TEMPLATES } from '../data/templates';
import { generatePayload } from '../utils/qrPayloads';
import { QRFormInputs } from './QRFormInputs';
import { QRCustomizer } from './QRCustomizer';
import { QRPreviewPanel } from './QRPreviewPanel';
import { CategoryIcon } from './CategoryIcon';

const INITIAL_DESIGN_OPTIONS: QRDesignOptions = {
  fgColor: '#000000',
  bgColor: '#ffffff',
  transparentBg: false,
  moduleStyle: 'square',
  cornerStyle: 'square',
  margin: 4,
  errorCorrection: 'M',
  resolution: 1024,
  logo: null,
};

interface QRGeneratorProps {
  initialCategory?: QRCategory;
  onCategorySelected?: (category: QRCategory) => void;
  onAddToBatch?: (item: Omit<BatchQRItem, 'id' | 'createdAt'>) => void;
  batchCount?: number;
  onOpenBatch?: () => void;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  initialCategory = 'url',
  onAddToBatch,
  batchCount = 0,
  onOpenBatch,
}) => {
  const [category, setCategory] = useState<QRCategory>(initialCategory);
  const [formDataState, setFormDataState] = useState<Record<QRCategory, any>>(DEFAULT_FORM_DATA);
  const [designOptions, setDesignOptions] = useState<QRDesignOptions>(INITIAL_DESIGN_OPTIONS);

  // Switch category
  const handleCategoryChange = (cat: QRCategory) => {
    setCategory(cat);
  };

  // Update specific form field
  const handleFieldChange = (field: string, val: any) => {
    setFormDataState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: val,
      },
    }));
  };

  // Reset current category form & design
  const handleReset = () => {
    setFormDataState((prev) => ({
      ...prev,
      [category]: { ...DEFAULT_FORM_DATA[category] },
    }));
    setDesignOptions(INITIAL_DESIGN_OPTIONS);
  };

  // Compute live payload and validation error
  const currentFormData = formDataState[category];
  const { payload, error: validationError } = useMemo(() => {
    return generatePayload(category, currentFormData);
  }, [category, currentFormData]);

  const currentCategoryMeta = useMemo(() => {
    return QR_CATEGORIES.find((c) => c.id === category) || QR_CATEGORIES[0];
  }, [category]);

  return (
    <section id="generator" className="pt-2 pb-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Selector Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Select QR Code Category ({QR_CATEGORIES.length} Formats Available)
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Active: <strong className="text-neutral-900">{currentCategoryMeta.name}</strong>
            </span>
          </div>

          {/* Horizontal scrollable category pill group */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            {QR_CATEGORIES.map((cat) => {
              const isActive = cat.id === category;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Branding Preset Templates Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none mt-3">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Brand Presets:</span>
            </span>
            {PRESET_TEMPLATES.map((tmpl) => {
              const isSelected =
                designOptions.fgColor.toLowerCase() === tmpl.options.fgColor.toLowerCase() &&
                designOptions.moduleStyle === tmpl.options.moduleStyle &&
                designOptions.cornerStyle === tmpl.options.cornerStyle;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() =>
                    setDesignOptions((prev) => ({
                      ...prev,
                      fgColor: tmpl.options.fgColor,
                      bgColor: tmpl.options.bgColor,
                      transparentBg: tmpl.options.transparentBg,
                      moduleStyle: tmpl.options.moduleStyle,
                      cornerStyle: tmpl.options.cornerStyle,
                      margin: tmpl.options.margin,
                      errorCorrection: tmpl.options.errorCorrection,
                    }))
                  }
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all shrink-0 text-xs ${
                    isSelected
                      ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300 shrink-0"
                    style={{ backgroundColor: tmpl.options.fgColor }}
                  />
                  <span>{tmpl.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration & Customizer (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            {/* Header info for active category */}
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
                  <CategoryIcon category={category} className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900">
                    {currentCategoryMeta.name}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {currentCategoryMeta.shortDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                title="Reset to default values"
                className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1 px-2.5 py-1.5 rounded border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Type Specific Inputs */}
            <QRFormInputs
              category={category}
              formData={currentFormData}
              onChange={handleFieldChange}
              error={validationError}
            />

            {/* Appearance Customizer Accordion */}
            <QRCustomizer
              options={designOptions}
              onChange={setDesignOptions}
            />
          </div>

          {/* Right Column: Live Preview & Downloads (5 cols) */}
          <div className="lg:col-span-5">
            <QRPreviewPanel
              payload={payload}
              options={designOptions}
              categoryName={currentCategoryMeta.name}
              hasValidationError={!!validationError}
              batchCount={batchCount}
              onOpenBatch={onOpenBatch}
              onAddToBatch={
                onAddToBatch && payload && !validationError
                  ? () =>
                      onAddToBatch({
                        name: `${currentCategoryMeta.name} Code`,
                        category,
                        categoryLabel: currentCategoryMeta.name,
                        payload,
                        options: designOptions,
                        selected: true,
                      })
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
