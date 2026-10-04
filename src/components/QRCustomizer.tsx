import React, { useRef, useState } from 'react';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Maximize2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Check,
} from 'lucide-react';
import { CornerStyle, ErrorCorrectionLevel, ModuleStyle, QRDesignOptions, QRPresetTemplate } from '../types/qr';
import { getContrastRatio } from '../utils/qrRenderer';
import { PRESET_TEMPLATES } from '../data/templates';

interface QRCustomizerProps {
  options: QRDesignOptions;
  onChange: (options: QRDesignOptions) => void;
}

const COLOR_PRESETS = [
  { name: 'Monochrome Classic', fg: '#000000', bg: '#ffffff' },
  { name: 'Midnight Cobalt', fg: '#0f172a', bg: '#f8fafc' },
  { name: 'Deep Royal Indigo', fg: '#1e1b4b', bg: '#ffffff' },
  { name: 'Emerald Forest', fg: '#064e3b', bg: '#f0fdf4' },
  { name: 'Warm Espresso', fg: '#38220f', bg: '#fffbeb' },
  { name: 'Crimson Slate', fg: '#881337', bg: '#fff1f2' },
  { name: 'Nordic Ocean', fg: '#0c4a6e', bg: '#f0f9ff' },
  { name: 'Obsidian Velvet', fg: '#18181b', bg: '#fafafa' },
];

const PRESET_LOGOS = [
  { name: 'Globe', url: 'https://api.iconify.design/lucide:globe.svg?color=%2318181b' },
  { name: 'Wi-Fi', url: 'https://api.iconify.design/lucide:wifi.svg?color=%2318181b' },
  { name: 'WhatsApp', url: 'https://api.iconify.design/simple-icons:whatsapp.svg?color=%2325D366' },
  { name: 'LinkedIn', url: 'https://api.iconify.design/simple-icons:linkedin.svg?color=%230A66C2' },
  { name: 'GitHub', url: 'https://api.iconify.design/simple-icons:github.svg?color=%23181717' },
  { name: 'Instagram', url: 'https://api.iconify.design/simple-icons:instagram.svg?color=%23E4405F' },
  { name: 'YouTube', url: 'https://api.iconify.design/simple-icons:youtube.svg?color=%23FF0000' },
  { name: 'X / Twitter', url: 'https://api.iconify.design/simple-icons:x.svg?color=%23000000' },
];

export const QRCustomizer: React.FC<QRCustomizerProps> = ({ options, onChange }) => {
  const [activeTab, setActiveTab] = React.useState<'templates' | 'colors' | 'shapes' | 'logo' | 'size'>('templates');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [logoError, setLogoError] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contrast = getContrastRatio(options.fgColor, options.bgColor);
  const isContrastLow = contrast < 3.8;

  const handleApplyTemplate = (template: QRPresetTemplate) => {
    onChange({
      ...options,
      fgColor: template.options.fgColor,
      bgColor: template.options.bgColor,
      transparentBg: template.options.transparentBg,
      moduleStyle: template.options.moduleStyle,
      cornerStyle: template.options.cornerStyle,
      margin: template.options.margin,
      errorCorrection: template.options.errorCorrection,
    });
  };

  const filteredTemplates = selectedTag === 'All'
    ? PRESET_TEMPLATES
    : PRESET_TEMPLATES.filter((t) => t.categoryTag === selectedTag);

  const tags = ['All', 'Corporate', 'Tech & SaaS', 'Hospitality', 'Creative', 'Eco & Organic', 'Luxury & Event'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (< 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Logo file size must be less than 2MB.');
      return;
    }

    // Check format
    if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
      setLogoError('Please upload a PNG, JPG, WebP, or SVG image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({
          ...options,
          logo: {
            url: reader.result,
            sizePercent: options.logo?.sizePercent || 20,
            hasBackground: true,
          },
          // elevate error correction for safety
          errorCorrection: options.errorCorrection === 'L' ? 'Q' : options.errorCorrection,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({
      ...options,
      logo: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 sm:p-5 mt-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
          Design & Customization
        </h3>
        <span className="text-xs text-neutral-500">
          Client-side rendering
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-neutral-200/70 rounded-lg mb-4 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'templates'
              ? 'bg-white text-neutral-900 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'colors'
              ? 'bg-white text-neutral-900 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shapes')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'shapes'
              ? 'bg-white text-neutral-900 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Shapes className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Shapes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'logo'
              ? 'bg-white text-neutral-900 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('size')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'size'
              ? 'bg-white text-neutral-900 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quality</span>
        </button>
      </div>

      {/* Preset Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Professional Brand Presets
            </span>
            <span className="text-[11px] text-neutral-400">
              1-click instant styling
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredTemplates.map((tmpl) => {
              const isSelected =
                options.fgColor.toLowerCase() === tmpl.options.fgColor.toLowerCase() &&
                options.moduleStyle === tmpl.options.moduleStyle &&
                options.cornerStyle === tmpl.options.cornerStyle;

              const tmplContrast = getContrastRatio(tmpl.options.fgColor, tmpl.options.bgColor);

              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all relative ${
                    isSelected
                      ? 'bg-white border-neutral-900 ring-2 ring-neutral-900 shadow-xs'
                      : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-2xs'
                  }`}
                >
                  {/* Stylized QR Swatch */}
                  <div
                    className="w-12 h-12 rounded-lg shrink-0 border border-neutral-200 flex flex-col justify-between p-1 relative overflow-hidden"
                    style={{
                      backgroundColor: tmpl.options.transparentBg ? '#f8fafc' : tmpl.options.bgColor,
                    }}
                  >
                    {/* Top finder eyes */}
                    <div className="flex justify-between items-center w-full">
                      <div
                        className={`w-3 h-3 ${
                          tmpl.options.cornerStyle === 'circle'
                            ? 'rounded-full'
                            : tmpl.options.cornerStyle === 'rounded' || tmpl.options.cornerStyle === 'squircle'
                            ? 'rounded-xs'
                            : 'rounded-none'
                        }`}
                        style={{ backgroundColor: tmpl.options.fgColor }}
                      />
                      <div
                        className={`w-3 h-3 ${
                          tmpl.options.cornerStyle === 'circle'
                            ? 'rounded-full'
                            : tmpl.options.cornerStyle === 'rounded' || tmpl.options.cornerStyle === 'squircle'
                            ? 'rounded-xs'
                            : 'rounded-none'
                        }`}
                        style={{ backgroundColor: tmpl.options.fgColor }}
                      />
                    </div>
                    {/* Center body modules mockup */}
                    <div className="flex justify-around items-center w-full my-0.5 opacity-90">
                      <div
                        className={`w-1 h-1 ${tmpl.options.moduleStyle === 'dots' ? 'rounded-full' : ''}`}
                        style={{ backgroundColor: tmpl.options.fgColor }}
                      />
                      <div
                        className={`w-1.5 h-1.5 ${tmpl.options.moduleStyle === 'dots' ? 'rounded-full' : ''}`}
                        style={{ backgroundColor: tmpl.options.fgColor }}
                      />
                      <div
                        className={`w-1 h-1 ${tmpl.options.moduleStyle === 'dots' ? 'rounded-full' : ''}`}
                        style={{ backgroundColor: tmpl.options.fgColor }}
                      />
                    </div>
                    {/* Bottom finder eye */}
                    <div className="flex items-center w-full">
                      <div
                        className={`w-3 h-3 ${
                          tmpl.options.cornerStyle === 'circle'
                            ? 'rounded-full'
                            : tmpl.options.cornerStyle === 'rounded' || tmpl.options.cornerStyle === 'squircle'
                            ? 'rounded-xs'
                            : 'rounded-none'
                        }`}
                        style={{ backgroundColor: tmpl.options.fgColor }}
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">
                        {tmpl.name}
                      </h4>
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-400">
                          {tmplContrast.toFixed(1)}:1
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                      {tmpl.categoryTag}
                    </span>
                    <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-neutral-100/70 border border-neutral-200/80 rounded-lg text-xs text-neutral-600 flex items-center justify-between">
            <span>
              Tip: You can select any template and fine-tune colors, patterns, or center logos in the other tabs.
            </span>
          </div>
        </div>
      )}

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="fg-color" className="block text-xs font-medium text-neutral-700 mb-1.5">
                Foreground (Dots & Eyes)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="fg-color"
                  type="color"
                  value={options.fgColor}
                  onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
                  className="w-9 h-9 p-0.5 border border-neutral-300 rounded cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={options.fgColor}
                  onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-neutral-300 rounded uppercase text-neutral-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bg-color" className="block text-xs font-medium text-neutral-700 mb-1.5">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="bg-color"
                  type="color"
                  value={options.bgColor}
                  disabled={options.transparentBg}
                  onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
                  className="w-9 h-9 p-0.5 border border-neutral-300 rounded cursor-pointer shrink-0 disabled:opacity-40"
                />
                <input
                  type="text"
                  value={options.transparentBg ? 'Transparent' : options.bgColor}
                  disabled={options.transparentBg}
                  onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-neutral-300 rounded uppercase text-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="transparent-toggle"
              checked={options.transparentBg}
              onChange={(e) => onChange({ ...options, transparentBg: e.target.checked })}
              className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
            />
            <label htmlFor="transparent-toggle" className="text-xs text-neutral-700 cursor-pointer select-none">
              Transparent Background (saved with alpha channel in PNG & SVG)
            </label>
          </div>

          {/* Color Presets */}
          <div>
            <span className="block text-xs font-medium text-neutral-600 mb-1.5">
              Tested Contrast Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onChange({ ...options, fgColor: p.fg, bgColor: p.bg, transparentBg: false })}
                  className="flex items-center gap-1.5 p-1.5 bg-white border border-neutral-200 hover:border-neutral-400 rounded text-left transition-colors"
                >
                  <div className="flex w-5 h-5 rounded overflow-hidden border border-neutral-200 shrink-0">
                    <span className="w-1/2 h-full" style={{ backgroundColor: p.fg }} />
                    <span className="w-1/2 h-full" style={{ backgroundColor: p.bg }} />
                  </div>
                  <span className="text-[11px] text-neutral-700 truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contrast Diagnostic */}
          <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
            isContrastLow 
              ? 'bg-amber-50 border-amber-300 text-amber-900' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-center gap-2">
              {isContrastLow ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span>
                Contrast: <strong className="font-mono">{contrast.toFixed(1)}:1</strong> — {
                  isContrastLow 
                    ? 'Low optical contrast may fail on older phone cameras.' 
                    : 'Optimal optical contrast ratio for instant scanning.'
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Shapes Tab */}
      {activeTab === 'shapes' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Module Pattern (Inner Grid)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'square', label: 'Classic Square', desc: 'Maximum crispness' },
                  { id: 'rounded', label: 'Rounded Modules', desc: 'Modern & gentle' },
                  { id: 'dots', label: 'Circular Dots', desc: 'Distinctive dots' },
                  { id: 'smooth', label: 'Smooth Curvature', desc: 'Clean connected' },
                ] as { id: ModuleStyle; label: string; desc: string }[]
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onChange({ ...options, moduleStyle: m.id })}
                  className={`p-2.5 text-left border rounded-lg transition-all ${
                    options.moduleStyle === m.id
                      ? 'border-neutral-900 bg-white ring-1 ring-neutral-900'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-semibold text-neutral-900">{m.label}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Corner Finder Eyes (3 Outer Markers)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'square', label: 'Standard Square', desc: 'ISO Default' },
                  { id: 'rounded', label: 'Soft Rounded', desc: 'Curved Frame' },
                  { id: 'circle', label: 'Circle Eye', desc: 'Round Pupil' },
                  { id: 'squircle', label: 'Squircle', desc: 'Balanced Soft' },
                ] as { id: CornerStyle; label: string; desc: string }[]
              ).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onChange({ ...options, cornerStyle: c.id })}
                  className={`p-2.5 text-left border rounded-lg transition-all ${
                    options.cornerStyle === c.id
                      ? 'border-neutral-900 bg-white ring-1 ring-neutral-900'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-semibold text-neutral-900">{c.label}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div>
              <label htmlFor="margin-select" className="block text-xs font-medium text-neutral-700 mb-1">
                Quiet Zone Margin
              </label>
              <select
                id="margin-select"
                value={options.margin}
                onChange={(e) => onChange({ ...options, margin: parseInt(e.target.value, 10) })}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="4">4 Modules (Standard recommended)</option>
                <option value="2">2 Modules (Compact)</option>
                <option value="1">1 Module (Tight border)</option>
                <option value="0">0 Modules (Flush border - Use with caution)</option>
              </select>
            </div>

            <div>
              <label htmlFor="ec-select" className="block text-xs font-medium text-neutral-700 mb-1">
                Error Correction Level
              </label>
              <select
                id="ec-select"
                value={options.errorCorrection}
                onChange={(e) =>
                  onChange({ ...options, errorCorrection: e.target.value as ErrorCorrectionLevel })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="L">Level L (7% recovery - Smallest code size)</option>
                <option value="M">Level M (15% recovery - Standard)</option>
                <option value="Q">Level Q (25% recovery - Great for logos)</option>
                <option value="H">Level H (30% recovery - Maximum durability)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Logo Tab */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Upload Custom Logo
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleFileUpload}
                className="text-xs text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer"
              />
              {options.logo && (
                <button
                  type="button"
                  onClick={removeLogo}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
            {logoError && (
              <p className="text-xs text-red-600 mt-1 font-medium">{logoError}</p>
            )}
            <p className="text-[11px] text-neutral-500 mt-1">
              Supports PNG, JPG, WebP, SVG. Max 2MB. Stays entirely in your browser.
            </p>
          </div>

          {/* Quick preset brand icons */}
          <div>
            <span className="block text-xs font-medium text-neutral-600 mb-1.5">
              Or Choose a Preset Badge
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PRESET_LOGOS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...options,
                      logo: {
                        url: p.url,
                        sizePercent: options.logo?.sizePercent || 20,
                        hasBackground: true,
                      },
                      errorCorrection: 'Q',
                    })
                  }
                  title={p.name}
                  className="flex flex-col items-center justify-center p-2 bg-white border border-neutral-200 hover:border-neutral-900 rounded-lg transition-all group"
                >
                  <img
                    src={p.url}
                    alt={p.name}
                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  />
                  <span className="text-[9px] text-neutral-600 mt-1 truncate max-w-full">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {options.logo && (
            <div className="space-y-3 pt-2 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <label htmlFor="logo-slider" className="text-xs font-medium text-neutral-700">
                  Logo Size Ratio: {options.logo.sizePercent}%
                </label>
                <span className="text-[10px] text-neutral-500">
                  Recommended: ≤ 22%
                </span>
              </div>
              <input
                id="logo-slider"
                type="range"
                min="14"
                max="28"
                step="1"
                value={options.logo.sizePercent}
                onChange={(e) =>
                  onChange({
                    ...options,
                    logo: {
                      ...options.logo!,
                      sizePercent: parseInt(e.target.value, 10),
                    },
                  })
                }
                className="w-full accent-neutral-900 cursor-pointer"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shield-toggle"
                  checked={options.logo.hasBackground}
                  onChange={(e) =>
                    onChange({
                      ...options,
                      logo: {
                        ...options.logo!,
                        hasBackground: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <label htmlFor="shield-toggle" className="text-xs text-neutral-700 cursor-pointer select-none">
                  Knockout Shield (adds clear background shield so dark modules do not bleed into the logo)
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Size / Resolution Tab */}
      {activeTab === 'size' && (
        <div className="space-y-3">
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Export Canvas Dimension
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { size: 512, label: '512 × 512 px', tag: 'Web & Social' },
              { size: 1024, label: '1024 × 1024 px', tag: 'Flyers & Menus' },
              { size: 2048, label: '2048 × 2048 px', tag: 'Posters (High DPI)' },
              { size: 4096, label: '4096 × 4096 px', tag: 'Billboards & Signage' },
            ].map((res) => (
              <button
                key={res.size}
                type="button"
                onClick={() => onChange({ ...options, resolution: res.size })}
                className={`p-2.5 text-left border rounded-lg transition-all ${
                  options.resolution === res.size
                    ? 'border-neutral-900 bg-white ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="text-xs font-semibold text-neutral-900">{res.label}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{res.tag}</div>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-neutral-500">
            For infinite mathematical scalability, you can also download the Vector SVG format directly.
          </p>
        </div>
      )}
    </div>
  );
};
