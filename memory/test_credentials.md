# Test Credentials — Naga Law Chambers

## Admin (inquiries endpoint)
- **Endpoint**: `GET /api/inquiries`
- **Header**: `X-Admin-Token: <see below>`
- **Configured in**: `/app/backend/.env` → `ADMIN_TOKEN=...`

### Current token (preview)
```
TiPFLTM2kO6As_POl3NX1YlrTpCBIFByS_TDsu0oeckDv78wD_NC2A
```
> 54-char URL-safe secret generated via `python3 -c "import secrets; print(secrets.token_urlsafe(40))"` — replace before/after deploy.

### Example
```bash
curl -s https://<your-url>/api/inquiries \
  -H "X-Admin-Token: TiPFLTM2kO6As_POl3NX1YlrTpCBIFByS_TDsu0oeckDv78wD_NC2A" | jq
```

### Rotate again (for deploy)
1. `python3 -c "import secrets; print(secrets.token_urlsafe(40))"`
2. Set `ADMIN_TOKEN=<new>` in deploy env (Emergent deploy settings) **and** in `/app/backend/.env`
3. `sudo supervisorctl restart backend` (preview) or redeploy

## Public Forms
- Contact form (no auth) → `POST /api/inquiries` (open submission, server-side Pydantic validation only)

## Database
- MongoDB at `mongodb://localhost:27017`, DB `naga_law`, collection `inquiries`
