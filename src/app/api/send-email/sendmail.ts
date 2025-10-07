import nodemailer from 'nodemailer';

/**
 * Format selections for key features summary
 */
function formatSelections(selections: any): string {
  if (!selections) return '[List 2–3 main elements they chose]';
  
  const categories = Object.keys(selections);
  const totalSelections = categories.reduce((total, category) => total + selections[category].length, 0);
  
  if (totalSelections <= 3) {
    return categories.slice(0, 2).join(', ') + ' modules';
  } else {
    return `${totalSelections} selected components across ${categories.length} categories`;
  }
}

/**
 * Format detailed selections for display in email
 */
function formatDetailedSelections(selections: any): string {
  if (!selections) return '<p>No selections available.</p>';
  
  let html = '<div style="margin-left: 20px;">';
  
  Object.keys(selections).forEach(category => {
    if (selections[category] && selections[category].length > 0) {
      html += `<p><strong>${category}:</strong></p>`;
      html += '<ul style="margin-left: 20px;">';
      selections[category].forEach((item: string) => {
        html += `<li>${item}</li>`;
      });
      html += '</ul>';
    }
  });
  
  html += '</div>';
  return html;
}

/**
 * Send an email using SMTP
 * @param params Object containing email, companyname, pngData, pdfData, name, selections, message
 */
export async function sendEmail({ email, companyname, pngData, pdfData, pdfFilename, name, selections, message }: {
  email: string;
  companyname?: string;
  pngData?: string;
  pdfData?: string;
  pdfFilename?: string;
  name: string;
  selections: any;
  message?: string;
}) {
  try {  
    console.log('selections', JSON.stringify(selections));
    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'email-smtp.us-east-1.amazonaws.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'AKIA3RMNUKG7ENRKY77Z',
        pass: 'BHK3Mx7+vsUPTMeklZBfMbyWZ1NylrRQeAaUQdszFhe7',
      },
    });

    // Construct the HTML string directly
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Veefin Architecture Submission</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style type="text/css">
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
            h2 { color: #27A689; }
            p { margin-bottom: 10px; }
            strong { color: #555; }
            .pdf-link { margin-top: 20px; display: block; }
          </style>
        </head>
        <body style="margin: 0; padding: 0;">
          <div class="container">
          <h2>Hi ${name}</h2>
            <p>It was great having you join us today at our pavilion! As part of your visit, you customized your own architecture design, and we wanted to send you a copy for your reference and next steps.</p>
            
            <p><strong>Your Customization Highlights:</strong></p>
            <ul>
              <li>AI Infused modules</li>
              <li>Key Features: ${formatDetailedSelections(selections)}</li>
              <li>Next Steps: You can continue refining your design with our team or explore options for a more detailed blueprint.</li>
            </ul>
            
            <p>We've attached your personalized architecture outline to this email. If you'd like to book a follow-up session with one of our architects to expand on your vision, simply write to us at sales@veefin.com.</p>
            
            <p>Thank you again for stopping by! We're excited to see how your custom architecture design grows into reality.</p>
          </div>
        </body>
      </html>
    `;

    // Prepare attachments
    const attachments = [];
    
    // Add PDF attachment if available
    if (pdfData) {
      attachments.push({
        filename: pdfFilename || 'veefin-architecture.pdf',
        content: Buffer.from(pdfData, 'base64'),
        contentType: 'application/pdf',
      });
    }
    
    // Optionally add PNG as backup
    if (pngData && !pdfData) {
      // Convert base64 data URL to buffer
      const base64Data = pngData.split(',')[1];
      attachments.push({
        filename: 'financial-architecture.png',
        content: Buffer.from(base64Data, 'base64'),
        contentType: 'image/png',
      });
    }

    // Send email
    const info = await transporter.sendMail({
      from: 'noreply@veefin.in',
      to: email || 'developers506@gmail.com',
      subject: `Your Veefin 4.0 Customized Architecture Design from GFF 2025`,
      html: emailHtml,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${companyname || ''}\nMessage: ${message || ''}\nPDF: ${pdfData ? 'Attached' : 'Not available'}`,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log('Email sent successfully:', info.messageId);

    return {
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("SMTP error:", error);
    return {
      success: false, 
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
