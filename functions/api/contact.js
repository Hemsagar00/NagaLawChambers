// functions/api/contact.js
// Cloudflare Pages Function — handles contact form submissions
// Forwards to AgentMail inbox: nagalawchambers@agentmail.to

const AGENTMAIL_KEY = 'am_us_193c23b33811c37248bed1b7c02a3995edc03536e49c4f58afa666802a274693';
const AGENTMAIL_URL = 'https://api.agentmail.to';
const INBOX_ID = 'nagalawchambers@agentmail.to';

export async function onRequestPost({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') || 'Not provided';
    const email = formData.get('email') || 'Not provided';
    const phone = formData.get('phone') || 'Not provided';
    const message = formData.get('message') || 'Not provided';

    const emailBody = `
New Consultation Request — Naga Law Chambers
═══════════════════════════════════════════

Name:    ${name}
Email:   ${email}
Phone:   ${phone}

Message:
${message}

───────────────────────────────────────────
Submitted from: nagalawchambers.com
Time: ${new Date().toISOString()}
    `.trim();

    const res = await fetch(`${AGENTMAIL_URL}/inboxes/${INBOX_ID}/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AGENTMAIL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'contact@nagalawchambers.com',
        subject: `Consultation Request from ${name}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      throw new Error(`AgentMail error: ${res.status}`);
    }

    // Redirect back with success
    return Response.redirect(`${new URL(request.url).origin}/?submitted=success#contact`, 302);
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.redirect(`${new URL(request.url).origin}/?submitted=error#contact`, 302);
  }
}
