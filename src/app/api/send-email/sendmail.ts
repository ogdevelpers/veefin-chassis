export const runtime = 'edge'; // Keep this line

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend API
 * @param params Object containing email, companyname, pngData, name, message
 */
export async function sendEmail({ email, companyname, pngData, name, message }: {
  email: string;
  companyname?: string;
  pngData?: string;
  name: string;
  message?: string;
}) {
  try {  

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
            <h2>Veefin Architecture Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${companyname ? `<p><strong>Company:</strong> ${companyname}</p>` : ''}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            ${pngData ? `<p><strong>Image Attachment:</strong> Financial Architecture image is attached to this email.</p>` : ''}
            <br>
            <p>This message was sent from the Veefin Chassis application.</p>
          </div>
        </body>
      </html>
    `;

    // Prepare attachments
    const attachments = [];
    if (pngData) {
      // Convert base64 data URL to buffer
      const base64Data = pngData.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      attachments.push({
        filename: 'financial-architecture.png',
        content: buffer,
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['developers506@gmail.com'],
      subject: `Veefin Architecture Submission from ${name}`,
      html: emailHtml,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${companyname || ''}\nMessage: ${message || ''}\nImage: ${pngData ? 'Attached' : 'Not provided'}`,
      attachments: attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return {
        success: true, 
        message: 'Email sent successfully',
    }
  } catch (error) {
    console.error("Caught error:", error);
    return {
        success: false, 
        message: 'Failed to send email',
    }
  }
}