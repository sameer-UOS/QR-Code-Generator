import JSZip from 'jszip';
import { BatchQRItem } from '../types/qr';
import { renderQRToCanvas, generateSvgString } from './qrRenderer';
import { triggerFileDownload } from './qrExport';

export interface ZipExportOptions {
  format: 'png' | 'jpg' | 'svg';
  resolution: number;
  zipFilename?: string;
  onProgress?: (current: number, total: number, currentItemName: string) => void;
}

// Helper to convert Canvas to Blob promise
function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

// Clean filename string
function sanitizeFilename(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'qr-code';
}

export async function exportBatchAsZip(
  items: BatchQRItem[],
  options: ZipExportOptions
): Promise<{ success: boolean; message: string }> {
  const selectedItems = items.filter((item) => item.selected);
  if (selectedItems.length === 0) {
    return { success: false, message: 'No QR codes selected for download.' };
  }

  const zip = new JSZip();
  const total = selectedItems.length;

  try {
    for (let i = 0; i < total; i++) {
      const item = selectedItems[i];
      const indexPrefix = String(i + 1).padStart(2, '0');
      const baseName = `${indexPrefix}-${sanitizeFilename(item.name || item.categoryLabel)}`;

      if (options.onProgress) {
        options.onProgress(i + 1, total, item.name || item.categoryLabel);
      }

      if (options.format === 'svg') {
        const svgString = generateSvgString(item.payload, item.options);
        zip.file(`${baseName}.svg`, svgString);
      } else if (options.format === 'jpg') {
        const canvas = document.createElement('canvas');
        await renderQRToCanvas(canvas, item.payload, item.options, options.resolution);

        // Convert to solid background for JPG
        const solidCanvas = document.createElement('canvas');
        solidCanvas.width = canvas.width;
        solidCanvas.height = canvas.height;
        const ctx = solidCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = item.options.bgColor || '#ffffff';
          ctx.fillRect(0, 0, solidCanvas.width, solidCanvas.height);
          ctx.drawImage(canvas, 0, 0);
          const blob = await canvasToBlob(solidCanvas, 'image/jpeg', 0.95);
          if (blob) {
            zip.file(`${baseName}.jpg`, blob);
          }
        }
      } else {
        // PNG default
        const canvas = document.createElement('canvas');
        await renderQRToCanvas(canvas, item.payload, item.options, options.resolution);
        const blob = await canvasToBlob(canvas, 'image/png');
        if (blob) {
          zip.file(`${baseName}.png`, blob);
        }
      }
    }

    // Add a helpful README.txt inside the archive describing the generated QR codes
    const manifestLines = [
      'QuickQR Code Batch Archive',
      '==========================',
      `Exported: ${new Date().toISOString()}`,
      `Total Codes: ${total}`,
      `Format: ${options.format.toUpperCase()} (${options.resolution}x${options.resolution}px)`,
      '',
      'File Listing:',
      '-------------',
      ...selectedItems.map((item, idx) => {
        const indexPrefix = String(idx + 1).padStart(2, '0');
        const filename = `${indexPrefix}-${sanitizeFilename(item.name || item.categoryLabel)}.${options.format}`;
        return `[${indexPrefix}] ${filename} | Type: ${item.categoryLabel} | Payload: ${item.payload.substring(0, 60)}${item.payload.length > 60 ? '...' : ''}`;
      }),
      '',
      'Generated with QuickQR – 100% Free & Private Client-Side QR Generator.',
    ];
    zip.file('README.txt', manifestLines.join('\n'));

    // Generate zip blob
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    const outputZipName = options.zipFilename || `quickqr-batch-${Date.now()}.zip`;
    const url = URL.createObjectURL(zipBlob);
    triggerFileDownload(url, outputZipName);
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    return {
      success: true,
      message: `Successfully downloaded ZIP archive with ${total} QR code${total > 1 ? 's' : ''}!`,
    };
  } catch (err: any) {
    console.error('Batch ZIP export error:', err);
    return {
      success: false,
      message: `Failed to create ZIP: ${err?.message || 'Unknown error'}`,
    };
  }
}
