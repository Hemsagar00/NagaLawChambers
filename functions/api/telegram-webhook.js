// functions/api/telegram-webhook.js
// ─── Vakeel Sab Bot ────────────────────────────────────────────────────────
// Telegram bot webhook handler for Naga Law Chambers
// @nagalawchambers_bot — connects clients to Advocate S. Nagendra Naik + AI
//
// Routes:
//   /start    → welcome message with Naga's profile
//   /help     → list all commands
//   /consult  → guide to book a consultation
//   /status   → check case status
//   /about    → brief about Advocate Naik
//   /contact  → office contact details
//   *         → AI-powered legal Q&A (Ollama backend)
// ────────────────────────────────────────────────────────────────────────────

const BOT_TOKEN = '8746923016:AAE-xRQ3Xc9WG0rqQXKXlZeogoPmUnX6zLE';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const ADMIN_CHAT_ID = '1246726512'; // Chinnu's chat ID for alerts

// ─── AI Backend Config ─────────────────────────────────────────────────────
// Uses the same Ollama bridge as NyayaVedika
// Set OLLAMA_API_URL in Cloudflare env vars to the current tunnel URL
const OLLAMA_URL = () => OLLAMA_API_URL || 'https://tools-reaching-accountability-formed.trycloudflare.com';
const AI_MODEL = 'gemma4:e4b';
const AI_TIMEOUT = 45_000; // 45s max for AI response

// ─── Helpers ────────────────────────────────────────────────────────────────

function api(method, body) {
  return fetch(`${TELEGRAM_API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function reply(chatId, text, opts = {}) {
  return api('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    ...opts,
  });
}

function sendPhoto(chatId, photo, caption, opts = {}) {
  return api('sendPhoto', {
    chat_id: chatId,
    photo,
    caption,
    parse_mode: 'HTML',
    ...opts,
  });
}

function sendChatAction(chatId, action = 'typing') {
  return api('sendChatAction', { chat_id: chatId, action }).catch(() => {});
}

function escape(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function truncate(s, n = 4000) { return s.length > n ? s.slice(0, n - 3) + '…' : s; }

// Simple in-memory rate limiter (per-chat)
const cooldowns = new Map();
function isOnCooldown(chatId) {
  const now = Date.now();
  const last = cooldowns.get(chatId) || 0;
  if (now - last < 2_500) return true; // 2.5s per user
  cooldowns.set(chatId, now);
  return false;
}

// ─── Command Handlers ───────────────────────────────────────────────────────

function cmdStart() {
  return `<b>⚖️ Welcome to Naga Law Chambers!</b>

I'm <b>Vakeel Sab</b> — your virtual legal assistant at Advocate S. Nagendra Naik's office in Anantapur.

<b>What I can do for you:</b>
🔹 Answer your <b>property & land law</b> questions
🔹 Guide you through legal procedures
🔹 Help you book a <b>consultation</b> with Advocate Naik
🔹 Check your <b>case status</b>
🔹 Share tips on ROR, mutations, and documentation

<b>Quick commands:</b>
/help — Show all commands
/consult — Book a consultation
/status — Check your case
/about — About Advocate Naik
/contact — Office details

Just <b>ask me anything</b> — I'm here to help! ⚖️`;
}

function cmdHelp() {
  return `<b>📋 Vakeel Sab — Commands</b>

/start  — Welcome & introduction
/help   — Show this help
/about  — About Advocate S. Nagendra Naik
/consult — How to book a consultation
/status — Check your case status
/contact — Office contact info & map

<b>Or just type your question naturally!</b> I'll do my best to help with:
• Land & property disputes
• ROR (Record of Rights) issues
• Mutation procedures
• Civil litigation queries
• Document requirements
• Court procedures`;
}

function cmdAbout() {
  return `<b>👨‍⚖️ Advocate S. Nagendra Naik</b>

<b>Specialization:</b> Land Revenue, Property Law, Civil Litigation
<b>Experience:</b> 7+ years of dedicated practice
<b>Court:</b> District Court, Anantapur
<b>Success Rate:</b> 95%
<b>Cases Handled:</b> 200+

<b>Registered:</b> Bar Council of Andhra Pradesh (since 2019)
<b>Member:</b> Anantapur Bar Association

Known for meticulous case preparation and aggressive court representation. Trusted by farmers, homeowners, and real estate investors across Andhra Pradesh.`;
}

function cmdConsult() {
  return `<b>📅 Book a Consultation</b>

Advocate Naik is available for consultation at:

🏛️ <b>In Person:</b>
District Court Premises, Near Bar Association
Anantapur, Andhra Pradesh 515001

📞 <b>Phone / WhatsApp:</b>
<a href="tel:+919440000417">+91 9440000417</a>

⏰ <b>Hours:</b>
Mon–Sat | 10:00 AM – 6:00 PM

<b>What to bring:</b>
• Property documents (sale deed, patta, etc.)
• ROR / Pahani records (if applicable)
• Previous court orders (if any)
• ID proof

<i>First consultation includes a free case assessment.</i>`;
}

function cmdStatus() {
  return `<b>📊 Check Your Case Status</b>

You can check your case status in two ways:

1️⃣ <b>Online:</b> Visit our <a href="https://nagalawchambers.com/case-status.html">Case Status Page</a>

2️⃣ <b>Message:</b> Send your <b>Case ID</b> (provided at filing) and I'll check for you.

3️⃣ <b>Call:</b> <a href="tel:+919440000417">+91 9440000417</a>

<i>Note: Case updates are available 24/7 online. For detailed discussion, please book a consultation.</i>`;
}

function cmdContact() {
  return `<b>📍 Contact Naga Law Chambers</b>

🏛️ <b>Address:</b>
District Court Premises
Near Bar Association
Anantapur, Andhra Pradesh 515001

📞 <b>Phone:</b> <a href="tel:+919440000417">+91 9440000417</a>
💬 <b>WhatsApp:</b> <a href="https://wa.me/919440000417">Chat Now</a>
📧 <b>Email:</b> contact@nagalawchambers.com
🌐 <b>Website:</b> <a href="https://nagalawchambers.com">nagalawchambers.com</a>

<b>Office Hours:</b> Mon–Sat, 10:00 AM – 6:00 PM`;
}

// ─── AI Reply Generator ─────────────────────────────────────────────────────

async function aiReply(userMessage, userName) {
  const systemPrompt = `You are Vakeel Sab, the virtual legal assistant at Naga Law Chambers (nagalawchambers.com), the law office of Advocate S. Nagendra Naik — an expert Indian advocate specializing in Land Revenue, Property Law, and Civil Litigation with 7+ years of experience at District Court Anantapur, Andhra Pradesh.

Your role:
- Answer legal questions about Indian property law, land disputes, ROR (Record of Rights), mutations, civil litigation, and documentation.
- Provide clear, accurate guidance in simple language (English, also Telugu if the user writes in Telugu).
- NEVER give definitive legal advice — always add: "For a personalized legal opinion, please book a consultation with Advocate Naik."
- Be warm, professional, and helpful. You represent a trusted advocate's office.
- If asked about something beyond property/land/civil law, politely redirect.
- Keep responses concise (under 500 words) unless drafting a document.
- Always cite relevant Indian legal sections (IPC, CrPC, CPC, Transfer of Property Act, etc.) when applicable.

The user's name is: ${escape(userName)}
The user's message:`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT);

  try {
    const res = await fetch(`${OLLAMA_URL()}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3,
        max_tokens: 2048,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) throw new Error(`Ollama returned ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'I received your message but could not generate a response. Please try again.';
  } catch (err) {
    if (err.name === 'AbortError') {
      return 'I took too long to respond. Please try asking again — sometimes rephrasing helps!';
    }
    console.error('AI reply error:', err.message);
    return 'Our legal AI is currently unavailable. Please try again shortly, or call <a href="tel:+919440000417">+91 9440000417</a> for immediate assistance.';
  }
}

// ─── Message Router ─────────────────────────────────────────────────────────

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || msg.caption || '').trim();
  const userName = msg.from?.first_name || 'Client';

  // Ignore empty messages (photos/files without caption)
  if (!text) {
    await reply(chatId, "📎 I see you've shared a file. Feel free to describe it and I'll help! For document review, please book a consultation.");
    return;
  }

  // Rate limit check
  if (isOnCooldown(chatId)) {
    return; // silently drop; Telegram handles actual spam
  }

  // ── Commands ──────────────────────────────────────────────────────────
  const cmd = text.toLowerCase();

  if (cmd.startsWith('/start')) {
    await sendPhoto(chatId,
      'https://nagalawchambers.com/images/advocate-photo.jpg',
      cmdStart(),
      { reply_markup: {
          inline_keyboard: [
            [{ text: '📅 Book Consultation', url: 'https://nagalawchambers.com/#contact' }],
            [{ text: '📞 Call Now', url: 'tel:+919440000417' },
             { text: '💬 WhatsApp', url: 'https://wa.me/919440000417' }],
          ]
        }}
    );
    return;
  }

  if (cmd === '/help')   { await reply(chatId, cmdHelp()); return; }
  if (cmd === '/about')  { await reply(chatId, cmdAbout()); return; }
  if (cmd === '/consult'){ await reply(chatId, cmdConsult()); return; }
  if (cmd === '/status') { await reply(chatId, cmdStatus()); return; }
  if (cmd === '/contact'){ await reply(chatId, cmdContact()); return; }

  // ── Natural language → AI ─────────────────────────────────────────────
  // Show typing indicator
  sendChatAction(chatId, 'typing');

  const aiText = await aiReply(text, userName);
  const finalText = truncate(aiText);

  await reply(chatId, finalText, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📅 Book Consultation', url: 'https://nagalawchambers.com/#contact' }],
      ]
    }
  });
}

// ─── Webhook Entry Point ────────────────────────────────────────────────────

export async function onRequest(context) {
  const { request } = context;

  // OPTIONS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Telegram sends updates in this shape: { update_id, message/edited_message/callback_query/... }
  const update = body;

  try {
    if (update.message) {
      await handleMessage(update.message);
    } else if (update.edited_message) {
      // Optionally handle edited messages
      await handleMessage(update.edited_message);
    } else if (update.callback_query) {
      const cb = update.callback_query;
      await api('answerCallbackQuery', { callback_query_id: cb.id });
    }
  } catch (err) {
    console.error('Handle error:', err.message);
    // Alert admin on critical failures
    try {
      await api('sendMessage', {
        chat_id: ADMIN_CHAT_ID,
        text: `⚠️ <b>Vakeel Sab Error</b>\n\n<pre>${escape(err.message.slice(0, 500))}</pre>`,
        parse_mode: 'HTML',
      }).catch(() => {});
    } catch (_) { /* can't alert — nothing more to do */ }
  }

  // Always return 200 OK to Telegram (otherwise it retries)
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
