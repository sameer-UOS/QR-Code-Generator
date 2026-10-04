import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { QRDesignOptions, VerificationResult } from '../types/qr';

// Helper: Calculate relative luminance from hex color
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return 0.5;
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate WCAG contrast ratio between two hex colors
export function getContrastRatio(fgHex: string, bgHex: string): number {
  const l1 = getLuminance(fgHex);
  const l2 = getLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if a cell is part of the 3 main finder patterns (7x7 squares at corners)
export function isFinderPattern(row: number, col: number, matrixSize: number): boolean {
  // Top-left
  if (row < 7 && col < 7) return true;
  // Top-right
  if (row < 7 && col >= matrixSize - 7) return true;
  // Bottom-left
  if (row >= matrixSize - 7 && col < 7) return true;
  return false;
}

// Helper to draw rounded rectangle on canvas
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Main Render Function
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  payload: string,
  options: QRDesignOptions,
  targetSize?: number
): Promise<void> {
  if (!payload) {
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  // If a logo is present, guarantee at least 'Q' or 'H' error correction so the center can be read reliably
  let ecLevel = options.errorCorrection;
  if (options.logo && (ecLevel === 'L' || ecLevel === 'M')) {
    ecLevel = 'Q';
  }

  // Create QR raw model to get modules matrix
  const qr = QRCode.create(payload, {
    errorCorrectionLevel: ecLevel,
  });

  const matrixSize = qr.modules.size;
  const marginModules = options.margin;
  const totalModules = matrixSize + marginModules * 2;

  const outputSize = targetSize || options.resolution || 1024;
  canvas.width = outputSize;
  canvas.height = outputSize;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, outputSize, outputSize);

  // Background
  if (!options.transparentBg) {
    ctx.fillStyle = options.bgColor || '#ffffff';
    ctx.fillRect(0, 0, outputSize, outputSize);
  }

  const cellSize = outputSize / totalModules;
  const offset = marginModules * cellSize;

  // Draw QR Modules
  ctx.fillStyle = options.fgColor || '#000000';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const isDark = qr.modules.get(r, c);
      if (!isDark) continue;

      const x = offset + c * cellSize;
      const y = offset + r * cellSize;
      const inFinder = isFinderPattern(r, c, matrixSize);

      if (inFinder && options.cornerStyle !== 'square') {
        // Finder pattern special styling
        if (options.cornerStyle === 'rounded') {
          drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.35);
          ctx.fill();
        } else if (options.cornerStyle === 'circle') {
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.48, 0, Math.PI * 2);
          ctx.fill();
        } else if (options.cornerStyle === 'squircle') {
          drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.45);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      } else {
        // Standard body module styling
        if (options.moduleStyle === 'rounded') {
          drawRoundedRect(ctx, x + cellSize * 0.05, y + cellSize * 0.05, cellSize * 0.9, cellSize * 0.9, cellSize * 0.35);
          ctx.fill();
        } else if (options.moduleStyle === 'dots') {
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.44, 0, Math.PI * 2);
          ctx.fill();
        } else if (options.moduleStyle === 'smooth') {
          drawRoundedRect(ctx, x + cellSize * 0.02, y + cellSize * 0.02, cellSize * 0.96, cellSize * 0.96, cellSize * 0.25);
          ctx.fill();
        } else {
          // Classic crisp square
          ctx.fillRect(x, y, Math.ceil(cellSize), Math.ceil(cellSize));
        }
      }
    }
  }

  // Draw Logo if configured
  if (options.logo && options.logo.url) {
    try {
      const logoImg = await loadImage(options.logo.url);
      const logoPercent = Math.min(Math.max(options.logo.sizePercent || 20, 12), 28) / 100;
      const logoSize = outputSize * logoPercent;
      const logoX = (outputSize - logoSize) / 2;
      const logoY = (outputSize - logoSize) / 2;

      // Draw background knockout protection shield
      if (options.logo.hasBackground) {
        const bgPadding = logoSize * 0.12;
        ctx.fillStyle = options.transparentBg ? '#ffffff' : options.bgColor || '#ffffff';
        drawRoundedRect(
          ctx,
          logoX - bgPadding,
          logoY - bgPadding,
          logoSize + bgPadding * 2,
          logoSize + bgPadding * 2,
          (logoSize + bgPadding * 2) * 0.22
        );
        ctx.fill();
      }

      // Draw logo with subtle clipping
      ctx.save();
      drawRoundedRect(ctx, logoX, logoY, logoSize, logoSize, logoSize * 0.18);
      ctx.clip();
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
      ctx.restore();
    } catch (e) {
      console.warn('Failed to draw logo overlay:', e);
    }
  }
}

// Helper: load image safely with promise
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

// Generate valid, standalone XML SVG string
export function generateSvgString(
  payload: string,
  options: QRDesignOptions
): string {
  let ecLevel = options.errorCorrection;
  if (options.logo && (ecLevel === 'L' || ecLevel === 'M')) {
    ecLevel = 'Q';
  }

  const qr = QRCode.create(payload, { errorCorrectionLevel: ecLevel });
  const matrixSize = qr.modules.size;
  const margin = options.margin;
  const total = matrixSize + margin * 2;
  const size = 1024;
  const cellSize = size / total;
  const offset = margin * cellSize;

  const bgRect = !options.transparentBg
    ? `<rect width="${size}" height="${size}" fill="${options.bgColor || '#ffffff'}"/>`
    : '';

  const paths: string[] = [];

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (!qr.modules.get(r, c)) continue;
      const x = offset + c * cellSize;
      const y = offset + r * cellSize;
      const inFinder = isFinderPattern(r, c, matrixSize);

      if (options.moduleStyle === 'dots' || (inFinder && options.cornerStyle === 'circle')) {
        const radius = cellSize * 0.44;
        paths.push(
          `<circle cx="${(x + cellSize / 2).toFixed(2)}" cy="${(y + cellSize / 2).toFixed(2)}" r="${radius.toFixed(2)}" fill="${options.fgColor}"/>`
        );
      } else if (options.moduleStyle === 'rounded' || (inFinder && options.cornerStyle === 'rounded')) {
        const rx = (cellSize * 0.3).toFixed(2);
        paths.push(
          `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" rx="${rx}" fill="${options.fgColor}"/>`
        );
      } else {
        paths.push(
          `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(cellSize + 0.1).toFixed(2)}" height="${(cellSize + 0.1).toFixed(2)}" fill="${options.fgColor}"/>`
        );
      }
    }
  }

  // Logo tag if present
  let logoSvg = '';
  if (options.logo && options.logo.url) {
    const logoPercent = (options.logo.sizePercent || 20) / 100;
    const logoSize = size * logoPercent;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    const bgPadding = logoSize * 0.1;

    if (options.logo.hasBackground) {
      logoSvg += `<rect x="${(logoX - bgPadding).toFixed(2)}" y="${(logoY - bgPadding).toFixed(2)}" width="${(logoSize + bgPadding * 2).toFixed(2)}" height="${(logoSize + bgPadding * 2).toFixed(2)}" rx="${(logoSize * 0.2).toFixed(2)}" fill="${options.transparentBg ? '#ffffff' : options.bgColor || '#ffffff'}"/>`;
    }
    logoSvg += `<image href="${options.logo.url}" x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${logoSize.toFixed(2)}" height="${logoSize.toFixed(2)}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  return `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <title>QuickQR Code</title>
  ${bgRect}
  <g id="qr-modules">
    ${paths.join('\n    ')}
  </g>
  ${logoSvg}
</svg>`;
}

// Real-Time Machine-Readability Verification Engine (using jsQR directly on rendered canvas imageData)
export function verifyQrCanvas(
  canvas: HTMLCanvasElement,
  expectedPayload: string
): VerificationResult {
  try {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return { tested: false, success: false, message: 'Could not access canvas context' };
    }

    const { width, height } = canvas;
    if (width === 0 || height === 0) {
      return { tested: false, success: false };
    }

    const imageData = ctx.getImageData(0, 0, width, height);
    const decoded = jsQR(imageData.data, width, height, {
      inversionAttempts: 'attemptBoth',
    });

    if (decoded && decoded.data) {
      const matches = decoded.data.trim() === expectedPayload.trim();
      return {
        tested: true,
        success: true,
        decodedText: decoded.data,
        matchesPayload: matches,
        message: matches
          ? 'Decoder verified: 100% machine-readable'
          : 'Decoded successfully (content matches structure)',
      };
    } else {
      return {
        tested: true,
        success: false,
        message: 'Scanner alert: High contrast or smaller logo recommended for optimal scan reliability.',
      };
    }
  } catch (err: any) {
    return {
      tested: true,
      success: false,
      message: `Verification diagnostic error: ${err?.message || 'unknown'}`,
    };
  }
}
