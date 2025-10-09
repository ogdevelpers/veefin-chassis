import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { sidebarContentMapper } from '@/lib/constants';
import { 
  createPDFContent, 
  generateUniquePDFFilename, 
  formatTextForPDF, 
  groupComponentsByCategory 
} from '@/lib/pdf-content';

export interface PDFData {
  imageData: string; // base64 image
  companyName: string;
  userName: string;
  email: string;
  selections: Record<string, string[]>;
  phone?: string;
}

export interface PDFContent {
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    description: string;
  }>;
}

/**
 * Generate optimized PDF with image and text content
 */
export async function generatePDF(data: PDFData): Promise<string> {
  try {
    // Create structured content
    const pdfContent = createPDFContent(
      data.companyName,
      data.userName,
      data.email,
      data.selections,
      sidebarContentMapper
    );
    
    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add metadata
    pdfDoc.setTitle(`Veefin Architecture - ${data.companyName}`);
    pdfDoc.setSubject('Financial Architecture Diagram');
    pdfDoc.setKeywords(['Veefin', 'Architecture', 'Financial']);
    
    // Get fonts
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const headingFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Create first page
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    
    let yPosition = height - 50;
    const margin = 50;
    const contentWidth = width - (margin * 2);
    
    // Title
    page.drawText(pdfContent.title, {
      x: margin,
      y: yPosition,
      size: 24,
      font: titleFont,
      color: rgb(0.15, 0.65, 0.53), // Veefin green
    });
    
    yPosition -= 40;
    
    // Company info
    page.drawText(`Company: ${data.companyName}`, {
      x: margin,
      y: yPosition,
      size: 14,
      font: headingFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    
    yPosition -= 25;
    
    page.drawText(`Generated for: ${data.userName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: bodyFont,
      color: rgb(0.3, 0.3, 0.3),
    });
    
    yPosition -= 20;
    
    page.drawText(`Email: ${data.email}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: bodyFont,
      color: rgb(0.3, 0.3, 0.3),
    });
    
    if (data.phone) {
      yPosition -= 20;
      page.drawText(`Phone: ${data.phone}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: bodyFont,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
    
    yPosition -= 30;
    
    // Add architecture image with optimization
    try {
      const imageBytes = Uint8Array.from(atob(data.imageData.split(',')[1]), c => c.charCodeAt(0));
      const image = await pdfDoc.embedPng(imageBytes);
      
      // Optimize image size for PDF - reduce dimensions for smaller file size
      const maxImageWidth = Math.min(contentWidth, 500); // Smaller max width
      const maxImageHeight = 300; // Smaller max height
      
      let imageWidth = image.width;
      let imageHeight = image.height;
      
      // Scale down if too large
      if (imageWidth > maxImageWidth) {
        const ratio = maxImageWidth / imageWidth;
        imageWidth *= ratio;
        imageHeight *= ratio;
      }
      
      if (imageHeight > maxImageHeight) {
        const ratio = maxImageHeight / imageHeight;
        imageWidth *= ratio;
        imageHeight *= ratio;
      }
      
      // Position image
      const imageY = yPosition - imageHeight - 20;
      
      if (imageY > 100) {
        page.drawImage(image, {
          x: margin,
          y: imageY,
          width: imageWidth,
          height: imageHeight,
        });
        yPosition = imageY - 30;
      } else {
        // Image too large, add to new page
        const newPage = pdfDoc.addPage([595.28, 841.89]);
        newPage.drawImage(image, {
          x: margin,
          y: 841.89 - 50 - imageHeight,
          width: imageWidth,
          height: imageHeight,
        });
        yPosition = 841.89 - 50 - imageHeight - 30;
      }
    } catch (error) {
      console.error('Error embedding image:', error);
      yPosition -= 50; // Skip image space if embedding fails
    }
    
    // Add selected components section first (right after image)
    yPosition -= 20;
    page.drawText('Your Selected Components', {
      x: margin,
      y: yPosition,
      size: 16,
      font: headingFont,
      color: rgb(0.15, 0.65, 0.53),
    });
    
    yPosition -= 25;
    
    // Add selected components
    pdfContent.sections.selectedComponents.items.forEach(({ category, items }) => {
      if (items.length > 0) {
        if (yPosition < 80) {
          const newPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = 841.89 - 50;
        }
        
        // Category heading
        pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(`${category}:`, {
          x: margin,
          y: yPosition,
          size: 12,
          font: headingFont,
          color: rgb(0.3, 0.3, 0.3),
        });
        
        yPosition -= 15;
        
        // Items
        const itemsText = items.join(', ');
        const lines = wrapText(itemsText, bodyFont, 10, contentWidth - 20);
        
        lines.forEach(line => {
          if (yPosition < 80) {
            const newPage = pdfDoc.addPage([595.28, 841.89]);
            yPosition = 841.89 - 50;
          }
          
          pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(line, {
            x: margin + 20,
            y: yPosition,
            size: 10,
            font: bodyFont,
            color: rgb(0.5, 0.5, 0.5),
          });
          
          yPosition -= 12;
        });
        
        yPosition -= 10;
      }
    });
    
    // Add platform overview section
    yPosition -= 20;
    page.drawText('Platform Overview', {
      x: margin,
      y: yPosition,
      size: 16,
      font: headingFont,
      color: rgb(0.15, 0.65, 0.53),
    });
    
    yPosition -= 25;
    
    // Add overview description
    // const overviewLines = wrapText(pdfContent.sections.header.description, bodyFont, 11, contentWidth);
    // overviewLines.forEach(line => {
    //   if (yPosition < 80) {
    //     const newPage = pdfDoc.addPage([595.28, 841.89]);
    //     yPosition = 841.89 - 50;
    //   }
      
    //   page.drawText(line, {
    //     x: margin,
    //     y: yPosition,
    //     size: 11,
    //     font: bodyFont,
    //     color: rgb(0.3, 0.3, 0.3),
    //   });
      
    //   yPosition -= 14;
    // });
    
    // yPosition -= 20;
    
    // Add components by category
    const groupedComponents = groupComponentsByCategory(pdfContent.sections.components);
    
    Object.entries(groupedComponents).forEach(([category, components]) => {
      // Check if we need a new page
      if (yPosition < 150) {
        const newPage = pdfDoc.addPage([595.28, 841.89]);
        yPosition = 841.89 - 50;
      }
      
      // Category heading
      pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(category, {
        x: margin,
        y: yPosition,
        size: 14,
        font: headingFont,
        color: rgb(0.15, 0.65, 0.53),
      });
      
      yPosition -= 25;
      
      // Add components in this category
      components.forEach(component => {
        if (yPosition < 120) {
          const newPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = 841.89 - 50;
        }
        
        // Component title
        pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(component.title, {
          x: margin + 20,
          y: yPosition,
          size: 12,
          font: headingFont,
          color: rgb(0.2, 0.2, 0.2),
        });
        
        yPosition -= 18;
        
        // Component description (full content)
        const description = formatTextForPDF(component.description, 2000);
        const lines = wrapText(description, bodyFont, 10, contentWidth - 40);
        
        lines.forEach(line => {
          if (yPosition < 80) {
            const newPage = pdfDoc.addPage([595.28, 841.89]);
            yPosition = 841.89 - 50;
          }
          
          pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(line, {
            x: margin + 40,
            y: yPosition,
            size: 10,
            font: bodyFont,
            color: rgb(0.4, 0.4, 0.4),
          });
          
          yPosition -= 12;
        });
        
        yPosition -= 10;
        
        // Add features if available
        if (component.features && component.features.length > 0) {
          if (yPosition < 100) {
            const newPage = pdfDoc.addPage([595.28, 841.89]);
            yPosition = 841.89 - 50;
          }
          
          pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText('Key Features:', {
            x: margin + 40,
            y: yPosition,
            size: 10,
            font: headingFont,
            color: rgb(0.2, 0.2, 0.2),
          });
          
          yPosition -= 15;
          
          component.features.forEach(feature => {
            if (yPosition < 80) {
              const newPage = pdfDoc.addPage([595.28, 841.89]);
              yPosition = 841.89 - 50;
            }
            
            const featureText = formatTextForPDF(feature, 1000);
            const featureLines = wrapText(featureText, bodyFont, 9, contentWidth - 60);
            
            featureLines.forEach(line => {
              if (yPosition < 80) {
                const newPage = pdfDoc.addPage([595.28, 841.89]);
                yPosition = 841.89 - 50;
              }
              
              pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(`• ${line}`, {
                x: margin + 60,
                y: yPosition,
                size: 9,
                font: bodyFont,
                color: rgb(0.5, 0.5, 0.5),
              });
              
              yPosition -= 11;
            });
          });
          
          yPosition -= 8;
        }
        
        // Add benefits if available
        if (component.benefits && component.benefits.length > 0) {
          if (yPosition < 100) {
            const newPage = pdfDoc.addPage([595.28, 841.89]);
            yPosition = 841.89 - 50;
          }
          
          pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText('Business Benefits:', {
            x: margin + 40,
            y: yPosition,
            size: 10,
            font: headingFont,
            color: rgb(0.2, 0.2, 0.2),
          });
          
          yPosition -= 15;
          
          component.benefits.forEach(benefit => {
            if (yPosition < 80) {
              const newPage = pdfDoc.addPage([595.28, 841.89]);
              yPosition = 841.89 - 50;
            }
            
            const benefitText = formatTextForPDF(benefit, 1000);
            const benefitLines = wrapText(benefitText, bodyFont, 9, contentWidth - 60);
            
            benefitLines.forEach(line => {
              if (yPosition < 80) {
                const newPage = pdfDoc.addPage([595.28, 841.89]);
                yPosition = 841.89 - 50;
              }
              
              pdfDoc.getPages()[pdfDoc.getPageCount() - 1].drawText(`• ${line}`, {
                x: margin + 60,
                y: yPosition,
                size: 9,
                font: bodyFont,
                color: rgb(0.5, 0.5, 0.5),
              });
              
              yPosition -= 11;
            });
          });
          
          yPosition -= 8;
        }
        
        yPosition -= 15;
      });
      
      yPosition -= 15;
    });
    
    // Add footer
    const footerPage = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
    footerPage.drawText(`${pdfContent.sections.footer.text} - Generated on ${pdfContent.sections.footer.timestamp}`, {
      x: margin,
      y: 30,
      size: 10,
      font: bodyFont,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    // Save PDF with maximum compression
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
    
    // Apply additional compression
    const compressedPdf = await compressPDF(Buffer.from(pdfBytes).toString('base64'));
    
    return compressedPdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

/**
 * Wrap text to fit within specified width
 */
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  // Clean the text first
  const cleanText = text
    .replace(/[\r\n]+/g, ' ') // Replace newlines with spaces
    .replace(/[^\x20-\x7E]/g, ' ') // Remove non-printable characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  const words = cleanText.split(' ').filter(word => word.length > 0);
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    
    try {
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      
      if (textWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word);
        }
      }
    } catch (error) {
      console.warn('Error measuring text width for:', testLine, error);
      // Fallback: just add the word
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        lines.push(word);
      }
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

/**
 * Compress PDF by reducing image quality
 */
export async function compressPDF(pdfBase64: string): Promise<string> {
  try {
    const pdfBytes = Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0));
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Recreate with compression
    const compressedPdf = await PDFDocument.create();
    
    // Copy pages
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
      const [copiedPage] = await compressedPdf.copyPages(pdfDoc, [i]);
      compressedPdf.addPage(copiedPage);
    }
    
    const compressedBytes = await compressedPdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
    
    return Buffer.from(compressedBytes).toString('base64');
  } catch (error) {
    console.error('Error compressing PDF:', error);
    return pdfBase64;
  }
}

/**
 * Generate filename for PDF - using unique filename generator
 */
export function generatePDFFilename(companyName: string, name?: string): string {
  return generateUniquePDFFilename(companyName, name);
}
