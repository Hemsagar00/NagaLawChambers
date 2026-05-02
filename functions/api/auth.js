export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://nagalawchambers.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!body.password || body.password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = crypto.randomUUID();
  const expiresAt = Date.now() + 12 * 60 * 60 * 1000;

  return new Response(JSON.stringify({
    token,
    expiresAt,
    message: 'Authentication successful'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
