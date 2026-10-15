import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';

const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

async function inlineElementImages(root: HTMLElement): Promise<() => void> {
  const images = Array.from(root.querySelectorAll('img'));
  const originalSources = new Map<HTMLImageElement, string>();

  await Promise.all(
    images.map(async (img) => {
      const src = img.currentSrc || img.src || img.getAttribute('src');
      if (!src || src.startsWith('data:')) return;

      originalSources.set(img, src);

      try {
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(src)}`;
        const res = await fetch(proxyUrl);
        if (res.ok) {
          const blob = await res.blob();
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          img.src = base64;
        } else {
          img.src = TRANSPARENT_PIXEL;
        }
      } catch (err) {
        console.warn('Failed to inline image via proxy, using fallback', err);
        img.src = TRANSPARENT_PIXEL;
      }
    })
  );

  return () => {
    originalSources.forEach((originalSrc, img) => {
      img.src = originalSrc;
    });
  };
}

function findCleanRow(
  ctx: CanvasRenderingContext2D,
  width: number,
  targetY: number,
  minY: number
): number {
  const checkWidth = Math.floor(width * 0.8);
  const startX = Math.floor(width * 0.1);

  for (let y = Math.floor(targetY); y >= Math.floor(minY); y -= 2) {
    const imgData = ctx.getImageData(startX, y, checkWidth, 1).data;
    let isRowClean = true;
    for (let x = 0; x < imgData.length; x += 16) {
      const r = imgData[x];
      const g = imgData[x + 1];
      const b = imgData[x + 2];
      // Light background or whitespace check
      if (r < 240 || g < 240 || b < 240) {
        isRowClean = false;
        break;
      }
    }
    if (isRowClean) {
      return y;
    }
  }
  return Math.floor(targetY);
}

function drawFooter(
  pdf: jsPDF,
  footerTexts: { left: string; center: string; right: string },
  pdfWidth: number,
  pdfHeight: number,
  pageNumber: number,
  totalPages: number
) {
  const footerY = pdfHeight - 12;
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, footerY, pdfWidth, 12, 'F');
  pdf.setDrawColor(203, 213, 225); // #cbd5e1
  pdf.setLineWidth(0.2);
  pdf.line(10, footerY, pdfWidth - 10, footerY);

  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139); // #64748b
  if (footerTexts.left) pdf.text(footerTexts.left, 10, pdfHeight - 5);
  if (footerTexts.center) pdf.text(footerTexts.center, pdfWidth / 2, pdfHeight - 5, { align: 'center' });
  
  // Clean page numbering: Page X / Y
  const pageStr = `Page ${pageNumber} / ${totalPages}`;
  pdf.text(pageStr, pdfWidth - 10, pdfHeight - 5, { align: 'right' });
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  onProgress?: (status: string) => void
): Promise<void> {
  onProgress?.('Preparing high-resolution A4 document...');

  // Reset any CSS zoom or transform on preview container so coordinate space is 1:1
  const originalTransform = element.style.transform;
  element.style.transform = 'none';

  let restoreImages: (() => void) | null = null;
  let restoreExcludes: (() => void) | null = null;

  try {
    // Extract footer metadata before hiding preview-only elements
    const footerEl = element.querySelector('.print-fixed-footer');
    const footerTexts = {
      left: footerEl?.querySelector('div:first-child')?.textContent?.replace(/\s+/g, ' ').trim() || '',
      center: footerEl?.querySelector('.font-mono')?.textContent?.replace(/\s+/g, ' ').trim() || '',
      right: footerEl?.querySelector('div:last-child')?.textContent?.replace(/\s+/g, ' ').trim() || 'Custom Tailored Travel Proposal',
    };

    // Temporarily hide inner preview footers and print-fixed-footer during screenshot capture
    // so they are NEVER captured into the document image slices
    const excludedNodes = Array.from(
      element.querySelectorAll<HTMLElement>('.print\\:hidden, .print-fixed-footer, .proposal-inner-footer')
    );
    const originalDisplays = excludedNodes.map(node => node.style.display);
    excludedNodes.forEach(node => {
      node.style.display = 'none';
    });
    restoreExcludes = () => {
      excludedNodes.forEach((node, idx) => {
        node.style.display = originalDisplays[idx];
      });
    };

    onProgress?.('Inlining document assets...');
    // Pre-convert all images to base64 data URIs so foreignObject never makes cross-origin requests
    restoreImages = await inlineElementImages(element);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Query distinct document sections (.proposal-section, .pdf-page, .daily-schedule-page)
    let sectionNodes = Array.from(element.querySelectorAll<HTMLElement>('.proposal-section, .pdf-page'));
    if (sectionNodes.length === 0) {
      sectionNodes = [element];
    }

    let totalPagesAdded = 0;

    for (let sIdx = 0; sIdx < sectionNodes.length; sIdx++) {
      const sectionEl = sectionNodes[sIdx];
      onProgress?.(`Rendering section ${sIdx + 1} of ${sectionNodes.length}...`);

      let imgData: string;
      try {
        imgData = await toJpeg(sectionEl, {
          quality: 0.95,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
          skipFonts: true,
          cacheBust: false,
        });
      } catch (renderErr) {
        console.warn(`Primary 2x render warning, attempting 1.5x fallback on section ${sIdx + 1}:`, renderErr);
        imgData = await toJpeg(sectionEl, {
          quality: 0.85,
          backgroundColor: '#ffffff',
          pixelRatio: 1.5,
          skipFonts: true,
          cacheBust: false,
        });
      }

      const img = new Image();
      img.src = imgData;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = (e) => reject(e);
      });

      const canvasWidth = img.naturalWidth || img.width || 800;
      const canvasHeight = img.naturalHeight || img.height || 1123;
      const pageHeightPx = Math.round((pdfHeight / pdfWidth) * canvasWidth);
      const topMarginMm = 14;
      const topMarginPx = Math.round((topMarginMm / pdfWidth) * canvasWidth);
      const footerHeightMm = 14;
      const footerHeightPx = Math.round((footerHeightMm / pdfWidth) * canvasWidth);
      const usablePageHeightPx = pageHeightPx - topMarginPx - footerHeightPx;

      // Section fits on a single A4 page
      if (canvasHeight <= pageHeightPx + 20) {
        if (totalPagesAdded > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        totalPagesAdded++;
      } else {
        // Multi-page continuous flow: slice across pages at clean whitespace boundaries
        const sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = canvasWidth;
        sourceCanvas.height = canvasHeight;
        const sCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
        if (!sCtx) throw new Error('Could not get 2D context for canvas');
        sCtx.drawImage(img, 0, 0);

        let currentY = 0;
        while (currentY < canvasHeight) {
          const isFirstSlice = currentY === 0;
          // Top margin / padding: first slice uses the section's DOM padding; subsequent continuation slices start at topMarginPx
          const destY = isFirstSlice ? 0 : topMarginPx;
          const maxAllowedSliceHeight = isFirstSlice
            ? (pageHeightPx - footerHeightPx)
            : usablePageHeightPx;

          const remaining = canvasHeight - currentY;
          let sliceHeight = Math.min(maxAllowedSliceHeight, remaining);

          if (currentY + sliceHeight < canvasHeight) {
            const minY = currentY + Math.floor(sliceHeight * 0.72);
            const cleanY = findCleanRow(sCtx, canvasWidth, currentY + sliceHeight, minY);
            if (cleanY > minY) {
              sliceHeight = cleanY - currentY;
            }
          }

          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvasWidth;
          pageCanvas.height = pageHeightPx;
          const pCtx = pageCanvas.getContext('2d');
          if (pCtx) {
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(0, 0, canvasWidth, pageHeightPx);
            pCtx.drawImage(sourceCanvas, 0, currentY, canvasWidth, sliceHeight, 0, destY, canvasWidth, sliceHeight);
          }

          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          pageCanvas.width = 0;
          pageCanvas.height = 0;

          if (totalPagesAdded > 0) {
            pdf.addPage();
          }
          pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
          totalPagesAdded++;

          currentY += sliceHeight;
        }

        sourceCanvas.width = 0;
        sourceCanvas.height = 0;
      }
    }

    // Single fixed footer pass across all pages: rendered strictly once per page at the absolute bottom
    const totalPages = pdf.getNumberOfPages();
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      pdf.setPage(pageNum);
      drawFooter(pdf, footerTexts, pdfWidth, pdfHeight, pageNum, totalPages);
    }

    onProgress?.('Saving PDF file...');
    pdf.save(filename);
  } catch (error) {
    console.error('Direct PDF export encountered an issue, launching browser print fallback:', error);
    window.print();
  } finally {
    if (restoreExcludes) {
      restoreExcludes();
    }
    if (restoreImages) {
      restoreImages();
    }
    element.style.transform = originalTransform;
  }
}
