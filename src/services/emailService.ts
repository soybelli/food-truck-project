import { supabase } from '../lib/supabase';
import * as nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

// SMTP Transport configuration
const smtpTransport = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: 're_NJyX7swT_CrraEQhtAoVVURPZ77LY6RYG'
  }
});

export async function sendEmail(emailData: EmailData) {
  try {
    // Send email using SMTP
    const info = await smtpTransport.sendMail({
      from: 'VesselsOps <notifications@vesselsops.com>',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function generateLeadEmailContent(leadData: any) {
  const subject = `New Lead: ${leadData.lead_type === 'price_request' ? 'Price Request' : 'Call Back Request'}`;
  
  const html = `
    <h2>New Lead Submission</h2>
    <p><strong>Type:</strong> ${leadData.lead_type}</p>
    <p><strong>Name:</strong> ${leadData.full_name}</p>
    <p><strong>Phone:</strong> ${leadData.phone_number}</p>
    ${leadData.email ? `<p><strong>Email:</strong> ${leadData.email}</p>` : ''}
    ${leadData.message ? `<p><strong>Message:</strong> ${leadData.message}</p>` : ''}
    ${leadData.listing_id ? `<p><strong>Listing ID:</strong> ${leadData.listing_id}</p>` : ''}
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `;

  return {
    to: 'ahmet.soybelli@reeftechnology.com',
    subject,
    html
  };
}