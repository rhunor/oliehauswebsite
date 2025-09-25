'use server';

import { Resend } from 'resend';
import type { ContactFormData, SubmitResult } from './types';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendContactEmail(data: ContactFormData): Promise<SubmitResult> {
  try {
    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return { error: 'Missing required fields' };
    }

    // Format the services list
    const servicesHtml = data.servicesRequired.length > 0
      ? data.servicesRequired.map(service => `<li>${service}</li>`).join('')
      : '<li>No specific services selected</li>';

    // Create HTML email template for team
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission - OliveHaus Interiors</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 300;
            }
            .gold-accent {
              color: #DAA520;
              font-weight: bold;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field-group {
              background: white;
              padding: 15px;
              margin-bottom: 20px;
              border-radius: 5px;
              border-left: 4px solid #DAA520;
            }
            .field-label {
              color: #666;
              font-size: 12px;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 16px;
              font-weight: 500;
            }
            ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            li {
              margin: 5px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            .action-required {
              background: #fff3cd;
              border: 1px solid #ffc107;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              text-align: center;
            }
            .action-required strong {
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New <span class="gold-accent">Project Inquiry</span></h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">OliveHaus Interiors Contact Form</p>
          </div>
          
          <div class="content">
            <div class="action-required">
              <strong>⚡ Action Required:</strong> A potential client has submitted a project inquiry.
              <br>Please respond within 24 hours.
            </div>

            <div class="field-group">
              <div class="field-label">Client Name</div>
              <div class="field-value">${data.fullName}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                <a href="mailto:${data.email}" style="color: #DAA520; text-decoration: none;">
                  ${data.email}
                </a>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Phone Number</div>
              <div class="field-value">
                <a href="tel:${data.phone}" style="color: #DAA520; text-decoration: none;">
                  ${data.phone}
                </a>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Project Type</div>
              <div class="field-value">${data.projectType || 'Not specified'}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Budget Range</div>
              <div class="field-value">${data.budgetRange || 'Not specified'}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Services Required</div>
              <div class="field-value">
                <ul>${servicesHtml}</ul>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Project Location</div>
              <div class="field-value">${data.projectLocation || 'Not specified'}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Project Timeline</div>
              <div class="field-value">${data.projectTimeline || 'Not specified'}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Submission Date & Time</div>
              <div class="field-value">${new Date(data.submittedAt).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</div>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated email from the OliveHaus Interiors website contact form.</p>
            <p>© ${new Date().getFullYear()} OliveHaus Interiors. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    // Create plain text version for email clients that don't support HTML
    const emailText = `
New Project Inquiry - OliveHaus Interiors

CLIENT DETAILS:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}

PROJECT DETAILS:
Project Type: ${data.projectType || 'Not specified'}
Budget Range: ${data.budgetRange || 'Not specified'}
Services Required: ${data.servicesRequired.join(', ') || 'Not specified'}
Project Location: ${data.projectLocation || 'Not specified'}
Project Timeline: ${data.projectTimeline || 'Not specified'}

Submitted: ${new Date(data.submittedAt).toLocaleString()}

---
This is an automated email from the OliveHaus Interiors website contact form.
    `;

    // Send inquiry email to team
    const { data: sendData, error } = await resend.emails.send({
      from: 'OliveHaus Contact Form <enquiry@olivehausinteriors.com>',
      to: [ 'enquiry@olivehausinteriors.com'],
      replyTo: data.email,
      subject: `New Project Inquiry: ${data.fullName} - ${data.budgetRange}`,
      html: emailHtml,
      text: emailText,
    });

    if (error || !sendData) {
      console.error('Resend error:', error);
      return { error: 'Failed to send email. Please try again.' };
    }

    // Send confirmation email to client
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You - OliveHaus Interiors</title>
          <style>
            body {
              font-family: Georgia, serif;
              line-height: 1.8;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 300;
              letter-spacing: 2px;
            }
            .gold {
              color: #DAA520;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 20px;
              color: #2c2c2c;
              margin-bottom: 20px;
            }
            .message {
              color: #555;
              margin: 20px 0;
            }
            .next-steps {
              background: #f9f9f9;
              padding: 25px;
              border-radius: 8px;
              margin: 30px 0;
            }
            .next-steps h2 {
              color: #2c2c2c;
              font-size: 18px;
              margin-top: 0;
            }
            .next-steps ol {
              margin: 15px 0;
              padding-left: 20px;
              color: #555;
            }
            .next-steps li {
              margin: 10px 0;
            }
            .cta {
              text-align: center;
              margin: 30px 0;
            }
            .contact-info {
              background: #2c2c2c;
              color: white;
              padding: 25px;
              text-align: center;
              margin-top: 30px;
            }
            .contact-info a {
              color: #DAA520;
              text-decoration: none;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OLIVE<span class="gold">HAUS</span></h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">
                Designing with you, for you
              </p>
            </div>
            
            <div class="content">
              <div class="greeting">
                Dear ${data.fullName},
              </div>
              
              <div class="message">
                <p>Thank you for reaching out to OliveHaus Interiors. We're thrilled about the opportunity to transform your space into something extraordinary.</p>
                
                <p>We've received your project inquiry and our team is already reviewing the details you've provided. Your vision is important to us, and we're excited to bring it to life.</p>
              </div>

              <div class="next-steps">
                <h2>What Happens Next?</h2>
                <ol>
                  <li><strong>Review:</strong> Our design team will carefully review your requirements and budget.</li>
                  <li><strong>Contact:</strong> We'll reach out within 24 hours to discuss your project in detail.</li>
                  <li><strong>Discovery Call:</strong> We'll schedule a convenient time for an in-depth consultation.</li>
                  <li><strong>Proposal:</strong> Following our discussion, we'll prepare a customized proposal for your project.</li>
                </ol>
              </div>

              <div class="message">
                <p>In the meantime, feel free to explore our portfolio or gather any inspiration images that resonate with your vision. We believe great design starts with understanding your unique style and needs.</p>
              </div>

              <div class="contact-info">
                <p style="margin-top: 0;"><strong>Need immediate assistance?</strong></p>
                <p>
                  Call us: <a href="tel:+2347016163218">234 701 616 3218</a><br>
                  WhatsApp: <a href="https://wa.me/2347016163218">Chat with us</a><br>
                  Email: <a href="mailto:enquiry@olivehausinteriors.com">enquiry@olivehausinteriors.com</a>
                </p>
              </div>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} OliveHaus Interiors. All rights reserved.</p>
              <p>4 Olatunbosun Street, Shonibare Estate, Maryland, Lagos, Nigeria</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'OliveHaus Interiors <onboarding@resend.dev>',
      to: data.email,
      subject: 'Thank You for Your Inquiry - OliveHaus Interiors',
      html: confirmationHtml,
    });

    return { success: 'Email sent successfully!' };
  } catch (error) {
    console.error('Resend error:', error);
    return { error: 'An unexpected error occurred while sending the email.' };
  }
}