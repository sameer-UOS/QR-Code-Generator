import React, { useState } from 'react';
import {
  X,
  Archive,
  Download,
  Trash2,
  CheckSquare,
  Square,
  FileCode,
  FileImage,
  Plus,
  Layers,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import { BatchQRItem, QRDesignOptions } from '../types/qr';
import { exportBatchAsZip } from '../utils/qrZipExport';
import { CategoryIcon } from './CategoryIcon';

interface BatchExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: BatchQRItem[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (select: boolean) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onUpdateName: (id: string, name: string) => void;
  onBulkAdd: (lines: string[], defaultOptions: QRDesignOptions) => void;
  currentDesignOptions: QRDesignOptions;
}

export const BatchExportModal: React.FC<BatchExportModalProps> = ({
  isOpen,
  onClose,
  items,
  onToggleSelect,
  onSelectAll,
  onRemoveItem,
  onClearAll,
  onUpdateName,
  onBulkAdd,
  currentDesignOptions,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'bulk'>('list');
  const [format, setFormat] = useState<'png' | 'jpg' | 'svg'>('png');
  const [resolution, setResolution] = useState<number>(1024);
  const [zipName, setZipName] = useState<string>('quickqr-collection.zip');
  const [bulkText, setBulkText] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [resultMsg, setResultMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const selectedCount = items.filter((i) => i.selected).length;
  const allSelected = items.length > 0 && selectedCount === items.length;

  const handleDownloadZip = async () => {
    if (selectedCount === 0 || isExporting) return;
    setIsExporting(true);
    setResultMsg(null);

    const res = await exportBatchAsZip(items, {
      format,
      resolution,
      zipFilename: zipName.endsWith('.zip') ? zipName : `${zipName}.zip`,
      onProgress: (cur, tot, name) => {
        setProgressMsg(`Packing ${cur} of ${tot}: ${name}...`);
      },
    });

    setIsExporting(false);
    setProgressMsg('');
    setResultMsg({ success: res.success, text: res.message });
  };

  const handleAddBulkLines = () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    onBulkAdd(lines, currentDesignOptions);
    setBulkText('');
    setActiveTab('list');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="batch-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Archive className="w-4 h-4" />
            </div>
            <div>
              <h2 id="batch-modal-title" className="text-base font-bold text-neutral-900">
                Batch Collection & ZIP Export
              </h2>
              <p className="text-xs text-neutral-500">
                Select multiple QR codes and download them as a single packaged ZIP file
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-neutral-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`pb-2.5 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Codes ({items.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bulk')}
              className={`pb-2.5 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'bulk'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Bulk Paste</span>
            </button>
          </div>

          {items.length > 0 && activeTab === 'list' && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-red-600 hover:text-red-700 pb-2.5 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'list' && (
            <div>
              {items.length === 0 ? (
                <div className="text-center py-12 px-4 border border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-3">
                    <Archive className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-1">
                    Your batch collection is empty
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
                    Create any QR code in the generator and click "Add to Batch (ZIP)", or use the Quick Bulk Paste tab to add multiple URLs at once.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bulk')}
                    className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Paste Bulk URLs</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select All Controls */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs text-neutral-600">
                    <button
                      type="button"
                      onClick={() => onSelectAll(!allSelected)}
                      className="inline-flex items-center gap-2 font-medium hover:text-neutral-900"
                    >
                      {allSelected ? (
                        <CheckSquare className="w-4 h-4 text-neutral-900" />
                      ) : (
                        <Square className="w-4 h-4 text-neutral-400" />
                      )}
                      <span>
                        {allSelected ? 'Deselect All' : 'Select All'} ({selectedCount} of {items.length} selected)
                      </span>
                    </button>

                    <span className="text-neutral-400">
                      Files will be numbered 01, 02... in the ZIP
                    </span>
                  </div>

                  {/* List of items */}
                  <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                          item.selected
                            ? 'bg-neutral-50/80 border-neutral-300'
                            : 'bg-white border-neutral-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => onToggleSelect(item.id)}
                            className="shrink-0 text-neutral-900 hover:scale-105 transition-transform"
                          >
                            {item.selected ? (
                              <CheckSquare className="w-4 h-4 text-neutral-900" />
                            ) : (
                              <Square className="w-4 h-4 text-neutral-300" />
                            )}
                          </button>

                          <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center shrink-0">
                            <CategoryIcon category={item.category} className="w-4 h-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => onUpdateName(item.id, e.target.value)}
                                placeholder="File name"
                                className="text-xs font-bold text-neutral-900 bg-transparent hover:bg-neutral-100 focus:bg-white focus:ring-1 focus:ring-neutral-900 px-1 py-0.5 rounded transition-all max-w-[200px] truncate"
                              />
                              <span className="text-[10px] text-neutral-400 shrink-0">
                                {item.categoryLabel}
                              </span>
                            </div>
                            <div className="text-[11px] font-mono text-neutral-500 truncate max-w-sm">
                              {item.payload}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          title="Remove item"
                          className="w-7 h-7 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="bulk-textarea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Paste Multiple URLs or Names
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  Enter one item per line. You can optionally include a custom filename separated by a comma (e.g. <code>https://example.com/table-1, Table 1</code>).
                </p>
                <textarea
                  id="bulk-textarea"
                  rows={6}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={`https://myrestaurant.com/menu-1, Table 1 Menu\nhttps://myrestaurant.com/menu-2, Table 2 Menu\nhttps://myrestaurant.com/menu-3, Table 3 Menu`}
                  className="w-full p-3 font-mono text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>
                  All pasted codes will automatically inherit your current design settings (colors, corner styles, and logo).
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddBulkLines}
                  disabled={!bulkText.trim()}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lines to Batch Collection</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Export Controls Bar */}
        {items.length > 0 && activeTab === 'list' && (
          <div className="p-6 bg-neutral-50 border-t border-neutral-200 shrink-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Output format */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  File Format
                </label>
                <div className="grid grid-cols-3 gap-1 p-0.5 bg-neutral-200 rounded-lg text-xs font-semibold">
                  {(['png', 'jpg', 'svg'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`py-1.5 rounded transition-all uppercase ${
                        format === fmt
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution (for PNG/JPG) */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  Resolution
                </label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(parseInt(e.target.value, 10))}
                  disabled={format === 'svg'}
                  className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-400"
                >
                  <option value="512">512 × 512 px (Web)</option>
                  <option value="1024">1024 × 1024 px (Print Standard)</option>
                  <option value="2048">2048 × 2048 px (High DPI Posters)</option>
                  <option value="4096">4096 × 4096 px (Ultra HD Signage)</option>
                </select>
              </div>

              {/* Archive Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  ZIP Archive Filename
                </label>
                <input
                  type="text"
                  value={zipName}
                  onChange={(e) => setZipName(e.target.value)}
                  placeholder="quickqr-batch.zip"
                  className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Status Feedback */}
            {progressMsg && (
              <div className="text-xs text-neutral-600 font-medium animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span>{progressMsg}</span>
              </div>
            )}

            {resultMsg && (
              <div
                className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                  resultMsg.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                {resultMsg.success ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{resultMsg.text}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-neutral-500">
                {selectedCount} item{selectedCount === 1 ? '' : 's'} ready to pack into single ZIP archive
              </span>

              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={selectedCount === 0 || isExporting}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating ZIP...' : `Download ${selectedCount} Selected as ZIP Archive`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
