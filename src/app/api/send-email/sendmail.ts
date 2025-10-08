import nodemailer from 'nodemailer';
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

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
export async function sendEmail({
  email,
  companyname,
  pngData,
  pdfData,
  pdfFilename,
  name,
  selections,
  message,
}: {
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
    console.log("selections", JSON.stringify(selections));

    // Validate environment variables
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error(
        "AWS credentials not configured. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY."
      );
    }

    // Create SES client
    const ses = new SESv2Client({
      region: process.env.AWS_REGION?.trim() || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!.trim(),
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!.trim(),
      },
    });

    // Construct HTML email
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
          </style>
        </head>
        <body>
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
    const attachments: any[] = [];

    if (pdfData) {
      attachments.push({
        filename: pdfFilename || "veefin-architecture.pdf",
        content: Buffer.from(pdfData, 'base64'),
        contentType: "application/pdf",
      });
    } else if (pngData) {
      attachments.push({
        filename: "financial-architecture.png",
        content: Buffer.from(pngData.split(",")[1], 'base64'),
        contentType: "image/png",
      });
    }

    // Construct MIME message
    const boundary = "----=_Part_" + Date.now();
    const lines = [
      `From: Veefin <noreply@veefin.in>`,
      `To: ${email}`,
      `Subject: Your Veefin 4.0 Customized Architecture Design from GFF 2025`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      emailHtml,
      ``
    ];

    // Add attachments
    for (const att of attachments) {
      lines.push(`--${boundary}`);
      lines.push(`Content-Type: ${att.contentType}; name="${att.filename}"`);
      lines.push(`Content-Disposition: attachment; filename="${att.filename}"`);
      lines.push(`Content-Transfer-Encoding: base64`);
      lines.push(``);
      lines.push(att.content.toString('base64'));
      lines.push(``);
    }

    lines.push(`--${boundary}--`);

    const rawMessage = lines.join('\r\n');

    // Send via SES
    const command = new SendEmailCommand({
      FromEmailAddress: "noreply@veefin.in",
      Destination: { ToAddresses: [email] },
      Content: { Raw: { Data: Buffer.from(rawMessage) } },
    });

    const response = await ses.send(command);

    console.log("Email sent successfully:", response.MessageId);

    return {
      success: true,
      message: "Email sent successfully",
      messageId: response.MessageId,
    };
  } catch (error: any) {
    console.error("SES API error:", error);
    return {
      success: false,
      message: "Failed to send email",
      error: error.message || "Unknown error",
    };
  }
}

