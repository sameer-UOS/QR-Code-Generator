import React, { useRef, useEffect, useState } from 'react';
import {
  Download,
  Copy,
  Share2,
  FileText,
  Check,
  AlertTriangle,
  CheckCircle2,
  Eye,
  FileCode,
  FileImage,
  Archive,
  Plus,
} from 'lucide-react';
import { QRDesignOptions, VerificationResult } from '../types/qr';
import { renderQRToCanvas, generateSvgString, verifyQrCanvas, getContrastRatio } from '../utils/qrRenderer';
import {
  exportPng,
  exportJpg,
  exportSvg,
  exportPdf,
  copyCanvasImageToClipboard,
  copyTextToClipboard,
  shareQr,
} from '../utils/qrExport';

interface QRPreviewPanelProps {
  payload: string;
  options: QRDesignOptions;
  categoryName: string;
  hasValidationError: boolean;
  onAddToBatch?: () => void;
  batchCount?: number;
  onOpenBatch?: () => void;
}

export const QRPreviewPanel: React.FC<QRPreviewPanelProps> = ({
  payload,
  options,
  categoryName,
  hasValidationError,
  onAddToBatch,
  batchCount = 0,
  onOpenBatch,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [verification, setVerification] = useState<VerificationResult>({
    tested: false,
    success: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPayloadDetails, setShowPayloadDetails] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Re-render QR code whenever payload or options change
  useEffect(() => {
    let isCancelled = false;

    const render = async () => {
      if (!canvasRef.current || !payload || hasValidationError) {
        setVerification({ tested: false, success: false });
        return;
      }

      try {
        await renderQRToCanvas(canvasRef.current, payload, options, 640);
        if (!isCancelled) {
          // Perform real optical scanner verification using jsQR
          const res = verifyQrCanvas(canvasRef.current, payload);
          setVerification(res);
        }
      } catch (err) {
        console.error('Render error:', err);
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [payload, options, hasValidationError]);

  const handleDownloadPng = async () => {
    if (!payload || hasValidationError) return;
    setIsExporting(true);
    // Render at full requested resolution on an offscreen canvas
    const offscreen = document.createElement('canvas');
    await renderQRToCanvas(offscreen, payload, options, options.resolution);
    const fname = `quickqr-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    const ok = await exportPng(offscreen, fname);
    setIsExporting(false);
    if (ok) showToast('PNG downloaded successfully!');
  };

  const handleDownloadJpg = async () => {
    if (!payload || hasValidationError) return;
    setIsExporting(true);
    const offscreen = document.createElement('canvas');
    await renderQRToCanvas(offscreen, payload, options, options.resolution);
    const fname = `quickqr-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
    const ok = await exportJpg(offscreen, fname, options.bgColor || '#ffffff');
    setIsExporting(false);
    if (ok) showToast('JPG downloaded successfully!');
  };

  const handleDownloadSvg = () => {
    if (!payload || hasValidationError) return;
    const svgStr = generateSvgString(payload, options);
    const fname = `quickqr-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.svg`;
    const ok = exportSvg(svgStr, fname);
    if (ok) showToast('Vector SVG downloaded successfully!');
  };

  const handleDownloadPdf = async () => {
    if (!payload || hasValidationError) return;
    setIsExporting(true);
    const offscreen = document.createElement('canvas');
    await renderQRToCanvas(offscreen, payload, options, 2048);
    const fname = `quickqr-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    const ok = exportPdf(offscreen, fname, {
      title: 'QuickQR Document',
      typeLabel: categoryName,
      summary: payload.length > 280 ? payload.substring(0, 277) + '...' : payload,
    });
    setIsExporting(false);
    if (ok) showToast('Print-Ready PDF downloaded!');
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current || !payload || hasValidationError) return;
    const res = await copyCanvasImageToClipboard(canvasRef.current);
    showToast(res.message);
  };

  const handleCopyText = async () => {
    if (!payload || hasValidationError) return;
    const res = await copyTextToClipboard(payload);
    showToast(res.message);
  };

  const handleShare = async () => {
    if (!canvasRef.current || !payload || hasValidationError) return;
    const res = await shareQr(canvasRef.current, 'QuickQR Code', payload);
    showToast(res.message);
  };

  const contrast = getContrastRatio(options.fgColor, options.bgColor);
  const isContrastLow = contrast < 3.8;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">QR Code Preview</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {options.resolution} × {options.resolution}px target render
          </p>
        </div>

        {/* Verification Status Pill */}
        {payload && !hasValidationError && verification.tested && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
              verification.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {verification.success ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Scannable</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Check Contrast</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Canvas Viewport Container */}
      <div className="relative aspect-square max-w-[340px] mx-auto bg-neutral-50/80 border border-neutral-200/80 rounded-xl p-4 flex flex-col items-center justify-center overflow-hidden">
        {/* Background checkerboard for transparency */}
        {options.transparentBg && (
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />
        )}

        {payload && !hasValidationError ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain drop-shadow-xs transition-transform duration-200"
          />
        ) : (
          <div className="text-center p-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <div className="text-xs font-semibold text-neutral-700">Awaiting Valid Input</div>
            <p className="text-[11px] text-neutral-500 max-w-[200px]">
              Fill in the required fields on the left to generate and test your code.
            </p>
          </div>
        )}
      </div>

      {/* Optical Contrast Warning */}
      {isContrastLow && payload && (
        <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Contrast Alert ({contrast.toFixed(1)}:1):</strong> Low color contrast may cause some phone cameras to fail scanning. We recommend a darker foreground or lighter background.
          </div>
        </div>
      )}

      {/* Primary Download Buttons */}
      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={!payload || hasValidationError || isExporting}
          className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Generating Image...' : 'Download High-Res PNG'}</span>
        </button>

        {/* Secondary Export Formats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={handleDownloadJpg}
            disabled={!payload || hasValidationError || isExporting}
            className="py-2 px-2.5 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileImage className="w-3.5 h-3.5 text-neutral-600" />
            <span>JPG</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSvg}
            disabled={!payload || hasValidationError || isExporting}
            className="py-2 px-2.5 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileCode className="w-3.5 h-3.5 text-neutral-600" />
            <span>Vector SVG</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={!payload || hasValidationError || isExporting}
            className="py-2 px-2.5 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-600" />
            <span>Print PDF</span>
          </button>
        </div>

        {/* Batch ZIP Export Collection Actions */}
        <div className="pt-2 flex items-center gap-2">
          {onAddToBatch && (
            <button
              type="button"
              onClick={() => {
                onAddToBatch();
                showToast('Added to Batch Collection!');
              }}
              disabled={!payload || hasValidationError}
              className="flex-1 py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-700" />
              <span>Add to Batch (ZIP)</span>
            </button>
          )}

          {onOpenBatch && (
            <button
              type="button"
              onClick={onOpenBatch}
              className="py-2 px-3 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <Archive className="w-3.5 h-3.5 text-neutral-700" />
              <span>Batch ({batchCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Copy & Share Actions */}
      <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
        <button
          type="button"
          onClick={handleCopyImage}
          disabled={!payload || hasValidationError}
          className="hover:text-neutral-900 inline-flex items-center gap-1.5 px-2 py-1 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Image</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          disabled={!payload || hasValidationError}
          className="hover:text-neutral-900 inline-flex items-center gap-1.5 px-2 py-1 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Copy Content</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          disabled={!payload || hasValidationError}
          className="hover:text-neutral-900 inline-flex items-center gap-1.5 px-2 py-1 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Encoded payload inspector toggle */}
      {payload && !hasValidationError && (
        <div className="mt-3 pt-2">
          <button
            type="button"
            onClick={() => setShowPayloadDetails(!showPayloadDetails)}
            className="text-[11px] text-neutral-500 hover:text-neutral-800 underline underline-offset-2 flex items-center gap-1"
          >
            <span>{showPayloadDetails ? 'Hide Encoded Raw Data' : 'Inspect Raw QR Payload'}</span>
          </button>

          {showPayloadDetails && (
            <div className="mt-2 p-2.5 bg-neutral-900 text-neutral-100 rounded-lg text-[11px] font-mono break-all max-h-36 overflow-y-auto leading-relaxed select-all">
              {payload}
            </div>
          )}
        </div>
      )}

      {/* Action Toast Feedback */}
      {toastMessage && (
        <div 
          role="status"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
