import { jsPDF } from 'jspdf';

// Helper to download a Blob or Data URI
export function triggerFileDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Download PNG with genuine canvas output
export function exportPng(canvas: HTMLCanvasElement, filename = 'quickqr-code.png'): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      triggerFileDownload(url, filename);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      resolve(true);
    }, 'image/png');
  });
}

// Download JPG with solid background (no black background bug on transparency)
export function exportJpg(
  canvas: HTMLCanvasElement,
  filename = 'quickqr-code.jpg',
  fallbackBg = '#ffffff'
): Promise<boolean> {
  return new Promise((resolve) => {
    // Create temporary solid-backed canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      resolve(false);
      return;
    }

    // Fill solid background
    tempCtx.fillStyle = fallbackBg || '#ffffff';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    // Draw existing QR code on top
    tempCtx.drawImage(canvas, 0, 0);

    tempCanvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        triggerFileDownload(url, filename);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        resolve(true);
      },
      'image/jpeg',
      0.95
    );
  });
}

// Download valid vector SVG
export function exportSvg(svgString: string, filename = 'quickqr-code.svg'): boolean {
  try {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerFileDownload(url, filename);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  } catch (err) {
    console.error('SVG export failed:', err);
    return false;
  }
}

// Genuine PDF export using jsPDF
export function exportPdf(
  canvas: HTMLCanvasElement,
  filename = 'quickqr-sheet.pdf',
  metadata?: { title?: string; typeLabel?: string; summary?: string }
): boolean {
  try {
    // Create standard A4 portrait document (210 x 297 mm)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Solid clean header banner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(24, 24, 27); // neutral-900
    doc.text('QuickQR Code Sheet', 20, 28);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(113, 113, 122); // neutral-500
    doc.text(`Type: ${metadata?.typeLabel || 'Static QR Code'} · Generated on ${new Date().toLocaleDateString()}`, 20, 36);

    // Divider line
    doc.setDrawColor(228, 228, 231);
    doc.line(20, 42, pageWidth - 20, 42);

    // Place QR code in center of page
    const qrImageSizeMm = 110; // 110mm x 110mm printable area
    const qrX = (pageWidth - qrImageSizeMm) / 2;
    const qrY = 56;

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', qrX, qrY, qrImageSizeMm, qrImageSizeMm);

    // Print border guide around QR for cutting if desired
    doc.setDrawColor(244, 244, 245);
    doc.setLineDashPattern([2, 2], 0);
    doc.rect(qrX - 4, qrY - 4, qrImageSizeMm + 8, qrImageSizeMm + 8);
    doc.setLineDashPattern([], 0); // reset

    // Content summary box below QR
    const summaryY = qrY + qrImageSizeMm + 18;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(39, 39, 42);
    doc.text('Encoded Target / Instructions:', 20, summaryY);

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(82, 82, 91);

    const safeSummary = metadata?.summary || 'Scan with any smartphone camera to open.';
    const splitSummary = doc.splitTextToSize(safeSummary, pageWidth - 40);
    doc.text(splitSummary, 20, summaryY + 7);

    // Best practices footnote
    const footerY = pageHeight - 20;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(161, 161, 170);
    doc.text(
      'Print Best Practice: For posters & tables, maintain at least 300 DPI scale. Never place QR codes directly on high-glare surfaces.',
      20,
      footerY - 6
    );
    doc.text('Created with QuickQR – 100% Free, Private, and Client-Side QR Generation.', 20, footerY);

    // Save PDF
    doc.save(filename);
    return true;
  } catch (err) {
    console.error('PDF export failed:', err);
    return false;
  }
}

// Copy Image to Clipboard
export async function copyCanvasImageToClipboard(canvas: HTMLCanvasElement): Promise<{ success: boolean; message: string }> {
  if (!navigator.clipboard || !window.ClipboardItem) {
    return { success: false, message: 'Clipboard image copying is not supported in this browser.' };
  }

  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve({ success: false, message: 'Could not create image blob.' });
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        resolve({ success: true, message: 'QR image copied to clipboard!' });
      } catch (err: any) {
        console.warn('Clipboard write error:', err);
        resolve({ success: false, message: 'Permission denied or browser error copying image.' });
      }
    }, 'image/png');
  });
}

// Copy Text to Clipboard
export async function copyTextToClipboard(text: string): Promise<{ success: boolean; message: string }> {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message: 'Encoded content copied to clipboard!' };
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(ta);
      return { success: true, message: 'Encoded content copied to clipboard!' };
    } catch {
      document.body.removeChild(ta);
      return { success: false, message: 'Failed to copy text.' };
    }
  }
}

// Web Share API
export async function shareQr(
  canvas: HTMLCanvasElement,
  title: string,
  text: string,
  filename = 'quickqr.png'
): Promise<{ success: boolean; message: string }> {
  if (!navigator.share) {
    return { success: false, message: 'Web Share is not supported on this browser.' };
  }

  try {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], filename, { type: 'image/png' })] })) {
          const file = new File([blob], filename, { type: 'image/png' });
          try {
            await navigator.share({
              title,
              text,
              files: [file],
            });
            resolve({ success: true, message: 'Shared successfully!' });
          } catch (err: any) {
            if (err.name === 'AbortError') {
              resolve({ success: false, message: 'Share dismissed.' });
            } else {
              resolve({ success: false, message: 'Could not share file.' });
            }
          }
        } else {
          // Share text/url only
          try {
            await navigator.share({
              title,
              text,
            });
            resolve({ success: true, message: 'Shared successfully!' });
          } catch {
            resolve({ success: false, message: 'Share canceled or unsupported.' });
          }
        }
      }, 'image/png');
    });
  } catch {
    return { success: false, message: 'Sharing failed.' };
  }
}
